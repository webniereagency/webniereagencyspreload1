import { motion } from "framer-motion";

interface BrandLayerProps {
  isActive: boolean;
  showTagline: boolean;
  phase: string;
}

export const BrandLayer = ({ isActive, showTagline, phase }: BrandLayerProps) => {
  const isFinal = phase === "handoff";
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      {/* Brand Mark - slow, authoritative emergence */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={isActive ? { 
          opacity: 1, 
          scale: 1,
          y: 0,
        } : { 
          opacity: 0, 
          scale: 0.7,
          y: 20,
        }}
        transition={{ 
          duration: 1.4,
          ease: [0.4, 0.0, 0.2, 1], // power3.out
        }}
      >
        <motion.div
          className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, hsl(43 65% 52%), hsl(43 55% 42%))",
          }}
          initial={{ boxShadow: "0 0 0 0 hsl(43 65% 52% / 0)" }}
          animate={isActive ? {
            boxShadow: [
              "0 0 0 0 hsl(43 65% 52% / 0)",
              "0 0 80px 20px hsl(43 65% 52% / 0.35)",
              "0 0 50px 10px hsl(43 65% 52% / 0.2)",
            ]
          } : {
            boxShadow: "0 0 0 0 hsl(43 65% 52% / 0)",
          }}
          transition={{ duration: 2, times: [0, 0.5, 1], ease: "easeOut" }}
        >
          {/* Inner shimmer */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={isActive ? { 
              opacity: [0, 0.3, 0.1],
              background: [
                "linear-gradient(135deg, transparent 0%, hsl(43 80% 70% / 0) 50%, transparent 100%)",
                "linear-gradient(135deg, transparent 0%, hsl(43 80% 70% / 0.4) 50%, transparent 100%)",
                "linear-gradient(135deg, transparent 0%, hsl(43 80% 70% / 0.15) 50%, transparent 100%)",
              ]
            } : {}}
            transition={{ duration: 1.8, delay: 0.3 }}
          />
          
          <span 
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold relative z-10"
            style={{ color: "hsl(0 0% 4%)" }}
          >
            W
          </span>
        </motion.div>
      </motion.div>
      
      {/* Brand Type - appears after mark */}
      <motion.div
        className="mt-6 md:mt-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          className="font-serif text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide"
          style={{ color: "hsl(0 0% 95%)" }}
          initial={{ y: 40, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.7, 
            ease: [0.4, 0.0, 0.2, 1] 
          }}
        >
          Webniere<span style={{ color: "hsl(43 65% 52%)" }}>Agency</span>
        </motion.h1>
      </motion.div>
      
      {/* Tagline - last to appear */}
      <motion.p
        className="absolute bottom-[14%] left-1/2 -translate-x-1/2 font-sans text-[10px] md:text-xs font-light tracking-[0.35em] uppercase text-center max-w-[280px] md:max-w-none"
        style={{ color: "hsl(0 0% 45%)" }}
        initial={{ opacity: 0, y: 15 }}
        animate={showTagline ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ 
          duration: 1, 
          delay: 0.2,
          ease: [0.4, 0.0, 0.2, 1] 
        }}
      >
        Transformation, engineered.
      </motion.p>
      
      {/* Subtle breathing glow - only when fully revealed */}
      {isActive && !isFinal && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.04, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle at center, hsl(43 65% 52% / 0.15), transparent 45%)",
          }}
        />
      )}
    </div>
  );
};
