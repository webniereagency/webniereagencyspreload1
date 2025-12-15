import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  badgeVariants,
  headlineVariants,
  subtextVariants,
  ctaVariants,
  statsVariants,
  breathingAnimation,
  scrollIndicatorVariants,
  TIMING,
  MOVEMENT,
} from "@/animations/home-narrative";
import { useNarrativeScroll } from "@/hooks/useNarrativeScroll";

export const HeroSection = () => {
  const [animationPhase, setAnimationPhase] = useState<'hidden' | 'intent' | 'aligned' | 'present'>('hidden');
  const { isReducedMotion, scrollProgress } = useNarrativeScroll();
  const controls = useAnimation();

  // Orchestrate the three-phase narrative
  useEffect(() => {
    if (isReducedMotion) {
      setAnimationPhase('present');
      return;
    }

    const runNarrative = async () => {
      // Phase 1: Intent Emerges (0-2s)
      setAnimationPhase('intent');
      await new Promise(resolve => setTimeout(resolve, TIMING.INTENT_EMERGES.duration * 1000));
      
      // Phase 2: Alignment (2-4s)
      setAnimationPhase('aligned');
      await new Promise(resolve => setTimeout(resolve, TIMING.ALIGNMENT.duration * 1000));
      
      // Phase 3: Presence (4-6s+)
      setAnimationPhase('present');
      controls.start('present');
    };

    runNarrative();
  }, [isReducedMotion, controls]);

  // Subtle parallax based on scroll
  const heroParallax = scrollProgress.chapter === 'hero' 
    ? { y: scrollProgress.chapterProgress * -30 }
    : { y: -30 };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects - Subtle drift in Phase 1, settles in Phase 2 */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-card"
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: animationPhase === 'hidden' ? 0.8 : 1,
        }}
        transition={{ duration: TIMING.INTENT_EMERGES.duration, ease: TIMING.EASE_INTENT }}
      />
      
      {/* Ambient glow - emerges slowly */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, hsl(43 65% 52% / 0.15) 0%, transparent 50%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: animationPhase === 'hidden' ? 0 : animationPhase === 'intent' ? 0.15 : 0.3,
        }}
        transition={{ duration: TIMING.ALIGNMENT.duration, ease: TIMING.EASE_SETTLE }}
      />

      {/* Floating orbs - subtle drift initially, then settle */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        initial={{ x: MOVEMENT.DRIFT_RANGE, y: MOVEMENT.DRIFT_RANGE, opacity: 0 }}
        animate={{ 
          x: animationPhase === 'intent' ? MOVEMENT.DRIFT_RANGE / 2 : 0,
          y: animationPhase === 'intent' ? MOVEMENT.DRIFT_RANGE / 2 : 0,
          opacity: animationPhase === 'hidden' ? 0 : 1,
        }}
        transition={{ 
          duration: animationPhase === 'intent' ? TIMING.INTENT_EMERGES.duration : TIMING.ALIGNMENT.duration,
          ease: TIMING.EASE_SETTLE,
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        initial={{ x: -MOVEMENT.DRIFT_RANGE, y: -MOVEMENT.DRIFT_RANGE, opacity: 0 }}
        animate={{ 
          x: animationPhase === 'intent' ? -MOVEMENT.DRIFT_RANGE / 2 : 0,
          y: animationPhase === 'intent' ? -MOVEMENT.DRIFT_RANGE / 2 : 0,
          opacity: animationPhase === 'hidden' ? 0 : 1,
        }}
        transition={{ 
          duration: animationPhase === 'intent' ? TIMING.INTENT_EMERGES.duration : TIMING.ALIGNMENT.duration,
          ease: TIMING.EASE_SETTLE,
          delay: 0.2,
        }}
      />

      {/* Grid Pattern - subtle alignment guide */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase === 'present' ? 0.02 : 0.01 }}
        transition={{ duration: TIMING.ALIGNMENT.duration, delay: TIMING.INTENT_EMERGES.duration }}
      />

      <motion.div 
        className="container-custom relative z-10"
        animate={heroParallax}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge - First hint of presence */}
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate={animationPhase !== 'hidden' ? 'intentEmerges' : 'hidden'}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Professional Web Development</span>
          </motion.div>

          {/* Main Headline - Emerges from within, slow and confident */}
          <motion.h1
            variants={headlineVariants}
            initial="hidden"
            animate={animationPhase !== 'hidden' ? 'intentEmerges' : 'hidden'}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6"
          >
            <motion.span
              animate={animationPhase === 'present' && !isReducedMotion ? breathingAnimation : {}}
              style={{ display: 'inline-block' }}
            >
              Modern Websites for{" "}
              <span className="text-gradient">Local Businesses</span>
            </motion.span>
            <br />
            <span className="text-muted-foreground">Delivered in 72 Hours</span>
          </motion.h1>

          {/* Subheadline - Aligns after headline settles */}
          <motion.p
            variants={subtextVariants}
            initial="hidden"
            animate={['aligned', 'present'].includes(animationPhase) ? 'aligned' : 'hidden'}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            We transform outdated sites into fast, beautiful, professionally-crafted websites.
            Answer a few questions, provide access, pay — and we deliver.
          </motion.p>

          {/* CTA Buttons - Align into grid */}
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate={['aligned', 'present'].includes(animationPhase) ? 'aligned' : 'hidden'}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/order">
              <Button variant="hero" size="xl" className="group">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="heroOutline" size="xl">
                See Portfolio
              </Button>
            </Link>
          </motion.div>

          {/* Stats - Settle into place with subtle stagger */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Clock, value: "72h", label: "Delivery Time" },
              { icon: Zap, value: "100+", label: "Projects Delivered" },
              { icon: Sparkles, value: "98%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={statsVariants}
                initial="hidden"
                animate={['aligned', 'present'].includes(animationPhase) ? statsVariants.aligned(index) : 'hidden'}
                className="flex flex-col items-center p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm"
              >
                <motion.div
                  animate={animationPhase === 'present' && !isReducedMotion ? {
                    y: [0, -MOVEMENT.BREATH_AMPLITUDE * 0.5, 0],
                    transition: {
                      duration: MOVEMENT.BREATH_DURATION + index * 0.5,
                      repeat: Infinity,
                      ease: TIMING.EASE_BREATH,
                      delay: index * 0.3,
                    }
                  } : {}}
                >
                  <stat.icon className="w-8 h-8 text-primary mb-3" />
                </motion.div>
                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator - appears last, subtle */}
      <motion.div
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate={animationPhase === 'present' ? 'present' : 'hidden'}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={animationPhase === 'present' && !isReducedMotion ? { y: [0, 10, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
