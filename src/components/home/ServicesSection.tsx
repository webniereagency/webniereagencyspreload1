import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RefreshCw, Globe, MapPin, Code2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: RefreshCw,
    title: "Rapid Website Rebuild",
    description: "Transform your outdated website into a modern, fast-loading masterpiece. We preserve your brand while upgrading everything else.",
    features: ["72-hour turnaround", "Mobile-first design", "SEO optimization"],
    price: "Starting at $300",
    priceNote: "Most projects under $500",
  },
  {
    icon: Globe,
    title: "New Website Build",
    description: "Don't have a website yet? We'll create a stunning online presence that converts visitors into customers.",
    features: ["Custom design", "Content strategy", "Domain & hosting setup"],
    price: "Starting at $250",
    priceNote: "Flexible based on features",
  },
  {
    icon: MapPin,
    title: "Local SEO Management",
    description: "Dominate local search results. We optimize your Google Business profile and build citations that drive foot traffic.",
    features: ["Google Business setup", "Local citations", "Review management"],
    price: "Only $50/mo",
    priceNote: "Cancel anytime",
  },
  {
    icon: Code2,
    title: "Premium Custom Build",
    description: "For businesses that need something unique. Full custom development with advanced features and integrations.",
    features: ["Custom functionality", "API integrations", "Ongoing support"],
    price: "Custom Quote",
    priceNote: "Let's discuss your vision",
  },
];

export const ServicesSection = () => {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Background accent */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-50"
        style={{
          background: "radial-gradient(ellipse at 100% 0%, hsl(43 65% 52% / 0.05) 0%, transparent 50%)",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Everything Your Business Needs
            <br />
            <span className="text-muted-foreground">To Thrive Online</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From rapid rebuilds to complete custom solutions, we deliver professional 
            web experiences tailored to local businesses.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: "inset 0 0 60px hsl(43 65% 52% / 0.05)" }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <span className="text-lg font-semibold text-primary">{service.price}</span>
                    {service.priceNote && (
                      <span className="block text-xs text-muted-foreground mt-0.5">{service.priceNote}</span>
                    )}
                  </div>
                  <Link to="/order">
                    <Button variant="ghost" size="sm" className="group/btn">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/services">
            <Button variant="goldOutline" size="lg">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
