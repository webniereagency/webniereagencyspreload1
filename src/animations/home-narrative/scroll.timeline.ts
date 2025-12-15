/**
 * Scroll Timeline - The Continuing Story
 * 
 * Scrolling does not trigger animations.
 * Scrolling reveals progress in a pre-written story.
 * 
 * Each section is a chapter that builds on the previous.
 */

import { SCROLL_CHAPTERS, TIMING, MOVEMENT, OPACITY } from './motion.constants';

// Types
export interface ScrollProgress {
  raw: number; // 0-1 based on document
  chapter: 'hero' | 'services' | 'process' | 'portfolio' | 'trust';
  chapterProgress: number; // 0-1 within current chapter
}

// Calculate current scroll progress and chapter
export const getScrollProgress = (scrollY: number, documentHeight: number, viewportHeight: number): ScrollProgress => {
  const maxScroll = documentHeight - viewportHeight;
  const raw = Math.min(Math.max(scrollY / maxScroll, 0), 1);
  
  let chapter: ScrollProgress['chapter'] = 'hero';
  let chapterProgress = 0;
  
  if (raw < SCROLL_CHAPTERS.HERO_END) {
    chapter = 'hero';
    chapterProgress = raw / SCROLL_CHAPTERS.HERO_END;
  } else if (raw < SCROLL_CHAPTERS.SERVICES_PEAK) {
    chapter = 'services';
    chapterProgress = (raw - SCROLL_CHAPTERS.HERO_END) / (SCROLL_CHAPTERS.SERVICES_PEAK - SCROLL_CHAPTERS.HERO_END);
  } else if (raw < SCROLL_CHAPTERS.PROCESS_PEAK) {
    chapter = 'process';
    chapterProgress = (raw - SCROLL_CHAPTERS.SERVICES_PEAK) / (SCROLL_CHAPTERS.PROCESS_PEAK - SCROLL_CHAPTERS.SERVICES_PEAK);
  } else if (raw < SCROLL_CHAPTERS.PORTFOLIO_PEAK) {
    chapter = 'portfolio';
    chapterProgress = (raw - SCROLL_CHAPTERS.PROCESS_PEAK) / (SCROLL_CHAPTERS.PORTFOLIO_PEAK - SCROLL_CHAPTERS.PROCESS_PEAK);
  } else {
    chapter = 'trust';
    chapterProgress = (raw - SCROLL_CHAPTERS.PORTFOLIO_PEAK) / (1 - SCROLL_CHAPTERS.PORTFOLIO_PEAK);
  }
  
  return { raw, chapter, chapterProgress };
};

// Interpolate between values based on progress
export const interpolate = (from: number, to: number, progress: number): number => {
  return from + (to - from) * Math.min(Math.max(progress, 0), 1);
};

// Services Section - Background sharpens, cards already settled
export const getServicesState = (chapterProgress: number) => ({
  backgroundSharpness: interpolate(0.95, 1, chapterProgress),
  gridOpacity: interpolate(0, 0.02, chapterProgress),
  cardOpacity: 1, // Cards appear settled, not animated in
  cardTransform: {
    y: 0, // Already in place
    scale: 1,
  },
});

// Process Section - Steps connect, context preserved
export const getProcessState = (chapterProgress: number) => ({
  connectionLineProgress: interpolate(0, 1, chapterProgress * 1.5), // Lines draw ahead
  stepOpacity: (stepIndex: number) => {
    // Each step fades but never disappears - becomes context
    const stepStart = stepIndex * 0.3;
    const localProgress = Math.max(0, chapterProgress - stepStart);
    return interpolate(0.7, 1, Math.min(localProgress * 3, 1));
  },
  contextOpacity: (stepIndex: number) => {
    // Previous steps become subtle context
    const isBehind = chapterProgress > (stepIndex + 1) * 0.3;
    return isBehind ? 0.6 : 1;
  },
});

// Portfolio Section - Weight and depth
export const getPortfolioState = (chapterProgress: number) => ({
  // Motion slows further
  transitionSpeed: interpolate(1, 0.6, chapterProgress),
  // Parallax increases
  parallaxMultiplier: interpolate(1, 1.3, chapterProgress),
  // Cards feel heavier
  cardWeight: {
    shadowOpacity: interpolate(0.1, 0.2, chapterProgress),
    scale: 1, // No scale change - stability
  },
});

// Trust Section - Motion almost stops
export const getTrustState = (chapterProgress: number) => ({
  // Only micro-interactions remain
  motionScale: interpolate(1, 0.3, chapterProgress), // Reduce all motion
  // Breathing becomes imperceptible
  breathAmplitude: interpolate(MOVEMENT.BREATH_AMPLITUDE, MOVEMENT.BREATH_AMPLITUDE * 0.2, chapterProgress),
  // Stillness communicates trust
  stillness: chapterProgress > 0.5,
});

// Global scroll-based transforms
export const getScrollBasedTransform = (
  elementDepth: 'background' | 'mid' | 'foreground',
  scrollY: number
) => {
  const depths = {
    background: MOVEMENT.PARALLAX.BACKGROUND,
    mid: MOVEMENT.PARALLAX.MID,
    foreground: MOVEMENT.PARALLAX.FOREGROUND,
  };
  
  return {
    y: scrollY * depths[elementDepth] * -0.1,
    opacity: 1,
  };
};

// Reduce motion preference check
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Fallback values when motion is reduced
export const getReducedMotionFallback = () => ({
  opacity: 1,
  transform: 'none',
  transition: 'opacity 0.3s ease',
});
