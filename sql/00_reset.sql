-- LuxusAuto — 1/2 RESET
-- SQL Editor → coller → Run
-- Efface les anciennes tables (id text, title, start_date, etc.)
-- Ne touche PAS à Authentication (auth.users). Supprimez les comptes tests dans Auth si besoin.

drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists on_reservation_created on public.reservations;
drop trigger if exists trg_profiles_updated_at on public.profiles;
drop trigger if exists trg_vehicles_updated_at on public.vehicles;
drop trigger if exists trg_reservations_updated_at on public.reservations;

drop function if exists public.notify_on_reservation() cascade;
drop function if exists public.handle_new_user() cascade;
drop function if exists public.is_admin() cascade;
drop function if exists public.touch_updated_at() cascade;

drop table if exists public.notifications cascade;
drop table if exists public.favorites cascade;
drop table if exists public.reservations cascade;
drop table if exists public.contacts cascade;
drop table if exists public.vehicles cascade;
drop table if exists public.profiles cascade;

drop policy if exists "vehicles_media_select" on storage.objects;
drop policy if exists "vehicles_media_insert" on storage.objects;
drop policy if exists "vehicles_media_update" on storage.objects;
drop policy if exists "vehicles_media_delete" on storage.objects;
