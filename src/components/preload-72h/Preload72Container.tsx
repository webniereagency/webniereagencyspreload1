import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClockLayer } from "./layers/ClockLayer";
import { ProcessLayer } from "./layers/ProcessLayer";
import { WorkLayer } from "./layers/WorkLayer";
import { ResultLayer } from "./layers/ResultLayer";
import { BrandLayer } from "./layers/BrandLayer";
import "./preload-72h.css";

interface Preload72ContainerProps {
  onComplete: () => void;
}

type Phase =
  | "void"           // 0.0s - 0.3s (pure black)
  | "timeExists"     // 0.3s - 1.5s (clock appears, holds)
  | "timeMoves"      // 1.5s - 3.5s (countdown begins)
  | "process"        // 3.5s - 5.8s (process revealed)
  | "work"           // 5.8s - 7.8s (work happens)
  | "completion"     // 7.8s - 8.8s (clock hits zero, hold)
  | "result"         // 8.8s - 9.6s (result shown)
  | "identity"       // 9.6s - 10.0s (brand reveal)
  | "handoff";       // 10.0s+ (transition out)

// STRICT ~13.5-SECOND TIMELINE
const PHASE_TIMINGS: Record<Phase, number> = {
  void: 0,
  timeExists: 300,
  timeMoves: 1000,
  process: 3000,      // ~3s time establishment
  work: 7000,         // ~4s process reveal
  completion: 10000,  // ~3s work phase
  result: 11500,      // ~1.5s completion hold
  identity: 12700,    // ~1.2s result
  handoff: 13900,     // ~1.2s identity
};

const TOTAL_DURATION = 14500;

// Format time as HH:MM:SS
const formatTime = (hours: number, minutes: number, seconds: number): string => {
  const h = String(Math.floor(hours)).padStart(2, "0");
  const m = String(Math.floor(minutes)).padStart(2, "0");
  const s = String(Math.floor(seconds)).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

export const Preload72Container = ({ onComplete }: Preload72ContainerProps) => {
  const [phase, setPhase] = useState<Phase>("void");
  const [isExiting, setIsExiting] = useState(false);
  const [clockTime, setClockTime] = useState("72:00:00");

  // Clock countdown animation
  useEffect(() => {
    if (phase !== "timeMoves" && phase !== "process" && phase !== "work" && phase !== "completion") {
      return;
    }

    const startTime = Date.now();
    const countdownDuration = PHASE_TIMINGS.completion - PHASE_TIMINGS.timeMoves; // 11.2 seconds
    const totalHours = 72;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / countdownDuration, 1);
      
      // Ease the countdown - slow at start, faster toward end
      const easedProgress = Math.pow(progress, 0.7);
      const remainingHours = totalHours * (1 - easedProgress);
      
      const hours = Math.floor(remainingHours);
      const minutes = Math.floor((remainingHours - hours) * 60);
      const seconds = Math.floor(((remainingHours - hours) * 60 - minutes) * 60);
      
      if (progress >= 1) {
        setClockTime("00:00:00");
        clearInterval(interval);
      } else {
        setClockTime(formatTime(hours, minutes, seconds));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase progression
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Void to TimeExists
    timers.push(
      setTimeout(() => setPhase("timeExists"), PHASE_TIMINGS.timeExists)
    );

    // TimeExists to TimeMoves
    timers.push(
      setTimeout(() => setPhase("timeMoves"), PHASE_TIMINGS.timeMoves)
    );

    // TimeMoves to Process
    timers.push(
      setTimeout(() => setPhase("process"), PHASE_TIMINGS.process)
    );

    // Process to Work
    timers.push(
      setTimeout(() => setPhase("work"), PHASE_TIMINGS.work)
    );

    // Work to Completion
    timers.push(
      setTimeout(() => setPhase("completion"), PHASE_TIMINGS.completion)
    );

    // Completion to Result
    timers.push(
      setTimeout(() => setPhase("result"), PHASE_TIMINGS.result)
    );

    // Result to Identity
    timers.push(
      setTimeout(() => setPhase("identity"), PHASE_TIMINGS.identity)
    );

    // Identity to Handoff
    timers.push(
      setTimeout(() => {
        setPhase("handoff");
        setIsExiting(true);
      }, PHASE_TIMINGS.handoff)
    );

    // Complete
    timers.push(
      setTimeout(() => onComplete(), TOTAL_DURATION)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Layer visibility
  const showClock = ["timeExists", "timeMoves", "process", "work", "completion"].includes(phase);
  const showProcess = ["process", "work", "completion"].includes(phase);
  const showWork = phase === "work";
  const showResult = phase === "result";
  const showBrand = ["identity", "handoff"].includes(phase);
  const isClockSplit = ["process", "work", "completion"].includes(phase);

  return (
    <AnimatePresence>
      {(!isExiting || phase === "handoff") && (
        <motion.div
          className="preload-72h"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Background */}
          <motion.div
            className="absolute inset-0"
            initial={{ background: "hsl(0 0% 0%)" }}
            animate={{
              background:
                phase === "identity" || phase === "handoff"
                  ? "hsl(0 0% 4%)"
                  : phase === "result"
                  ? "hsl(0 0% 3%)"
                  : "hsl(0 0% 0%)",
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Work Layer - Background */}
          <AnimatePresence>
            {showWork && <WorkLayer isActive={showWork} />}
          </AnimatePresence>

          {/* Clock Layer */}
          <AnimatePresence>
            {showClock && (
              <ClockLayer
                timeValue={clockTime}
                isActive={showClock}
                isSplit={isClockSplit}
              />
            )}
          </AnimatePresence>

          {/* Process Layer */}
          <AnimatePresence>
            {showProcess && <ProcessLayer isActive={showProcess} phase={phase} />}
          </AnimatePresence>

          {/* Result Layer */}
          <AnimatePresence>
            {showResult && <ResultLayer isActive={showResult} />}
          </AnimatePresence>

          {/* Brand Layer */}
          <AnimatePresence>
            {showBrand && <BrandLayer isActive={showBrand} />}
          </AnimatePresence>

          {/* Subtle vignette */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, hsl(0 0% 0% / 0.4) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
