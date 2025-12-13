import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChaosLayer } from "./layers/ChaosLayer";
import { InterventionLine } from "./layers/InterventionLine";
import { SignalLayer } from "./layers/SignalLayer";
import { BrandLayer } from "./layers/BrandLayer";
import "./preload.css";

interface PreloadContainerProps {
  onComplete: () => void;
}

type Phase = 
  | "void"              // 0.0s - 0.5s (darkness, anticipation)
  | "disorientation"    // 0.5s - 2.8s (chaos emerges slowly)
  | "overload"          // 2.8s - 4.6s (chaos intensifies)
  | "stillness"         // 4.6s - 5.0s (pause before intervention)
  | "intervention"      // 5.0s - 6.2s (the line appears)
  | "structure"         // 6.2s - 7.8s (alignment happens)
  | "signal"            // 7.8s - 8.8s (clarity achieved)
  | "identity"          // 8.8s - 9.6s (brand reveal)
  | "handoff";          // 9.6s - 10.2s (transition out)

// STRICT TIMING - minimum 10 seconds total
const PHASE_TIMINGS: Record<Phase, number> = {
  void: 0,
  disorientation: 500,
  overload: 2800,
  stillness: 4600,
  intervention: 5000,
  structure: 6200,
  signal: 7800,
  identity: 8800,
  handoff: 9600,
};

const TOTAL_DURATION = 10200;

export const PreloadContainer = ({ onComplete }: PreloadContainerProps) => {
  const [phase, setPhase] = useState<Phase>("void");
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    // NO localStorage check - runs every time
    const timers: NodeJS.Timeout[] = [];
    
    // Void to Disorientation
    timers.push(setTimeout(() => {
      setPhase("disorientation");
    }, PHASE_TIMINGS.disorientation));
    
    // Disorientation to Overload
    timers.push(setTimeout(() => {
      setPhase("overload");
    }, PHASE_TIMINGS.overload));
    
    // Overload to Stillness (intentional pause)
    timers.push(setTimeout(() => {
      setPhase("stillness");
    }, PHASE_TIMINGS.stillness));
    
    // Stillness to Intervention
    timers.push(setTimeout(() => {
      setPhase("intervention");
    }, PHASE_TIMINGS.intervention));
    
    // Intervention to Structure
    timers.push(setTimeout(() => {
      setPhase("structure");
    }, PHASE_TIMINGS.structure));
    
    // Structure to Signal
    timers.push(setTimeout(() => {
      setPhase("signal");
    }, PHASE_TIMINGS.signal));
    
    // Signal to Identity
    timers.push(setTimeout(() => {
      setPhase("identity");
    }, PHASE_TIMINGS.identity));
    
    // Identity to Handoff
    timers.push(setTimeout(() => {
      setPhase("handoff");
      setIsExiting(true);
    }, PHASE_TIMINGS.handoff));
    
    // Complete
    timers.push(setTimeout(() => {
      onComplete();
    }, TOTAL_DURATION));
    
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);
  
  // Derive which layers are active based on phase
  const showChaos = ["disorientation", "overload", "stillness", "intervention", "structure"].includes(phase);
  const showIntervention = ["intervention", "structure"].includes(phase);
  const showSignal = ["structure", "signal", "identity", "handoff"].includes(phase);
  const showBrand = ["identity", "handoff"].includes(phase);
  const showTagline = ["signal", "identity", "handoff"].includes(phase);
  
  // Calculate chaos intensity
  const getChaosIntensity = () => {
    switch (phase) {
      case "void": return 0;
      case "disorientation": return 1;
      case "overload": return 2;
      case "stillness": return 1.5;
      case "intervention": return 1;
      case "structure": return 0.3;
      default: return 0;
    }
  };
  
  return (
    <AnimatePresence>
      {!isExiting || phase === "handoff" ? (
        <motion.div
          className="preload-container"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
          }}
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background - starts pure black */}
          <motion.div
            className="absolute inset-0"
            initial={{ background: "hsl(0 0% 0%)" }}
            animate={{
              background: phase === "identity" || phase === "handoff"
                ? "hsl(0 0% 4%)"
                : phase === "signal"
                ? "hsl(0 0% 3%)"
                : "hsl(0 0% 1.5%)",
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Chaos Layer */}
          <AnimatePresence>
            {showChaos && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <ChaosLayer 
                  phase={phase} 
                  intensity={getChaosIntensity()} 
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Intervention Line */}
          <InterventionLine 
            isActive={showIntervention} 
            phase={phase}
          />
          
          {/* Signal Layer */}
          <AnimatePresence>
            {showSignal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <SignalLayer phase={phase} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Brand Layer */}
          <BrandLayer 
            isActive={showBrand} 
            showTagline={showTagline}
            phase={phase}
          />
          
          {/* Deep vignette overlay */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0.8 }}
            animate={{ 
              opacity: phase === "identity" || phase === "handoff" ? 0.3 : 0.6 
            }}
            transition={{ duration: 2 }}
            style={{
              background: "radial-gradient(ellipse at center, transparent 0%, hsl(0 0% 0% / 0.7) 70%, hsl(0 0% 0% / 0.9) 100%)",
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
