/**
 * Asset Map - Structural elements only
 * 
 * No icons. No illustrations. No AI-looking visuals.
 * Only: lines, grids, subtle grain, invisible geometry.
 */

// Grid configuration for invisible alignment guides
export const GRID_ASSETS = {
  // These are generated, not loaded
  ALIGNMENT_GRID: {
    columns: 12,
    gutter: 24,
    opacity: 0, // Invisible - used for positioning only
  },
  GUIDE_LINES: {
    count: 5,
    direction: 'horizontal' as const,
    opacity: 0.02, // Nearly invisible
  },
} as const;

// Grain texture configuration
export const GRAIN_CONFIG = {
  enabled: true,
  opacity: 0.015, // Barely perceptible
  size: 150,
  animated: false, // Static grain, no flicker
} as const;

// Geometric guides (computed, not visual)
export const GEOMETRY = {
  // Golden ratio points for element placement
  GOLDEN_RATIO: 1.618,
  
  // Key vertical rhythm points (as viewport percentages)
  RHYTHM_POINTS: [0.1, 0.236, 0.382, 0.5, 0.618, 0.764, 0.9],
  
  // Diagonal angles for subtle depth
  DIAGONAL_ANGLE: 2.5, // degrees - barely perceptible
} as const;

// Connection line styles (for Process section)
export const CONNECTION_LINES = {
  stroke: 'currentColor',
  strokeWidth: 1,
  opacity: 0.1,
  dashArray: '4 8',
  animationDuration: 3,
} as const;
