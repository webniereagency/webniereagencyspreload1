/**
 * useAuth Hook
 * 
 * Provides centralized authentication state management.
 * This hook abstracts all auth logic away from UI components.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  signUp as authSignUp,
  signIn as authSignIn,
  signOut as authSignOut,
  getSession,
  onAuthStateChange,
  type User,
  type Session,
  type AuthState,
} from '@/services/auth.service';

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener FIRST
    const unsubscribe = onAuthStateChange((user, session) => {
      setState(prev => ({
        ...prev,
        user,
        session,
        loading: false,
      }));
    });

    // THEN check for existing session
    getSession().then((session) => {
      setState(prev => ({
        ...prev,
        user: session?.user ?? null,
        session,
        loading: false,
      }));
    });

    return unsubscribe;
  }, []);

  // Sign up handler
  const signUp = useCallback(async (
    email: string,
    password: string,
    fullName?: string
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await authSignUp(email, password, fullName);
    
    if (!result.success) {
      setState(prev => ({ ...prev, loading: false, error: result.error }));
    }
    
    return result;
  }, []);

  // Sign in handler
  const signIn = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await authSignIn(email, password);
    
    if (!result.success) {
      setState(prev => ({ ...prev, loading: false, error: result.error }));
    }
    
    return result;
  }, []);

  // Sign out handler
  const signOut = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await authSignOut();
    
    if (result.success) {
      setState({
        user: null,
        session: null,
        loading: false,
        error: null,
      });
    } else {
      setState(prev => ({ ...prev, loading: false, error: result.error }));
    }
    
    return result;
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    isAuthenticated: !!state.user,
    signUp,
    signIn,
    signOut,
    clearError,
  };
}
