import { motion } from "framer-motion";

interface ClockLayerProps {
  timeValue: string;
  isActive: boolean;
  isSplit: boolean;
}

export const ClockLayer = ({ timeValue, isActive, isSplit }: ClockLayerProps) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className="clock-display"
        animate={{
          scale: isSplit ? 0.7 : 1,
          y: isSplit ? -60 : 0,
        }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {timeValue}
      </motion.div>
    </motion.div>
  );
};
