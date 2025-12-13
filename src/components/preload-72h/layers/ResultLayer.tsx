import { motion } from "framer-motion";

interface ResultLayerProps {
  isActive: boolean;
}

export const ResultLayer = ({ isActive }: ResultLayerProps) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="result-container">
        {/* Website Mock */}
        <motion.div
          className="website-mock"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Mock Header */}
          <div className="mock-header">
            <div className="mock-dot" />
            <div className="mock-dot" />
            <div className="mock-dot" />
          </div>

          {/* Mock Content */}
          <div className="mock-content">
            <motion.div
              className="mock-line short"
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.div
              className="mock-line long"
              initial={{ width: 0 }}
              animate={{ width: "90%" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.div
              className="mock-line medium"
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.div
              className="mock-line long"
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            <motion.div
              className="mock-line medium"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </div>

          {/* Subtle breathing animation */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 0 1px hsl(45 70% 55% / 0)",
                "0 0 0 1px hsl(45 70% 55% / 0.3)",
                "0 0 0 1px hsl(45 70% 55% / 0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Result Text */}
        <motion.p
          className="result-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Delivered. <span className="gold-accent">Every time.</span>
        </motion.p>
      </div>
    </motion.div>
  );
};
