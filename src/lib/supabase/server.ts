import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 *
 * Uses the SERVICE ROLE key, which bypasses Row Level Security. This is what
 * lets an anonymous, not-logged-in shopper place an order: the write happens
 * on the server (inside the API route), never in the browser, so the
 * privileged key is never shipped to the client.
 *
 * NEVER import this file from a "use client" component, and never prefix
 * SUPABASE_SERVICE_ROLE_KEY with NEXT_PUBLIC_ — that would expose it to the
 * browser bundle and defeat the whole point.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
