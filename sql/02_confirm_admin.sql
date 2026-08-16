-- Confirme le compte admin déjà créé par un premier essai de connexion
-- (Supabase bloque tant que Confirm email est activé).
-- SQL Editor → Run, puis reconnectez-vous sur /admin/login

update auth.users
set email_confirmed_at = coalesce(email_confirmed_at, now())
where lower(email) = lower('ahoglelenice@gmail.com');

insert into public.profiles (id, email, name, role)
select id, email, coalesce(raw_user_meta_data->>'name', 'Admin'), 'admin'
from auth.users
where lower(email) = lower('ahoglelenice@gmail.com')
on conflict (id) do update
  set role = 'admin',
      email = excluded.email;

-- Pour éviter ce blocage en développement :
-- Authentication → Providers → Email → désactiver "Confirm email"
