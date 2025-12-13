import { motion } from "framer-motion";

interface WorkLayerProps {
  isActive: boolean;
}

export const WorkLayer = ({ isActive }: WorkLayerProps) => {
  if (!isActive) return null;

  const wireframes = [
    { x: "8%", y: "15%", w: 120, h: 80 },
    { x: "75%", y: "20%", w: 100, h: 60 },
    { x: "5%", y: "70%", w: 140, h: 90 },
    { x: "80%", y: "65%", w: 110, h: 70 },
  ];

  const codeLines = [
    { x: "15%", y: "30%", w: 180, delay: 0 },
    { x: "70%", y: "40%", w: 150, delay: 0.2 },
    { x: "10%", y: "55%", w: 200, delay: 0.4 },
    { x: "65%", y: "75%", w: 160, delay: 0.6 },
    { x: "20%", y: "85%", w: 140, delay: 0.8 },
  ];

  return (
    <div className="work-layer">
      {/* Wireframe elements */}
      {wireframes.map((wf, i) => (
        <motion.div
          key={`wf-${i}`}
          className="wireframe-element"
          style={{
            left: wf.x,
            top: wf.y,
            width: wf.w,
            height: wf.h,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}

      {/* Code lines */}
      {codeLines.map((line, i) => (
        <motion.div
          key={`code-${i}`}
          className="code-line"
          style={{
            left: line.x,
            top: line.y,
            width: 0,
          }}
          animate={{
            width: [0, line.w, line.w],
            opacity: [0, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            delay: line.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}

      {/* Deployment pulses */}
      {[1, 2, 3].map((pulse) => (
        <motion.div
          key={`pulse-${pulse}`}
          className="deployment-pulse"
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{
            width: [0, 300 + pulse * 100],
            height: [0, 300 + pulse * 100],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 2.5,
            delay: 0.8 + pulse * 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}
    </div>
  );
};
