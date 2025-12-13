import { motion } from "framer-motion";

interface SignalLayerProps {
  isActive: boolean;
}

export const SignalLayer = ({ isActive }: SignalLayerProps) => {
  // Generate grid cells
  const gridCells = Array.from({ length: 96 }, (_, i) => i);
  
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Clean grid emerging */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-[80%] max-w-4xl aspect-video grid grid-cols-12 grid-rows-8 gap-[1px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {gridCells.map((_, index) => (
            <motion.div
              key={index}
              className="border border-border/20"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: isActive ? 0.02 * index : 0,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Horizontal alignment lines */}
      <motion.div
        className="absolute left-[10%] right-[10%] top-1/3 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isActive ? { scaleX: 1, opacity: 0.5 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />
      
      <motion.div
        className="absolute left-[10%] right-[10%] top-2/3 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isActive ? { scaleX: 1, opacity: 0.5 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />
      
      {/* Vertical alignment lines */}
      <motion.div
        className="absolute top-[10%] bottom-[10%] left-1/3 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isActive ? { scaleY: 1, opacity: 0.5 } : { scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      />
      
      <motion.div
        className="absolute top-[10%] bottom-[10%] left-2/3 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isActive ? { scaleY: 1, opacity: 0.5 } : { scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      />
      
      {/* Corner accents */}
      {[
        { top: "15%", left: "15%" },
        { top: "15%", right: "15%" },
        { bottom: "15%", left: "15%" },
        { bottom: "15%", right: "15%" },
      ].map((position, index) => (
        <motion.div
          key={index}
          className="absolute w-8 h-8"
          style={position as React.CSSProperties}
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.8 + index * 0.1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <div 
            className="absolute w-full h-[1px] bg-primary"
            style={{ top: index < 2 ? 0 : "auto", bottom: index >= 2 ? 0 : "auto" }}
          />
          <div 
            className="absolute w-[1px] h-full bg-primary"
            style={{ 
              left: index % 2 === 0 ? 0 : "auto", 
              right: index % 2 === 1 ? 0 : "auto" 
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
