import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [phase, setPhase] = useState<"tiger" | "morph" | "logo" | "exit">("tiger");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("morph"), 800),
      setTimeout(() => setPhase("logo"), 1600),
      setTimeout(() => setPhase("exit"), 2400),
      setTimeout(() => onComplete(), 3000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="relative">
            {/* Tiger Phase */}
            <AnimatePresence>
              {phase === "tiger" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                  transition={{ duration: 0.6 }}
                  className="text-8xl"
                >
                  🐯
                </motion.div>
              )}
            </AnimatePresence>

            {/* Morph Phase */}
            <AnimatePresence>
              {phase === "morph" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gold via-gold-light to-gold animate-pulse-slow" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logo Phase */}
            <AnimatePresence>
              {phase === "logo" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-2xl"
                    style={{ boxShadow: "0 0 60px hsl(43 65% 52% / 0.5)" }}
                  >
                    <span className="text-primary-foreground font-bold text-4xl">W</span>
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-serif font-semibold"
                  >
                    Webniere<span className="text-primary">Agency</span>
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-1 bg-secondary rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-gold to-gold-light"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
