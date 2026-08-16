-- LuxusAuto — galerie d’images véhicules
-- À lancer si sql/01_schema.sql a déjà été exécuté (sans recréer toute la base).

alter table public.vehicles
  add column if not exists images jsonb not null default '[]'::jsonb;

update public.vehicles
set images = jsonb_build_array(image)
where (images = '[]'::jsonb or images is null)
  and image is not null
  and image <> '';

update public.vehicles set images = '[
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
]'::jsonb where id = 'v-101' and jsonb_array_length(coalesce(images, '[]'::jsonb)) <= 1;

update public.vehicles set images = '[
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=80"
]'::jsonb where id = 'v-102' and jsonb_array_length(coalesce(images, '[]'::jsonb)) <= 1;

update public.vehicles set images = '[
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0fe6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80"
]'::jsonb where id = 'v-103' and jsonb_array_length(coalesce(images, '[]'::jsonb)) <= 1;

update public.vehicles set images = '[
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=80"
]'::jsonb where id = 'v-104' and jsonb_array_length(coalesce(images, '[]'::jsonb)) <= 1;

update public.vehicles set images = '[
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0fe6?auto=format&fit=crop&w=1200&q=80"
]'::jsonb where id = 'v-105' and jsonb_array_length(coalesce(images, '[]'::jsonb)) <= 1;

update public.vehicles set images = '[
  "https://images.unsplash.com/photo-1560958089-b8a58cb6785b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
]'::jsonb where id = 'v-106' and jsonb_array_length(coalesce(images, '[]'::jsonb)) <= 1;
