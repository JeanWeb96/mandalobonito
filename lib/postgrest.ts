import { PostgrestClient } from '@supabase/postgrest-js';

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL     as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

/**
 * Cliente de solo lectura para las páginas públicas.
 * Usa @supabase/postgrest-js directamente, sin cargar
 * auth, realtime, storage ni functions (~150 KB menos para visitantes).
 */
export const db = new PostgrestClient(`${supabaseUrl}/rest/v1`, {
  headers: {
    apikey:        supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  },
});
