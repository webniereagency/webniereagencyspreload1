import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ChaosFragment {
  id: number;
  type: "text" | "line" | "grid" | "dot";
  x: number;
  y: number;
  rotation: number;
  scale: number;
  content?: string;
  width?: number;
  height?: number;
  depth: number;
}

const fragmentTexts = [
  "LOADING...",
  "ERROR 404",
  "UNDEFINED",
  "NULL",
  "BROKEN",
  "LEGACY",
  "OUTDATED",
  "CHAOS",
  "REBUILD",
  "TRANSFORM",
];

const generateFragments = (): ChaosFragment[] => {
  const fragments: ChaosFragment[] = [];
  
  // Text fragments
  for (let i = 0; i < 8; i++) {
    fragments.push({
      id: i,
      type: "text",
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: (Math.random() - 0.5) * 30,
      scale: 0.5 + Math.random() * 0.5,
      content: fragmentTexts[Math.floor(Math.random() * fragmentTexts.length)],
      depth: Math.random(),
    });
  }
  
  // Line fragments
  for (let i = 8; i < 20; i++) {
    fragments.push({
      id: i,
      type: "line",
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: (Math.random() - 0.5) * 45,
      scale: 1,
      width: 50 + Math.random() * 150,
      depth: Math.random(),
    });
  }
  
  // Grid fragments
  for (let i = 20; i < 26; i++) {
    fragments.push({
      id: i,
      type: "grid",
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: (Math.random() - 0.5) * 20,
      scale: 1,
      width: 80 + Math.random() * 120,
      height: 60 + Math.random() * 100,
      depth: Math.random(),
    });
  }
  
  // Dot fragments
  for (let i = 26; i < 35; i++) {
    fragments.push({
      id: i,
      type: "dot",
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: 0,
      scale: 0.5 + Math.random() * 1.5,
      depth: Math.random(),
    });
  }
  
  return fragments;
};

interface ChaosLayerProps {
  phase: number;
  onPhaseComplete?: () => void;
}

export const ChaosLayer = ({ phase }: ChaosLayerProps) => {
  const [fragments] = useState<ChaosFragment[]>(generateFragments);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMouseOffset({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  const getPhaseOpacity = (fragmentDepth: number) => {
    if (phase === 1) return 0.3 + fragmentDepth * 0.4;
    if (phase === 2) return 0.5 + fragmentDepth * 0.5;
    if (phase >= 3) return Math.max(0, 1 - (phase - 2) * 0.4);
    return 0;
  };
  
  const getPhaseTransform = (fragment: ChaosFragment) => {
    const parallaxX = mouseOffset.x * fragment.depth * 2;
    const parallaxY = mouseOffset.y * fragment.depth * 2;
    
    if (phase === 1) {
      return {
        x: fragment.x + parallaxX,
        y: fragment.y + parallaxY,
        rotate: fragment.rotation,
        scale: fragment.scale,
      };
    }
    
    if (phase === 2) {
      // Overload - more chaos
      const jitterX = (Math.random() - 0.5) * 5;
      const jitterY = (Math.random() - 0.5) * 5;
      return {
        x: fragment.x + parallaxX + jitterX,
        y: fragment.y + parallaxY + jitterY,
        rotate: fragment.rotation + (Math.random() - 0.5) * 10,
        scale: fragment.scale * (0.9 + Math.random() * 0.2),
      };
    }
    
    if (phase >= 3) {
      // Aligning toward center
      const centerX = 50;
      const centerY = 50;
      const alignFactor = Math.min(1, (phase - 2) * 0.5);
      return {
        x: fragment.x + (centerX - fragment.x) * alignFactor,
        y: fragment.y + (centerY - fragment.y) * alignFactor,
        rotate: fragment.rotation * (1 - alignFactor),
        scale: fragment.scale,
      };
    }
    
    return { x: fragment.x, y: fragment.y, rotate: fragment.rotation, scale: fragment.scale };
  };
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Noise layer */}
      <motion.div 
        className="noise-layer"
        animate={{ 
          opacity: phase <= 2 ? 0.15 : Math.max(0, 0.15 - (phase - 2) * 0.05) 
        }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Fragments */}
      {fragments.map((fragment) => {
        const transform = getPhaseTransform(fragment);
        const opacity = getPhaseOpacity(fragment.depth);
        
        return (
          <motion.div
            key={fragment.id}
            className="chaos-fragment"
            initial={{ opacity: 0 }}
            animate={{
              opacity,
              x: `${transform.x}vw`,
              y: `${transform.y}vh`,
              rotate: transform.rotate,
              scale: transform.scale,
            }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: fragment.depth * 0.3,
            }}
            style={{
              left: 0,
              top: 0,
              zIndex: Math.floor(fragment.depth * 10),
            }}
          >
            {fragment.type === "text" && (
              <span className="fragment-text">{fragment.content}</span>
            )}
            {fragment.type === "line" && (
              <div 
                className="fragment-line" 
                style={{ width: fragment.width }}
              />
            )}
            {fragment.type === "grid" && (
              <div 
                className="fragment-grid"
                style={{ 
                  width: fragment.width, 
                  height: fragment.height 
                }}
              />
            )}
            {fragment.type === "dot" && (
              <div 
                className="w-1 h-1 rounded-full bg-muted-foreground/30"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
