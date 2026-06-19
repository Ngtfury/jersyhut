import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Used for admin operations to bypass RLS

// Use this client strictly for server-side admin actions since it has the service_role key
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Normal client using anon key for client-side or public server actions
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
