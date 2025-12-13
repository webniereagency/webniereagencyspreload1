import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-background to-background" />
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, hsl(43 65% 52% / 0.15) 0%, transparent 50%)",
        }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Ready to Transform Your
            <br />
            <span className="text-gradient">Online Presence?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join hundreds of local businesses who have upgraded their websites with 
            WebniereAgency. Start your project today and launch in 72 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order">
              <Button variant="hero" size="xl" className="group">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="heroOutline" size="xl">
                Schedule a Call
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-border/50"
          >
            <div className="text-center">
              <span className="block text-2xl font-bold text-primary">72h</span>
              <span className="text-sm text-muted-foreground">Delivery</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-primary">100%</span>
              <span className="text-sm text-muted-foreground">Satisfaction</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-primary">24/7</span>
              <span className="text-sm text-muted-foreground">Support</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-primary">0</span>
              <span className="text-sm text-muted-foreground">Downtime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
