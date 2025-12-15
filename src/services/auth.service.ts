/**
 * Authentication Service
 * 
 * This service provides a clean abstraction layer for authentication operations.
 * Connected to Supabase for authentication.
 */

import { supabase } from '@/lib/supabaseClient';
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
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      throw error;
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
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
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
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
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
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(session?.user ?? null, session);
    }
  );

  return () => subscription.unsubscribe();
}
