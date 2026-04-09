import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"

dotenv.config()

const supabaseclient = createClient(
    process.env.SUPABASE_PROJECT_URI,
    process.env.SUPABASE_ANON_KEY
);

export default supabaseclient;