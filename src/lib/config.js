export const SITE = {
  name: "LuxusAuto",
  email: "contact@luxusauto.fr",
  phone: "+33 1 84 00 00 00",
  address: "18 Avenue des Champs, Paris",
};

export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "33184000000";

export const MEDIA_LIMITS = {
  imageBytes: 1.5 * 1024 * 1024,
  videoBytes: 4 * 1024 * 1024,
};

export const DEPOSIT_RATE = 0.05;

export function whatsappUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function formatPrice(value, locale = "fr-FR") {
  return `${Number(value || 0).toLocaleString(locale)} €`;
}

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
export const IS_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
