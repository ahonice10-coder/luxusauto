# Supabase — LuxusAuto

Les clés restent dans `.env.local` (jamais dans git).

## 1. Vider puis recréer (SQL Editor)

1. Coller et Run **`sql/00_reset.sql`**
2. Coller et Run **`sql/01_schema.sql`**
3. Si la base existait déjà (sans reset) : Run **`sql/03_vehicle_images.sql`** (colonne `images` + galeries)

Ne pas réutiliser les anciens scripts (`id text`, colonne `title`, `start_date`). Ils sont supprimés.

## 2. Auth

Authentication → Email : désactiver **Confirm email** en développement.

Se connecter une fois via `/admin/login`, puis :

```sql
update public.profiles
set role = 'admin'
where lower(email) = lower('votre-admin@email.com');
```

Les comptes Auth (Authentication) ne sont pas effacés par le reset. Pour une base vraiment vide, supprimez aussi les users dans Authentication.

## 3. Vérifier

Catalogue public chargé depuis `vehicles`. Réservation client → `/admin/reservations` + notification.
