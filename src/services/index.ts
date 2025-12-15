/**
 * Services Index
 * 
 * Centralized exports for all service modules.
 * Import services from here for clean, maintainable code.
 */

// Authentication
export {
  signUp,
  signIn,
  signOut,
  getSession,
  getUser,
  onAuthStateChange,
  type AuthState,
  type AuthResult,
  type User,
  type Session,
} from './auth.service';

// Reviews
export {
  getReviews,
  createReview,
  onReviewsChange,
  type Review,
  type ReviewsResult,
  type CreateReviewResult,
} from './reviews.service';
