import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://trdszxzevfhkhkkxsjol.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyZHN6eHpldmZoa2hra3hzam9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NTg0MjgsImV4cCI6MjA4MTMzNDQyOH0.03QR6hLBJc7028cMTPvFODQAIngcHUpeVP78zBggoSc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
