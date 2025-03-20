import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    throw new Error("Supabase URL  is missing");
}
if (!supabaseAnonKey) {
    throw new Error("Supabase AnonKey is missing");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
