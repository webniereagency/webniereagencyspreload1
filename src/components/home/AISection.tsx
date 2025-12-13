import { motion } from "framer-motion";
import { Brain, Zap, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Design",
    description: "Our AI tools analyze your industry and competitors to create designs that convert.",
  },
  {
    icon: Zap,
    title: "Accelerated Development",
    description: "What used to take weeks now takes days. AI handles repetitive tasks while our team focuses on strategy.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Automated testing and optimization ensure your site performs flawlessly across all devices.",
  },
  {
    icon: TrendingUp,
    title: "SEO Optimization",
    description: "Built-in SEO best practices powered by AI analysis of top-ranking local businesses.",
  },
];

export const AISection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              AI-Accelerated
              <br />
              <span className="text-gradient">Workflows</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We combine cutting-edge AI technology with human creativity and expertise. 
              This hybrid approach allows us to deliver stunning websites at unprecedented 
              speed without sacrificing quality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-primary/30"
              />

              {/* Middle ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-dashed border-primary/40"
              />

              {/* Inner ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 rounded-full border border-dashed border-primary/50"
              />

              {/* Center element */}
              <div className="absolute inset-24 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-2xl"
                style={{ boxShadow: "0 0 80px hsl(43 65% 52% / 0.4)" }}
              >
                <Brain className="w-16 h-16 text-primary-foreground" />
              </div>

              {/* Floating elements */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute w-3 h-3 rounded-full bg-primary"
                  style={{
                    top: `${25 + i * 15}%`,
                    left: i % 2 === 0 ? "10%" : "85%",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
