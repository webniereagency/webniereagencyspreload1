import { motion } from "framer-motion";

interface InterventionLineProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const InterventionLine = ({ isActive, onComplete }: InterventionLineProps) => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-[1px] -translate-x-1/2 -translate-y-1/2"
      initial={{ width: 0, opacity: 0 }}
      animate={isActive ? {
        width: ["0%", "2%", "2%", "60%", "60%", "80%"],
        opacity: [0, 1, 1, 1, 1, 0.8],
      } : {
        width: 0,
        opacity: 0,
      }}
      transition={{
        duration: 1.3,
        times: [0, 0.15, 0.25, 0.6, 0.8, 1],
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onAnimationComplete={() => {
        if (isActive && onComplete) onComplete();
      }}
      style={{
        background: "linear-gradient(90deg, transparent 0%, hsl(43 65% 52%) 20%, hsl(43 70% 65%) 50%, hsl(43 65% 52%) 80%, transparent 100%)",
        boxShadow: "0 0 20px hsl(43 65% 52% / 0.5), 0 0 40px hsl(43 65% 52% / 0.3)",
      }}
    />
  );
};
