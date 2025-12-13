import { useState, useEffect, useCallback } from "react";
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
  | "disorientation"   // 0.0s - 2.2s
  | "overload"         // 2.2s - 4.1s
  | "intervention"     // 4.1s - 5.4s
  | "structure"        // 5.4s - 7.2s
  | "signal"           // 7.2s - 8.6s
  | "identity"         // 8.6s - 9.6s
  | "handoff";         // 9.6s - 10.0s

const PHASE_TIMINGS: Record<Phase, number> = {
  disorientation: 0,
  overload: 2200,
  intervention: 4100,
  structure: 5400,
  signal: 7200,
  identity: 8600,
  handoff: 9600,
};

const TOTAL_DURATION = 10000;
const STORAGE_KEY = "webniere_preload_seen";

export const PreloadContainer = ({ onComplete }: PreloadContainerProps) => {
  const [phase, setPhase] = useState<Phase>("disorientation");
  const [isExiting, setIsExiting] = useState(false);
  const [phaseNumber, setPhaseNumber] = useState(1);
  
  // Check if preload was already seen
  const shouldSkip = useCallback(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  }, []);
  
  // Mark as seen
  const markAsSeen = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
    }
  }, []);
  
  useEffect(() => {
    // Skip if already seen
    if (shouldSkip()) {
      onComplete();
      return;
    }
    
    // Phase transitions
    const timers: NodeJS.Timeout[] = [];
    
    // Disorientation to Overload
    timers.push(setTimeout(() => {
      setPhase("overload");
      setPhaseNumber(2);
    }, PHASE_TIMINGS.overload));
    
    // Overload to Intervention
    timers.push(setTimeout(() => {
      setPhase("intervention");
      setPhaseNumber(3);
    }, PHASE_TIMINGS.intervention));
    
    // Intervention to Structure
    timers.push(setTimeout(() => {
      setPhase("structure");
      setPhaseNumber(4);
    }, PHASE_TIMINGS.structure));
    
    // Structure to Signal
    timers.push(setTimeout(() => {
      setPhase("signal");
      setPhaseNumber(5);
    }, PHASE_TIMINGS.signal));
    
    // Signal to Identity
    timers.push(setTimeout(() => {
      setPhase("identity");
      setPhaseNumber(6);
    }, PHASE_TIMINGS.identity));
    
    // Identity to Handoff
    timers.push(setTimeout(() => {
      setPhase("handoff");
      setPhaseNumber(7);
      setIsExiting(true);
    }, PHASE_TIMINGS.handoff));
    
    // Complete
    timers.push(setTimeout(() => {
      markAsSeen();
      onComplete();
    }, TOTAL_DURATION));
    
    return () => timers.forEach(clearTimeout);
  }, [onComplete, shouldSkip, markAsSeen]);
  
  // Derive which layers are active based on phase
  const showChaos = ["disorientation", "overload", "intervention", "structure"].includes(phase);
  const showIntervention = phase === "intervention";
  const showSignal = ["structure", "signal", "identity", "handoff"].includes(phase);
  const showBrand = ["identity", "handoff"].includes(phase);
  const showTagline = ["signal", "identity", "handoff"].includes(phase);
  
  return (
    <AnimatePresence>
      {!isExiting || phase === "handoff" ? (
        <motion.div
          className="preload-container"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
          }}
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Background gradient transition */}
          <motion.div
            className="absolute inset-0"
            initial={{ background: "hsl(0 0% 2%)" }}
            animate={{
              background: phase === "identity" || phase === "handoff"
                ? "hsl(0 0% 4%)"
                : "hsl(0 0% 2%)",
            }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Chaos Layer */}
          <AnimatePresence>
            {showChaos && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <ChaosLayer phase={phaseNumber} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Intervention Line */}
          <InterventionLine isActive={showIntervention} />
          
          {/* Signal Layer */}
          <AnimatePresence>
            {showSignal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <SignalLayer isActive={showSignal} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Brand Layer */}
          <BrandLayer isActive={showBrand} showTagline={showTagline} />
          
          {/* Vignette overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 0%, hsl(0 0% 2% / 0.4) 100%)",
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

// Utility to reset preload (for testing)
export const resetPreload = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
};
