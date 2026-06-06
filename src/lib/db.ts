// src/lib/db.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Strict structural verification layer to prevent runtime silent failures
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "CRITICAL: Missing public Supabase credentials configuration inside your .env.local file. " +
    "Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are declared."
  );
}

/**
 * 1. Public Anonymous Client Instance
 * Used on public-facing layouts and client components.
 * This client is restricted by your Row Level Security (RLS) policies
 * and can only read data allowed by your public SELECT rules.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 2. Privileged Administrative Client Factory
 * Strictly for secure server-side isolation scopes (Server Actions, API Routes).
 * It uses the service_role key to bypass RLS completely, allowing your admin
 * dashboard panel to safely perform write, update, and delete actions.
 */
export const supabaseAdmin = () => {
  if (!supabaseServiceKey) {
    throw new Error(
      "SECURITY ERROR: Attempted to instantiate the privileged admin client on a scope " +
      "missing the SUPABASE_SERVICE_ROLE_KEY. Ensure this is only called in server-side environments."
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false, // Disables token caching inside the server container node
      autoRefreshToken: false,
    },
  });
};