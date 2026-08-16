-- LuxusAuto — 2/2 SCHÉMA
-- À lancer APRÈS sql/00_reset.sql
-- Types uuid partout pour auth.users. Véhicules : id texte (v-101).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create table public.vehicles (
  id text primary key,
  name text not null,
  brand text not null,
  category text not null check (category in ('new', 'used')),
  price numeric not null default 0,
  year integer,
  mileage integer not null default 0,
  engine text,
  transmission text,
  power text,
  location text,
  status text,
  image text,
  images jsonb not null default '[]'::jsonb,
  video text,
  featured boolean not null default false,
  specs jsonb not null default '[]'::jsonb,
  description text,
  created_at timestamptz not null default now()
);

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  vehicle_id text not null references public.vehicles(id) on delete restrict,
  vehicle_name text,
  customer text,
  customer_email text,
  date date not null default current_date,
  amount numeric not null default 0,
  status text not null default 'confirmed' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text,
  title text,
  body text,
  vehicle_id text,
  reservation_id uuid references public.reservations(id) on delete set null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  vehicle_id text not null references public.vehicles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, vehicle_id)
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index reservations_created_at_idx on public.reservations (created_at desc);
create index reservations_user_id_idx on public.reservations (user_id);
create index notifications_user_id_idx on public.notifications (user_id, created_at desc);
create index vehicles_featured_idx on public.vehicles (featured);

-- ---------------------------------------------------------------------------
-- Fonctions / triggers
-- ---------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    case
      when coalesce(new.raw_user_meta_data->>'role', '') = 'admin' then 'admin'
      else 'user'
    end
  )
  on conflict (id) do update
    set email = excluded.email,
        name = coalesce(public.profiles.name, excluded.name);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.notify_on_reservation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_row public.profiles;
  label text;
begin
  label := coalesce(new.vehicle_name, new.vehicle_id);

  insert into public.notifications (user_id, type, title, body, vehicle_id, reservation_id)
  values (
    new.user_id,
    'reservation',
    'Réservation confirmée',
    label || ' · ' || coalesce(new.customer_email, new.customer, ''),
    new.vehicle_id,
    new.id
  );

  for admin_row in select * from public.profiles where role = 'admin' loop
    if admin_row.id is distinct from new.user_id then
      insert into public.notifications (user_id, type, title, body, vehicle_id, reservation_id)
      values (
        admin_row.id,
        'reservation',
        'Nouvelle réservation',
        coalesce(new.customer_email, new.customer, 'Client') || ' · ' || label,
        new.vehicle_id,
        new.id
      );
    end if;
  end loop;

  return new;
end;
$$;

create trigger on_reservation_created
  after insert on public.reservations
  for each row execute procedure public.notify_on_reservation();

grant usage on schema public to anon, authenticated;
grant select on public.vehicles to anon, authenticated;
grant select, insert, update, delete on public.vehicles to authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update on public.reservations to authenticated;
grant select, insert, update on public.notifications to authenticated;
grant select, insert, delete on public.favorites to authenticated;
grant insert on public.contacts to anon, authenticated;
grant select on public.contacts to authenticated;

alter table public.profiles enable row level security;
alter table public.vehicles enable row level security;
alter table public.reservations enable row level security;
alter table public.notifications enable row level security;
alter table public.favorites enable row level security;
alter table public.contacts enable row level security;

create policy "profiles_select_own_or_admin"
  on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_admin());

create policy "profiles_insert_own"
  on public.profiles for insert to authenticated
  with check (id = auth.uid() and role = 'user');

create policy "profiles_update_own"
  on public.profiles for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and role = (select p.role from public.profiles p where p.id = auth.uid()));

create policy "vehicles_select_all"
  on public.vehicles for select
  to anon, authenticated
  using (true);

create policy "vehicles_write_admin"
  on public.vehicles for insert to authenticated
  with check (public.is_admin());

create policy "vehicles_update_admin"
  on public.vehicles for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "vehicles_delete_admin"
  on public.vehicles for delete to authenticated
  using (public.is_admin());

create policy "reservations_select"
  on public.reservations for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

create policy "reservations_insert_own"
  on public.reservations for insert to authenticated
  with check (user_id = auth.uid());

create policy "reservations_update"
  on public.reservations for update to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

create policy "notifications_select_own"
  on public.notifications for select to authenticated
  using (user_id = auth.uid());

create policy "notifications_update_own"
  on public.notifications for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "notifications_insert_own"
  on public.notifications for insert to authenticated
  with check (user_id = auth.uid());

create policy "favorites_select_own"
  on public.favorites for select to authenticated
  using (user_id = auth.uid());

create policy "favorites_insert_own"
  on public.favorites for insert to authenticated
  with check (user_id = auth.uid());

create policy "favorites_delete_own"
  on public.favorites for delete to authenticated
  using (user_id = auth.uid());

create policy "contacts_insert_public"
  on public.contacts for insert
  to anon, authenticated
  with check (true);

create policy "contacts_select_admin"
  on public.contacts for select to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Realtime
-- ---------------------------------------------------------------------------

alter table public.reservations replica identity full;
alter table public.notifications replica identity full;

do $$
begin
  begin
    alter publication supabase_realtime add table public.reservations;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.notifications;
  exception when duplicate_object then null;
  end;
end $$;

-- ---------------------------------------------------------------------------
-- Storage (images véhicules)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('vehicles', 'vehicles', true)
on conflict (id) do update set public = true;

create policy "vehicles_media_select"
  on storage.objects for select
  using (bucket_id = 'vehicles');

create policy "vehicles_media_insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'vehicles' and public.is_admin());

create policy "vehicles_media_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'vehicles' and public.is_admin());

create policy "vehicles_media_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'vehicles' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Profils pour les comptes Auth déjà existants
-- ---------------------------------------------------------------------------

insert into public.profiles (id, email, name, role)
select
  id,
  email,
  coalesce(raw_user_meta_data->>'name', split_part(email, '@', 1)),
  case when coalesce(raw_user_meta_data->>'role', '') = 'admin' then 'admin' else 'user' end
from auth.users
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Catalogue initial
-- ---------------------------------------------------------------------------

insert into public.vehicles (
  id, name, brand, category, price, year, mileage, engine, transmission, power,
  location, status, image, featured, specs, description
) values
(
  'v-101', 'Porsche 911 GT3 RS', 'Porsche', 'new', 245000, 2024, 1200,
  'V6 4.0L', 'Automatique PDK', '518 ch', 'Paris', 'new',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
  true, '["0-100: 3.2s","Top speed: 296 km/h","AWD"]'::jsonb,
  'Un sport automobile d’exception, ultra précis et ultra performant.'
),
(
  'v-102', 'BMW M5 Competition', 'BMW', 'used', 135000, 2022, 18000,
  'V8 4.4L', 'Automatique', '617 ch', 'Lyon', 'used',
  'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80',
  false, '["0-100: 3.3s","Traction intégrale","M xDrive"]'::jsonb,
  'Berline sportive haut de gamme, élégante et massive.'
),
(
  'v-103', 'Audi RS6 Avant', 'Audi', 'used', 115000, 2021, 45200,
  'V8 4.0L', 'Automatique', '591 ch', 'Marseille', 'used',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80',
  false, '["0-100: 3.4s","Quattro","Grand volume"]'::jsonb,
  'Performances de supercar dans un break premium.'
),
(
  'v-104', 'Mercedes AMG GT', 'Mercedes', 'new', 198000, 2025, 0,
  'V8 4.0L', 'Automatique AMG', '577 ch', 'Nice', 'new',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  true, '["0-100: 3.6s","RWD","Launch Control"]'::jsonb,
  'Grand tourer de luxe, à l’équilibre irréprochable.'
),
(
  'v-105', 'Range Rover Sport', 'Land Rover', 'new', 168000, 2024, 200,
  'V8 4.4L', 'Automatique', '523 ch', 'Bordeaux', 'new',
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
  false, '["0-100: 4.5s","4x4","Luxury Pack"]'::jsonb,
  'SUV premium avec confort de grand standing.'
),
(
  'v-106', 'Tesla Model S Plaid', 'Tesla', 'new', 112000, 2024, 950,
  'Électrique', 'Automatique', '1020 ch', 'Strasbourg', 'new',
  'https://images.unsplash.com/photo-1560958089-b8a58cb6785b?auto=format&fit=crop&w=1200&q=80',
  false, '["0-100: 2.1s","Autonomie 650 km","AWD"]'::jsonb,
  'Electric performance with a futuristic cabin.'
);

update public.vehicles
set images = jsonb_build_array(image)
where coalesce(images, '[]'::jsonb) = '[]'::jsonb
  and image is not null
  and image <> '';

update public.vehicles set images = '[
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
]'::jsonb where id = 'v-101';

update public.vehicles set images = '[
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=80"
]'::jsonb where id = 'v-102';

update public.vehicles set images = '[
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0fe6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80"
]'::jsonb where id = 'v-103';

update public.vehicles set images = '[
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=80"
]'::jsonb where id = 'v-104';

update public.vehicles set images = '[
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0fe6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80"
]'::jsonb where id = 'v-105';

update public.vehicles set images = '[
  "https://images.unsplash.com/photo-1560958089-b8a58cb6785b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
]'::jsonb where id = 'v-106';

-- Promouvoir l’admin (remplacez l’email) :
-- update public.profiles set role = 'admin' where lower(email) = lower('votre-admin@email.com');
