/**
 * Authentication Service
 * 
 * This service provides a clean abstraction layer for authentication operations.
 * Currently prepared for Supabase integration.
 * 
 * INTEGRATION GUIDE:
 * 1. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment
 * 2. Uncomment the Supabase implementation code below
 * 3. Remove the placeholder implementations
 */

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

// Re-export types for consumers
export type { User, Session };

// Auth state type
export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

// Auth result types
export interface AuthResult {
  success: boolean;
  error: string | null;
  user?: User | null;
}

/**
 * Sign up with email and password
 */
export async function signUp(
  email: string, 
  password: string, 
  fullName?: string
): Promise<AuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    // TODO: Replace with Supabase auth.signUp when configured
    console.warn('[Auth] Supabase not configured - signUp is a no-op');
    return { 
      success: false, 
      error: 'Authentication service not configured. Please set up Supabase credentials.' 
    };
  }

  try {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null, user: data.user };
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'An unexpected error occurred' 
    };
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<AuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    // TODO: Replace with Supabase auth.signInWithPassword when configured
    console.warn('[Auth] Supabase not configured - signIn is a no-op');
    return { 
      success: false, 
      error: 'Authentication service not configured. Please set up Supabase credentials.' 
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null, user: data.user };
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'An unexpected error occurred' 
    };
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<AuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    // TODO: Replace with Supabase auth.signOut when configured
    console.warn('[Auth] Supabase not configured - signOut is a no-op');
    return { success: true, error: null };
  }

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'An unexpected error occurred' 
    };
  }
}

/**
 * Get the current session
 */
export async function getSession(): Promise<Session | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch {
    return null;
  }
}

/**
 * Get the current user
 */
export async function getUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * Subscribe to auth state changes
 * Returns an unsubscribe function
 */
export function onAuthStateChange(
  callback: (user: User | null, session: Session | null) => void
): () => void {
  if (!isSupabaseConfigured || !supabase) {
    // Return no-op unsubscribe
    return () => {};
  }

  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(session?.user ?? null, session);
    }
  );

  return () => subscription.unsubscribe();
}
