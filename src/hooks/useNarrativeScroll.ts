/**
 * useNarrativeScroll - Hook for scroll-based narrative progression
 * 
 * Uses scroll position as progress, not trigger.
 * Interpolation over keyframe spam.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getScrollProgress,
  shouldReduceMotion,
  type ScrollProgress,
} from '@/animations/home-narrative';

interface UseNarrativeScrollReturn {
  scrollProgress: ScrollProgress;
  isReducedMotion: boolean;
  scrollY: number;
}

export const useNarrativeScroll = (): UseNarrativeScrollReturn => {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    raw: 0,
    chapter: 'hero',
    chapterProgress: 0,
  });
  const [scrollY, setScrollY] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const rafRef = useRef<number>();
  const lastScrollY = useRef(0);

  // Check for reduced motion preference
  useEffect(() => {
    setIsReducedMotion(shouldReduceMotion());
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (rafRef.current) return; // Skip if already scheduled
    
    rafRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      
      // Only update if scroll changed meaningfully (debounce tiny movements)
      if (Math.abs(currentScrollY - lastScrollY.current) > 1) {
        lastScrollY.current = currentScrollY;
        setScrollY(currentScrollY);
        
        const documentHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        
        setScrollProgress(getScrollProgress(currentScrollY, documentHeight, viewportHeight));
      }
      
      rafRef.current = undefined;
    });
  }, []);

  useEffect(() => {
    // Initial calculation
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return {
    scrollProgress,
    isReducedMotion,
    scrollY,
  };
};

export default useNarrativeScroll;
