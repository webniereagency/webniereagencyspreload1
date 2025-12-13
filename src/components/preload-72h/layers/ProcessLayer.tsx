import { motion } from "framer-motion";

interface ProcessLayerProps {
  isActive: boolean;
  phase: string;
}

const IntakeIcon = () => (
  <svg viewBox="0 0 64 64" className="process-icon">
    <motion.rect
      x="12"
      y="8"
      width="40"
      height="48"
      rx="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    />
    <motion.line
      x1="20"
      y1="20"
      x2="44"
      y2="20"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    />
    <motion.line
      x1="20"
      y1="28"
      x2="38"
      y2="28"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    />
    <motion.line
      x1="20"
      y1="36"
      x2="42"
      y2="36"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    />
    <motion.polyline
      points="20,44 26,50 36,40"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="gold-stroke"
    />
  </svg>
);

const BuildIcon = () => (
  <svg viewBox="0 0 64 64" className="process-icon">
    <motion.path
      d="M8 16 L32 4 L56 16 L56 48 L32 60 L8 48 Z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    />
    <motion.line
      x1="32"
      y1="4"
      x2="32"
      y2="60"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    />
    <motion.line
      x1="8"
      y1="16"
      x2="56"
      y2="16"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    />
    <motion.circle
      cx="32"
      cy="36"
      r="8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="gold-stroke"
    />
  </svg>
);

const LaunchIcon = () => (
  <svg viewBox="0 0 64 64" className="process-icon">
    <motion.path
      d="M32 8 L32 8 C44 8 56 20 56 32 L56 32 C56 44 44 56 32 56"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
    />
    <motion.path
      d="M32 56 C20 56 8 44 8 32 L8 32 C8 20 20 8 32 8"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    />
    <motion.polygon
      points="26,22 42,32 26,42"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="gold-stroke"
      fill="none"
    />
  </svg>
);

export const ProcessLayer = ({ isActive, phase }: ProcessLayerProps) => {
  if (!isActive) return null;

  const showLabels = phase === "work" || phase === "completion" || phase === "result" || phase === "identity" || phase === "handoff";

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pt-24"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="process-section">
        <motion.div
          className="process-step"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <IntakeIcon />
          {showLabels && (
            <motion.span
              className="process-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Intake
            </motion.span>
          )}
        </motion.div>

        <motion.div
          className="process-step"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <BuildIcon />
          {showLabels && (
            <motion.span
              className="process-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Build
            </motion.span>
          )}
        </motion.div>

        <motion.div
          className="process-step"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <LaunchIcon />
          {showLabels && (
            <motion.span
              className="process-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Launch
            </motion.span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
