import { motion } from "framer-motion";

interface SignalLayerProps {
  phase: string;
}

export const SignalLayer = ({ phase }: SignalLayerProps) => {
  const isSignal = phase === "signal" || phase === "identity" || phase === "handoff";
  const isFinal = phase === "identity" || phase === "handoff";
  
  // Generate grid cells
  const gridCells = Array.from({ length: 96 }, (_, i) => i);
  
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Clean grid emerging - centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-[75%] max-w-3xl aspect-video grid grid-cols-12 grid-rows-8 gap-[1px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isSignal ? { 
            opacity: isFinal ? 0.15 : 0.3, 
            scale: 1 
          } : { 
            opacity: 0.4, 
            scale: 0.95 
          }}
          transition={{ duration: 1.8, ease: [0.4, 0.0, 0.2, 1] }}
        >
          {gridCells.map((_, index) => (
            <motion.div
              key={index}
              className="border"
              style={{ borderColor: "hsl(0 0% 15%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isSignal ? 0.6 : 1 }}
              transition={{
                duration: 0.5,
                delay: 0.015 * index,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Primary horizontal alignment line */}
      <motion.div
        className="absolute left-[8%] right-[8%] top-1/2 h-[1px]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isSignal ? { 
          scaleX: 1, 
          opacity: isFinal ? 0.2 : 0.5 
        } : { 
          scaleX: 0.7, 
          opacity: 0.6 
        }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(0 0% 35%) 20%, hsl(0 0% 40%) 50%, hsl(0 0% 35%) 80%, transparent 100%)",
        }}
      />
      
      {/* Secondary horizontal lines */}
      <motion.div
        className="absolute left-[15%] right-[15%] top-[35%] h-[1px]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isSignal ? { scaleX: 1, opacity: 0.25 } : { scaleX: 0.5, opacity: 0.4 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
        style={{
          background: "linear-gradient(90deg, transparent, hsl(0 0% 25%), transparent)",
        }}
      />
      
      <motion.div
        className="absolute left-[15%] right-[15%] top-[65%] h-[1px]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isSignal ? { scaleX: 1, opacity: 0.25 } : { scaleX: 0.5, opacity: 0.4 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        style={{
          background: "linear-gradient(90deg, transparent, hsl(0 0% 25%), transparent)",
        }}
      />
      
      {/* Vertical alignment lines */}
      <motion.div
        className="absolute top-[12%] bottom-[12%] left-1/2 w-[1px] -translate-x-1/2"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isSignal ? { 
          scaleY: 1, 
          opacity: isFinal ? 0.15 : 0.4 
        } : { 
          scaleY: 0.6, 
          opacity: 0.5 
        }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
        style={{
          background: "linear-gradient(180deg, transparent 0%, hsl(0 0% 30%) 20%, hsl(0 0% 35%) 50%, hsl(0 0% 30%) 80%, transparent 100%)",
        }}
      />
      
      <motion.div
        className="absolute top-[20%] bottom-[20%] left-[35%] w-[1px]"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isSignal ? { scaleY: 1, opacity: 0.2 } : { scaleY: 0.4, opacity: 0.35 }}
        transition={{ duration: 1.0, delay: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        style={{
          background: "linear-gradient(180deg, transparent, hsl(0 0% 22%), transparent)",
        }}
      />
      
      <motion.div
        className="absolute top-[20%] bottom-[20%] left-[65%] w-[1px]"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isSignal ? { scaleY: 1, opacity: 0.2 } : { scaleY: 0.4, opacity: 0.35 }}
        transition={{ duration: 1.0, delay: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
        style={{
          background: "linear-gradient(180deg, transparent, hsl(0 0% 22%), transparent)",
        }}
      />
      
      {/* Corner brackets - authority markers */}
      {[
        { top: "18%", left: "18%", rotateVal: "0deg" },
        { top: "18%", right: "18%", rotateVal: "90deg" },
        { bottom: "18%", right: "18%", rotateVal: "180deg" },
        { bottom: "18%", left: "18%", rotateVal: "270deg" },
      ].map((position, index) => {
        const { rotateVal, ...pos } = position;
        return (
          <motion.div
            key={index}
            className="absolute w-10 h-10 md:w-12 md:h-12"
            style={{ 
              ...pos,
              transform: `rotate(${rotateVal})`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isSignal ? { 
              opacity: isFinal ? 0.3 : 0.6, 
              scale: 1 
            } : { 
              opacity: 0.5, 
              scale: 0.8 
            }}
            transition={{ 
              duration: 0.8, 
              delay: 0.8 + index * 0.12,
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            <div 
              className="absolute top-0 left-0 w-full h-[1px]"
              style={{ background: "hsl(43 65% 52%)" }}
            />
            <div 
              className="absolute top-0 left-0 w-[1px] h-full"
              style={{ background: "hsl(43 65% 52%)" }}
            />
          </motion.div>
        );
      })}
      
      {/* Subtle center crosshair */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0 }}
        animate={isSignal ? { 
          opacity: isFinal ? 0 : 0.4, 
          scale: 1 
        } : { 
          opacity: 0.5, 
          scale: 0.8 
        }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <div className="w-6 h-[1px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/50" />
        <div className="w-[1px] h-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/50" />
      </motion.div>
    </motion.div>
  );
};
