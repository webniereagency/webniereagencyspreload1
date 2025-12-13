import { motion } from "framer-motion";

interface BrandLayerProps {
  isActive: boolean;
  showTagline: boolean;
}

export const BrandLayer = ({ isActive, showTagline }: BrandLayerProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      {/* Brand Mark */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <motion.div
          className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center"
          initial={{ boxShadow: "0 0 0 0 hsl(43 65% 52% / 0)" }}
          animate={isActive ? {
            boxShadow: [
              "0 0 0 0 hsl(43 65% 52% / 0)",
              "0 0 60px 10px hsl(43 65% 52% / 0.3)",
              "0 0 40px 5px hsl(43 65% 52% / 0.2)",
            ]
          } : {}}
          transition={{ duration: 1.2, times: [0, 0.5, 1] }}
        >
          <span className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">
            W
          </span>
        </motion.div>
      </motion.div>
      
      {/* Brand Type */}
      <motion.div
        className="mt-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.h1
          className="font-serif text-2xl md:text-3xl font-semibold text-foreground tracking-wide"
          initial={{ y: 30, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Webniere<span className="text-primary">Agency</span>
        </motion.h1>
      </motion.div>
      
      {/* Tagline */}
      <motion.p
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 font-sans text-xs md:text-sm font-light tracking-[0.3em] uppercase text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={showTagline ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Transformation, engineered.
      </motion.p>
      
      {/* Subtle breathing animation on brand after reveal */}
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.05, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle at center, hsl(43 65% 52% / 0.1), transparent 50%)",
          }}
        />
      )}
    </div>
  );
};
