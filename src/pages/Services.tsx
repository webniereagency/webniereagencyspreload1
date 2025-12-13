import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { RefreshCw, Globe, MapPin, Code2, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: RefreshCw,
    title: "Rapid Website Rebuild",
    description: "Transform your outdated website into a modern, fast-loading masterpiece in just 72 hours. We preserve your brand identity while upgrading everything else — design, performance, SEO, and user experience.",
    deliverables: [
      "Complete website redesign",
      "Mobile-responsive layout",
      "Speed optimization (90+ PageSpeed score)",
      "Basic SEO setup",
      "Contact form integration",
      "Analytics installation",
      "30-day post-launch support",
    ],
    price: "Starting at $300",
    priceNote: "Most projects completed for $300-$500",
    turnaround: "72 hours",
    popular: true,
  },
  {
    icon: Globe,
    title: "New Website Build",
    description: "Don't have a website yet? We'll create a stunning online presence from scratch that converts visitors into customers. Perfect for new businesses or those ready to go digital.",
    deliverables: [
      "Custom website design",
      "Up to 5 pages",
      "Mobile-first development",
      "Content strategy consultation",
      "Domain & hosting setup assistance",
      "SSL certificate",
      "60-day post-launch support",
    ],
    price: "Starting at $250",
    priceNote: "Price varies by features & complexity",
    turnaround: "5-7 days",
    popular: false,
  },
  {
    icon: MapPin,
    title: "Local SEO Management",
    description: "Dominate local search results and drive more foot traffic to your business. We optimize your Google Business profile, build citations, and manage your online reputation.",
    deliverables: [
      "Google Business Profile optimization",
      "Local citation building (50+ directories)",
      "Review management strategy",
      "Monthly performance reports",
      "Competitor analysis",
      "Local keyword optimization",
      "Ongoing support & adjustments",
    ],
    price: "Only $50/month",
    priceNote: "No contracts • Cancel anytime",
    turnaround: "Ongoing",
    popular: false,
  },
  {
    icon: Code2,
    title: "Premium Custom Build",
    description: "For businesses that need something unique. Full custom development with advanced features, integrations, and ongoing support. Enterprise-grade solutions tailored to your needs.",
    deliverables: [
      "Unlimited custom pages",
      "Advanced functionality",
      "Third-party API integrations",
      "E-commerce capabilities",
      "Custom CMS setup",
      "Performance optimization",
      "Priority support",
      "Dedicated project manager",
    ],
    price: "Let's Talk",
    priceNote: "Custom quote based on your vision",
    turnaround: "2-4 weeks",
    popular: false,
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | WebniereAgency - Website Development & Local SEO</title>
        <meta name="description" content="Professional web development services for local businesses. From 72-hour website rebuilds to custom development and local SEO management." />
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="section-padding pt-32 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, hsl(43 65% 52% / 0.15) 0%, transparent 50%)",
            }}
          />
          
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
                Our Services
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                Everything You Need to
                <br />
                <span className="text-gradient">Succeed Online</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From rapid website rebuilds to comprehensive local SEO, we offer 
                tailored solutions that drive real results for your business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="space-y-12">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative p-8 md:p-12 rounded-3xl border ${
                    service.popular 
                      ? "bg-gradient-to-br from-primary/10 via-card to-card border-primary/30" 
                      : "bg-card border-border"
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column */}
                    <div>
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <service.icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                            {service.title}
                          </h2>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm">
                            <span className="text-primary font-semibold">{service.price}</span>
                            {service.priceNote && (
                              <span className="text-xs text-muted-foreground/80">{service.priceNote}</span>
                            )}
                            <span className="text-muted-foreground">• {service.turnaround}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <Link to="/order">
                        <Button variant={service.popular ? "gold" : "goldOutline"} size="lg" className="group">
                          Get Started
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>

                    {/* Right Column - Deliverables */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">What's Included:</h3>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Not Sure Which Service is Right for You?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Schedule a free consultation and we'll help you choose the perfect 
                solution for your business goals and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+251962025394">
                  <Button variant="gold" size="lg">
                    Call Now: +251 962 025 394
                  </Button>
                </a>
                <Link to="/order">
                  <Button variant="goldOutline" size="lg">
                    Start Questionnaire
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Services;
