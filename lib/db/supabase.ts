import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let _client: SupabaseClient | null = null;
let _admin: SupabaseClient | null = null;

/** Public/anon client — safe for browser + RSC. Returns null if env missing. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!_client) {
    _client = createClient(url, anonKey, {
      auth: { persistSession: typeof window !== "undefined" },
    });
  }
  return _client;
}

/** Service-role client — SERVER-ONLY. Bypasses RLS. */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  if (_admin) return _admin;
  _admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  return _admin;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}
