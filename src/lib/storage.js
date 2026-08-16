export const STORAGE_KEYS = {
  users: "luxusauto.users",
  session: "luxusauto.session",
  vehicles: "luxusauto.vehicles",
  reservations: "luxusauto.reservations",
  // notifications per user: call with userId -> luxusauto.notifications.<userId>
  notifications: (userId) => `luxusauto.notifications.${userId || "public"}`,
  contacts: "luxusauto.contacts",
  language: "luxusauto.language",
  favorites: (userId) => `luxusauto.favorites.${userId}`,
};

export function createId(prefix = "id") {
  const rand =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${prefix}-${rand}`;
}

export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
