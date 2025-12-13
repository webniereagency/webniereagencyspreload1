import { motion } from "framer-motion";

interface BrandLayerProps {
  isActive: boolean;
}

export const BrandLayer = ({ isActive }: BrandLayerProps) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="brand-container">
        {/* Logo Mark */}
        <motion.svg
          viewBox="0 0 72 72"
          className="logo-mark"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Outer hexagon */}
          <motion.path
            d="M36 4 L64 20 L64 52 L36 68 L8 52 L8 20 Z"
            fill="none"
            stroke="hsl(0 0% 100%)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
          {/* Inner W shape */}
          <motion.path
            d="M20 26 L28 46 L36 32 L44 46 L52 26"
            fill="none"
            stroke="hsl(45 70% 55%)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.svg>

        {/* Logo Type */}
        <motion.div
          className="logo-type"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Webniere<span className="gold-accent">Agency</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
