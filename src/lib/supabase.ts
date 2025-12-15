import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment-based configuration
// These values should be set in environment variables for production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate configuration
const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Create Supabase client only if configured
export const supabase: SupabaseClient | null = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Export configuration status for conditional rendering
export const isSupabaseConfigured = isConfigured;
