/**
 * Home Narrative Animation System
 * 
 * A signature animation system that tells a story through motion.
 * This is not decoration - this is storytelling.
 * 
 * Story: An idea forms → gains structure → becomes visible → creates impact
 */

// Motion constants - the DNA
export {
  TIMING,
  MOVEMENT,
  OPACITY,
  SCALE,
  SCROLL_CHAPTERS,
  PERFORMANCE,
} from './motion.constants';

// Asset configuration
export {
  GRID_ASSETS,
  GRAIN_CONFIG,
  GEOMETRY,
  CONNECTION_LINES,
} from './asset.map';

// Hero sequence - the opening chapter
export {
  backgroundVariants,
  badgeVariants,
  headlineVariants,
  subtextVariants,
  ctaVariants,
  statsVariants,
  breathingAnimation,
  scrollIndicatorVariants,
  heroContainerVariants,
  getAnimationPhase,
} from './hero.sequence';

// Scroll timeline - the continuing story
export {
  getScrollProgress,
  interpolate,
  getServicesState,
  getProcessState,
  getPortfolioState,
  getTrustState,
  getScrollBasedTransform,
  shouldReduceMotion,
  getReducedMotionFallback,
  type ScrollProgress,
} from './scroll.timeline';
