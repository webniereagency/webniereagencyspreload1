/**
 * Hero Sequence - The Opening Chapter
 * 
 * Story: An idea forms → gains structure → becomes visible → creates impact
 * 
 * Phase 1 (0-2s): Intent Emerges - Ideas don't rush, they form
 * Phase 2 (2-4s): Alignment - Professional work brings order
 * Phase 3 (4-6s): Presence - Confidence doesn't move loudly
 */

import { TIMING, MOVEMENT, OPACITY, SCALE } from './motion.constants';

// Types for animation variants
export interface HeroAnimationVariants {
  hidden: Record<string, number | string>;
  intentEmerges: Record<string, number | string | number[]>;
  aligned: Record<string, number | string | number[]>;
  present: Record<string, number | string | number[]>;
}

// Background elements - subtle drift, slightly misaligned initially
export const backgroundVariants = {
  hidden: {
    opacity: 0,
    x: MOVEMENT.DRIFT_RANGE,
    y: MOVEMENT.DRIFT_RANGE,
  },
  intentEmerges: {
    opacity: OPACITY.SUBTLE,
    x: MOVEMENT.DRIFT_RANGE / 2,
    y: MOVEMENT.DRIFT_RANGE / 2,
    transition: {
      duration: TIMING.INTENT_EMERGES.duration,
      ease: TIMING.EASE_INTENT,
    },
  },
  aligned: {
    opacity: OPACITY.PRESENT,
    x: 0,
    y: 0,
    transition: {
      duration: TIMING.ALIGNMENT.duration,
      ease: TIMING.EASE_SETTLE,
    },
  },
  present: {
    opacity: OPACITY.PRESENT,
    x: 0,
    y: 0,
  },
};

// Badge - first element to hint at presence
export const badgeVariants = {
  hidden: {
    opacity: 0,
    y: MOVEMENT.SUBTEXT_RISE / 2,
    scale: SCALE.INITIAL,
  },
  intentEmerges: {
    opacity: OPACITY.FULL,
    y: 0,
    scale: SCALE.SETTLED,
    transition: {
      duration: TIMING.INTENT_EMERGES.duration * 0.8,
      delay: 0.3,
      ease: TIMING.EASE_INTENT,
    },
  },
};

// Headline - emerges from within, not from off-screen
export const headlineVariants = {
  hidden: {
    opacity: 0,
    y: MOVEMENT.HEADLINE_RISE,
    scale: SCALE.INITIAL,
  },
  intentEmerges: {
    opacity: OPACITY.FULL,
    y: 0,
    scale: SCALE.SETTLED,
    transition: {
      duration: TIMING.INTENT_EMERGES.duration,
      delay: 0.1,
      ease: TIMING.EASE_INTENT,
    },
  },
};

// Subtext - follows headline with grace
export const subtextVariants = {
  hidden: {
    opacity: 0,
    y: MOVEMENT.SUBTEXT_RISE,
  },
  aligned: {
    opacity: OPACITY.FULL,
    y: 0,
    transition: {
      duration: TIMING.ALIGNMENT.duration * 0.8,
      delay: TIMING.INTENT_EMERGES.duration + 0.1,
      ease: TIMING.EASE_SETTLE,
    },
  },
};

// CTA buttons - align into position
export const ctaVariants = {
  hidden: {
    opacity: 0,
    y: MOVEMENT.CTA_RISE,
  },
  aligned: {
    opacity: OPACITY.FULL,
    y: 0,
    transition: {
      duration: TIMING.ALIGNMENT.duration * 0.7,
      delay: TIMING.INTENT_EMERGES.duration + 0.3,
      ease: TIMING.EASE_SETTLE,
    },
  },
};

// Stats cards - settle into place
export const statsVariants = {
  hidden: {
    opacity: 0,
    y: MOVEMENT.CTA_RISE,
    scale: SCALE.INITIAL,
  },
  aligned: (index: number) => ({
    opacity: OPACITY.FULL,
    y: 0,
    scale: SCALE.SETTLED,
    transition: {
      duration: TIMING.ALIGNMENT.duration * 0.8,
      delay: TIMING.INTENT_EMERGES.duration + TIMING.ALIGNMENT.duration * 0.5 + index * TIMING.STAGGER_SUBTLE,
      ease: TIMING.EASE_SETTLE,
    },
  }),
};

// Breathing animation for Phase 3 - the page feels alive but calm
export const breathingAnimation = {
  y: [0, -MOVEMENT.BREATH_AMPLITUDE, 0],
  transition: {
    duration: MOVEMENT.BREATH_DURATION,
    repeat: Infinity,
    ease: TIMING.EASE_BREATH,
  },
};

// Scroll indicator - subtle presence
export const scrollIndicatorVariants = {
  hidden: {
    opacity: 0,
  },
  present: {
    opacity: 0.6,
    transition: {
      delay: TIMING.INTENT_EMERGES.duration + TIMING.ALIGNMENT.duration + 1,
      duration: OPACITY.FADE_SLOW,
    },
  },
};

// Container orchestration
export const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

// Compute animation phase based on time
export const getAnimationPhase = (elapsedSeconds: number): 'intent' | 'alignment' | 'presence' => {
  if (elapsedSeconds < TIMING.INTENT_EMERGES.duration) {
    return 'intent';
  } else if (elapsedSeconds < TIMING.INTENT_EMERGES.duration + TIMING.ALIGNMENT.duration) {
    return 'alignment';
  }
  return 'presence';
};
