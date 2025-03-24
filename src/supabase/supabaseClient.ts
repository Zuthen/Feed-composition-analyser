import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseServiceRole = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    throw new Error("Supabase URL is missing");
}
if (!supabaseServiceRole) {
    throw new Error("Supabase AnonKey is missing");
}

const supabase = createClient(supabaseUrl, supabaseServiceRole);

export default supabase;
