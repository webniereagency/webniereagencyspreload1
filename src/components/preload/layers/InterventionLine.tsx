import { motion } from "framer-motion";

interface InterventionLineProps {
  isActive: boolean;
  phase: string;
}

export const InterventionLine = ({ isActive, phase }: InterventionLineProps) => {
  // The line animation is slow and deliberate
  const isStructure = phase === "structure";
  
  return (
    <>
      {/* Main intervention line */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[1px] -translate-x-1/2 -translate-y-1/2"
        initial={{ width: 0, opacity: 0 }}
        animate={isActive ? {
          width: isStructure 
            ? ["2%", "60%", "85%", "100%"]
            : ["0%", "0.5%", "1%", "2%"],
          opacity: isStructure 
            ? [1, 1, 0.9, 0.7]
            : [0, 0.8, 1, 1],
        } : {
          width: 0,
          opacity: 0,
        }}
        transition={{
          duration: isStructure ? 1.8 : 1.2,
          times: isStructure ? [0, 0.4, 0.7, 1] : [0, 0.3, 0.6, 1],
          ease: [0.4, 0.0, 0.2, 1], // power3.inOut
        }}
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(43 65% 52%) 15%, hsl(43 70% 60%) 50%, hsl(43 65% 52%) 85%, transparent 100%)",
          boxShadow: isActive 
            ? "0 0 30px hsl(43 65% 52% / 0.5), 0 0 60px hsl(43 65% 52% / 0.25), 0 0 100px hsl(43 65% 52% / 0.15)"
            : "none",
        }}
      />
      
      {/* Secondary pulse lines that appear during structure phase */}
      {isStructure && (
        <>
          <motion.div
            className="absolute left-1/2 top-1/3 h-[1px] -translate-x-1/2"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: ["0%", "40%", "50%"],
              opacity: [0, 0.4, 0.25]
            }}
            transition={{
              duration: 1.4,
              delay: 0.3,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            style={{
              background: "linear-gradient(90deg, transparent, hsl(0 0% 30%), transparent)",
            }}
          />
          
          <motion.div
            className="absolute left-1/2 top-2/3 h-[1px] -translate-x-1/2"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: ["0%", "40%", "50%"],
              opacity: [0, 0.4, 0.25]
            }}
            transition={{
              duration: 1.4,
              delay: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            style={{
              background: "linear-gradient(90deg, transparent, hsl(0 0% 30%), transparent)",
            }}
          />
          
          {/* Vertical alignment lines */}
          <motion.div
            className="absolute left-1/3 top-1/2 w-[1px] -translate-y-1/2"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: ["0%", "30%", "40%"],
              opacity: [0, 0.3, 0.2]
            }}
            transition={{
              duration: 1.2,
              delay: 0.6,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            style={{
              background: "linear-gradient(180deg, transparent, hsl(0 0% 25%), transparent)",
            }}
          />
          
          <motion.div
            className="absolute left-2/3 top-1/2 w-[1px] -translate-y-1/2"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: ["0%", "30%", "40%"],
              opacity: [0, 0.3, 0.2]
            }}
            transition={{
              duration: 1.2,
              delay: 0.7,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            style={{
              background: "linear-gradient(180deg, transparent, hsl(0 0% 25%), transparent)",
            }}
          />
        </>
      )}
      
      {/* Center point marker */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={isActive ? {
          width: [0, 6, 4],
          height: [0, 6, 4],
          opacity: [0, 1, 0.8],
        } : {
          width: 0,
          height: 0,
          opacity: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        style={{
          background: "hsl(43 65% 52%)",
          boxShadow: "0 0 20px hsl(43 65% 52% / 0.6)",
        }}
      />
    </>
  );
};
