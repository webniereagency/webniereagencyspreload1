/**
 * Reviews Service
 * 
 * This service provides a clean abstraction layer for reviews operations.
 * Currently prepared for Supabase integration.
 * 
 * INTEGRATION GUIDE:
 * 1. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment
 * 2. Create the 'reviews' table in Supabase with the expected schema
 * 3. The service will automatically use Supabase when configured
 */

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Review } from '@/types/database';

// Re-export types for consumers
export type { Review };

// Result types
export interface ReviewsResult {
  success: boolean;
  error: string | null;
  data: Review[] | null;
}

export interface CreateReviewResult {
  success: boolean;
  error: string | null;
  data: Review | null;
}

/**
 * Fetch all reviews
 */
export async function getReviews(): Promise<ReviewsResult> {
  if (!isSupabaseConfigured || !supabase) {
    // TODO: Replace with Supabase query when configured
    console.warn('[Reviews] Supabase not configured - returning empty array');
    return { success: true, error: null, data: [] };
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message, data: null };
    }

    return { success: true, error: null, data };
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
      data: null 
    };
  }
}

/**
 * Create a new review
 */
export async function createReview(
  name: string,
  rating: number,
  content: string
): Promise<CreateReviewResult> {
  if (!isSupabaseConfigured || !supabase) {
    // TODO: Replace with Supabase insert when configured
    console.warn('[Reviews] Supabase not configured - createReview is a no-op');
    
    // Return a mock review for frontend-only mode
    const mockReview: Review = {
      id: `local-${Date.now()}`,
      name,
      rating,
      content,
      created_at: new Date().toISOString(),
    };
    
    return { success: true, error: null, data: mockReview };
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ name, rating, content }])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message, data: null };
    }

    return { success: true, error: null, data };
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
      data: null 
    };
  }
}

/**
 * Subscribe to real-time review updates
 * Returns an unsubscribe function
 */
export function onReviewsChange(
  callback: (reviews: Review[]) => void
): () => void {
  if (!isSupabaseConfigured || !supabase) {
    // Return no-op unsubscribe
    return () => {};
  }

  const channel = supabase
    .channel('reviews-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'reviews',
      },
      async () => {
        // Refetch all reviews on any change
        const result = await getReviews();
        if (result.success && result.data) {
          callback(result.data);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
