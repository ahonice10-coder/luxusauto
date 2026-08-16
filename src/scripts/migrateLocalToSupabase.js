import { readStorage, STORAGE_KEYS } from "../lib/storage";

// Usage:
// In dev server (open app in browser), run in console:
// (async () => {
//   const { default: supabase } = await import('/src/lib/supabaseClient.js')
//   const { migrateLocalToSupabase } = await import('/src/scripts/migrateLocalToSupabase.js')
//   const result = await migrateLocalToSupabase(supabase)
//   console.log(result)
// })()

export async function migrateLocalToSupabase(supabase) {
  if (!supabase) throw new Error("Supabase client required");

  const summary = {
    profiles: 0,
    vehicles: 0,
    reservations: 0,
    favorites: 0,
    errors: [],
  };

  // Profiles (users)
  try {
    const users = readStorage(STORAGE_KEYS.users, []) || [];
    const profiles = users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name || null,
      role: u.role || "user",
    }));
    if (profiles.length) {
      const { data, error } = await supabase
        .from("profiles")
        .upsert(profiles)
        .select();
      if (error) summary.errors.push({ table: "profiles", error });
      else summary.profiles = (data || []).length;
    }
  } catch (err) {
    summary.errors.push({ table: "profiles", error: String(err) });
  }

  // Vehicles
  try {
    const vehicles = readStorage(STORAGE_KEYS.vehicles, []) || [];
    if (vehicles.length) {
      // ensure minimal shape
      const rows = vehicles.map((v) => ({
        id: v.id,
        title: v.title,
        description: v.description || null,
        price: v.price || null,
        images: v.images || null,
        available: typeof v.available === "boolean" ? v.available : true,
      }));
      const { data, error } = await supabase
        .from("vehicles")
        .upsert(rows)
        .select();
      if (error) summary.errors.push({ table: "vehicles", error });
      else summary.vehicles = (data || []).length;
    }
  } catch (err) {
    summary.errors.push({ table: "vehicles", error: String(err) });
  }

  // Reservations
  try {
    const reservations = readStorage(STORAGE_KEYS.reservations, []) || [];
    if (reservations.length) {
      const rows = reservations.map((r) => ({
        id: r.id,
        user_id: r.user_id,
        vehicle_id: r.vehicle_id,
        start_date: r.start_date,
        end_date: r.end_date,
        total: r.total,
        status: r.status || "pending",
      }));
      const { data, error } = await supabase
        .from("reservations")
        .upsert(rows)
        .select();
      if (error) summary.errors.push({ table: "reservations", error });
      else summary.reservations = (data || []).length;
    }
  } catch (err) {
    summary.errors.push({ table: "reservations", error: String(err) });
  }

  // Favorites (per-user)
  try {
    // favorites stored per user key: luxusauto.favorites.<userId>
    // we'll scan localStorage for keys that start with that prefix
    const prefix = "luxusauto.favorites.";
    const favKeys = Object.keys(localStorage).filter((k) =>
      k.startsWith(prefix),
    );
    const favRows = [];
    for (const k of favKeys) {
      try {
        const userId = k.slice(prefix.length);
        const favs = JSON.parse(localStorage.getItem(k) || "[]");
        for (const vehicleId of favs) {
          favRows.push({ user_id: userId, vehicle_id: vehicleId });
        }
      } catch (e) {
        // ignore per-key parse errors
      }
    }
    if (favRows.length) {
      const { data, error } = await supabase
        .from("favorites")
        .upsert(favRows)
        .select();
      if (error) summary.errors.push({ table: "favorites", error });
      else summary.favorites = (data || []).length;
    }
  } catch (err) {
    summary.errors.push({ table: "favorites", error: String(err) });
  }

  return summary;
}

export default { migrateLocalToSupabase };
