import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface ChaosFragment {
  id: number;
  type: "text" | "line" | "grid" | "block" | "dot" | "code";
  x: number;
  y: number;
  rotation: number;
  scale: number;
  content?: string;
  width?: number;
  height?: number;
  depth: number; // 0 = far background, 1 = close foreground
  driftX: number;
  driftY: number;
}

const fragmentTexts = [
  "ERROR",
  "404",
  "UNDEFINED",
  "NULL",
  "LEGACY",
  "OUTDATED",
  "BROKEN",
  "FAILED",
  "TIMEOUT",
  "CORRUPT",
];

const codeSnippets = [
  "function() {",
  "return null;",
  "} catch (e)",
  "undefined",
  "// TODO: fix",
  "console.error",
  "throw new",
  "deprecated",
];

const generateFragments = (): ChaosFragment[] => {
  const fragments: ChaosFragment[] = [];
  
  // Background text fragments (far depth)
  for (let i = 0; i < 6; i++) {
    fragments.push({
      id: i,
      type: "text",
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      rotation: (Math.random() - 0.5) * 45,
      scale: 0.6 + Math.random() * 0.4,
      content: fragmentTexts[Math.floor(Math.random() * fragmentTexts.length)],
      depth: 0.1 + Math.random() * 0.3,
      driftX: (Math.random() - 0.5) * 30,
      driftY: (Math.random() - 0.5) * 20,
    });
  }
  
  // Mid-layer code snippets
  for (let i = 6; i < 12; i++) {
    fragments.push({
      id: i,
      type: "code",
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      rotation: (Math.random() - 0.5) * 15,
      scale: 0.8 + Math.random() * 0.3,
      content: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      depth: 0.3 + Math.random() * 0.3,
      driftX: (Math.random() - 0.5) * 20,
      driftY: (Math.random() - 0.5) * 15,
    });
  }
  
  // Misaligned line fragments
  for (let i = 12; i < 24; i++) {
    fragments.push({
      id: i,
      type: "line",
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: (Math.random() - 0.5) * 60,
      scale: 1,
      width: 40 + Math.random() * 180,
      depth: 0.2 + Math.random() * 0.6,
      driftX: (Math.random() - 0.5) * 25,
      driftY: (Math.random() - 0.5) * 25,
    });
  }
  
  // Broken grid fragments
  for (let i = 24; i < 32; i++) {
    fragments.push({
      id: i,
      type: "grid",
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: (Math.random() - 0.5) * 25,
      scale: 0.8 + Math.random() * 0.4,
      width: 60 + Math.random() * 140,
      height: 40 + Math.random() * 100,
      depth: 0.15 + Math.random() * 0.5,
      driftX: (Math.random() - 0.5) * 15,
      driftY: (Math.random() - 0.5) * 15,
    });
  }
  
  // Solid block fragments (foreground)
  for (let i = 32; i < 38; i++) {
    fragments.push({
      id: i,
      type: "block",
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: (Math.random() - 0.5) * 20,
      scale: 1,
      width: 20 + Math.random() * 60,
      height: 10 + Math.random() * 30,
      depth: 0.6 + Math.random() * 0.4,
      driftX: (Math.random() - 0.5) * 40,
      driftY: (Math.random() - 0.5) * 30,
    });
  }
  
  // Scattered dots
  for (let i = 38; i < 50; i++) {
    fragments.push({
      id: i,
      type: "dot",
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: 0,
      scale: 0.5 + Math.random() * 2,
      depth: Math.random(),
      driftX: (Math.random() - 0.5) * 50,
      driftY: (Math.random() - 0.5) * 50,
    });
  }
  
  return fragments;
};

interface ChaosLayerProps {
  phase: string;
  intensity: number;
}

export const ChaosLayer = ({ phase, intensity }: ChaosLayerProps) => {
  const fragments = useMemo(() => generateFragments(), []);
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  
  // Slow camera drift during chaos
  useEffect(() => {
    if (phase === "disorientation" || phase === "overload") {
      const interval = setInterval(() => {
        setTime(t => t + 0.02);
        setCameraOffset({
          x: Math.sin(time * 0.5) * 8,
          y: Math.cos(time * 0.3) * 5,
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      // Stabilize camera
      setCameraOffset({ x: 0, y: 0 });
    }
  }, [phase, time]);
  
  const getFragmentStyle = (fragment: ChaosFragment) => {
    const parallaxMultiplier = fragment.depth * 2;
    
    // Base position with camera drift
    let x = fragment.x + cameraOffset.x * parallaxMultiplier;
    let y = fragment.y + cameraOffset.y * parallaxMultiplier;
    let rotation = fragment.rotation;
    let opacity = 0;
    
    if (phase === "disorientation") {
      // Slow emergence
      x += fragment.driftX * 0.3;
      y += fragment.driftY * 0.3;
      opacity = 0.15 + fragment.depth * 0.35;
    } else if (phase === "overload") {
      // Intensified chaos with jitter
      const jitter = intensity * 2;
      x += fragment.driftX * 0.6 + (Math.random() - 0.5) * jitter;
      y += fragment.driftY * 0.6 + (Math.random() - 0.5) * jitter;
      rotation += (Math.random() - 0.5) * 8;
      opacity = 0.3 + fragment.depth * 0.5;
    } else if (phase === "stillness") {
      // Frozen chaos
      x += fragment.driftX * 0.5;
      y += fragment.driftY * 0.5;
      opacity = 0.4 + fragment.depth * 0.4;
    } else if (phase === "intervention" || phase === "structure") {
      // Aligning toward order
      const alignProgress = phase === "structure" ? 0.7 : 0.3;
      const centerX = 50;
      const centerY = 50;
      x = fragment.x + (centerX - fragment.x) * alignProgress;
      y = fragment.y + (centerY - fragment.y) * alignProgress;
      rotation = fragment.rotation * (1 - alignProgress);
      opacity = Math.max(0.1, (1 - alignProgress) * 0.5);
    }
    
    return { x, y, rotation, opacity };
  };
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep noise layer - background */}
      <motion.div 
        className="noise-layer"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase === "overload" ? 0.2 : 
                   phase === "disorientation" ? 0.12 : 
                   phase === "stillness" ? 0.15 : 0.05 
        }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
      
      {/* Camera container for parallax */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: cameraOffset.x,
          y: cameraOffset.y,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Fragments */}
        {fragments.map((fragment, index) => {
          const style = getFragmentStyle(fragment);
          
          return (
            <motion.div
              key={fragment.id}
              className="absolute"
              initial={{ 
                opacity: 0,
                x: `${fragment.x}vw`,
                y: `${fragment.y}vh`,
                rotate: fragment.rotation,
                scale: fragment.scale * 0.5,
              }}
              animate={{
                opacity: style.opacity,
                x: `${style.x}vw`,
                y: `${style.y}vh`,
                rotate: style.rotation,
                scale: fragment.scale,
              }}
              transition={{
                duration: 2.2 + fragment.depth * 0.8,
                ease: [0.4, 0.0, 0.2, 1], // power3.out equivalent
                delay: index * 0.04,
              }}
              style={{
                zIndex: Math.floor(fragment.depth * 10),
              }}
            >
              {fragment.type === "text" && (
                <span 
                  className="font-mono text-[10px] md:text-xs tracking-[0.25em] whitespace-nowrap"
                  style={{ color: `hsl(0 0% ${15 + fragment.depth * 20}%)` }}
                >
                  {fragment.content}
                </span>
              )}
              
              {fragment.type === "code" && (
                <span 
                  className="font-mono text-[9px] md:text-[11px] tracking-wide whitespace-nowrap"
                  style={{ color: `hsl(0 0% ${10 + fragment.depth * 15}%)` }}
                >
                  {fragment.content}
                </span>
              )}
              
              {fragment.type === "line" && (
                <div 
                  className="h-[1px]"
                  style={{ 
                    width: fragment.width,
                    background: `linear-gradient(90deg, transparent, hsl(0 0% ${12 + fragment.depth * 18}%), transparent)`,
                  }}
                />
              )}
              
              {fragment.type === "grid" && (
                <div 
                  className="border opacity-40"
                  style={{ 
                    width: fragment.width, 
                    height: fragment.height,
                    borderColor: `hsl(0 0% ${10 + fragment.depth * 12}%)`,
                  }}
                />
              )}
              
              {fragment.type === "block" && (
                <div 
                  style={{ 
                    width: fragment.width, 
                    height: fragment.height,
                    background: `hsl(0 0% ${6 + fragment.depth * 8}%)`,
                  }}
                />
              )}
              
              {fragment.type === "dot" && (
                <div 
                  className="rounded-full"
                  style={{ 
                    width: 2 + fragment.scale * 2,
                    height: 2 + fragment.scale * 2,
                    background: `hsl(0 0% ${15 + fragment.depth * 20}%)`,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Foreground noise layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase === "overload" ? 0.08 : 0.03
        }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
