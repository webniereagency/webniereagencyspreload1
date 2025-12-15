/**
 * Motion Constants - The DNA of our narrative animation system
 * 
 * These values define the feeling, not the mechanics.
 * Every constant is tuned to tell the story: Intent → Structure → Impact
 */

// Timing - Slow, confident, grounded
export const TIMING = {
  // Hero phases (in seconds)
  INTENT_EMERGES: { start: 0, duration: 2 },
  ALIGNMENT: { start: 2, duration: 2 },
  PRESENCE: { start: 4, duration: 2 },
  
  // Easing curves - organic, never mechanical
  EASE_INTENT: [0.16, 1, 0.3, 1], // Slow start, confident end
  EASE_SETTLE: [0.33, 1, 0.68, 1], // Natural settling
  EASE_BREATH: [0.37, 0, 0.63, 1], // Sine-like for breathing
  
  // Delays (in seconds)
  STAGGER_SUBTLE: 0.08,
  STAGGER_ELEMENT: 0.15,
} as const;

// Movement - Minimal, meaningful
export const MOVEMENT = {
  // Hero entrance distances
  HEADLINE_RISE: 40, // px - emerges from within
  SUBTEXT_RISE: 25,
  CTA_RISE: 20,
  
  // Breathing motion (Phase 3)
  BREATH_AMPLITUDE: 1.5, // px max
  BREATH_DURATION: 4, // seconds
  
  // Scroll-based parallax depths
  PARALLAX: {
    BACKGROUND: 0.1,
    MID: 0.3,
    FOREGROUND: 0.6,
  },
  
  // Subtle drift for background elements
  DRIFT_RANGE: 3, // px
  DRIFT_DURATION: 8, // seconds
} as const;

// Opacity - Never abrupt
export const OPACITY = {
  HIDDEN: 0,
  SUBTLE: 0.3,
  PRESENT: 0.7,
  FULL: 1,
  
  // Transition durations
  FADE_SLOW: 1.2,
  FADE_MEDIUM: 0.8,
  FADE_QUICK: 0.4,
} as const;

// Scale - Confidence, not drama
export const SCALE = {
  INITIAL: 0.97, // Almost there, not dramatic
  SETTLED: 1,
  HOVER_SUBTLE: 1.01,
} as const;

// Scroll thresholds - When story chapters change
export const SCROLL_CHAPTERS = {
  HERO_END: 0.15, // Hero fully revealed
  SERVICES_PEAK: 0.35,
  PROCESS_PEAK: 0.55,
  PORTFOLIO_PEAK: 0.75,
  TRUST_ZONE: 0.9, // Motion almost stops
} as const;

// Performance - Non-negotiable
export const PERFORMANCE = {
  WILL_CHANGE_THRESHOLD: 0.1, // Only apply will-change when needed
  REDUCE_MOTION_FALLBACK: true,
  MAX_ACTIVE_ANIMATIONS: 8,
} as const;
