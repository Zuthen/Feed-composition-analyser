import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    throw new Error("Supabase URL is missing");
}
if (!supabaseServiceRole) {
    throw new Error("Supabase AnonKey is missing");
}

const supabase = createClient(supabaseUrl, supabaseServiceRole);

export default supabase;
