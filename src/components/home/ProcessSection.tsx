import { motion } from "framer-motion";
import { ClipboardList, Wrench, Rocket } from "lucide-react";
import { useNarrativeScroll } from "@/hooks/useNarrativeScroll";
import { getProcessState, TIMING } from "@/animations/home-narrative";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Intake",
    description: "Complete our quick questionnaire about your business, goals, and brand. Upload any assets and provide website access credentials.",
    duration: "15 minutes",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Build",
    description: "Our professional workflow begins. Our specialist team designs, develops, and optimizes your new website using cutting-edge tools.",
    duration: "48-72 hours",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Deliver",
    description: "Review your new website in our client dashboard. Request revisions if needed. Once approved, we go live and transfer everything to you.",
    duration: "Same day approval",
  },
];

export const ProcessSection = () => {
  const { scrollProgress, isReducedMotion } = useNarrativeScroll();
  
  // Get narrative state - steps connect, context preserved
  const processState = scrollProgress.chapter === 'process'
    ? getProcessState(scrollProgress.chapterProgress)
    : { connectionLineProgress: 0, stepOpacity: () => 1, contextOpacity: () => 1 };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: TIMING.EASE_SETTLE }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Three Simple Steps to
            <br />
            <span className="text-gradient">Your New Website</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've streamlined the entire process so you can focus on running your business 
            while we handle the technical work.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - draws as user scrolls through section */}
          <motion.div 
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 origin-left"
            style={{
              background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.3), transparent)",
            }}
            animate={{ 
              scaleX: isReducedMotion ? 1 : Math.min(processState.connectionLineProgress, 1),
              opacity: isReducedMotion ? 1 : 0.5 + processState.connectionLineProgress * 0.5,
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  ease: TIMING.EASE_SETTLE,
                }}
                className="relative"
              >
                {/* Context fade - previous steps become context, never disappear */}
                <motion.div
                  animate={{ 
                    opacity: isReducedMotion ? 1 : processState.contextOpacity(index),
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  {/* Step number */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-24 h-24 mx-auto mb-8"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold to-gold-light opacity-20 blur-xl" />
                    <div className="relative w-full h-full rounded-2xl bg-card border border-primary/30 flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {step.number}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-serif font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {step.duration}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
