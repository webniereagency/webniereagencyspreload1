import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Target, Lightbulb, Users, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Amir Haddad",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "10+ years of experience crafting digital experiences for brands worldwide.",
  },
  {
    name: "Sara Mekonnen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "Full-stack developer specializing in performance optimization and modern frameworks.",
  },
  {
    name: "David Kim",
    role: "SEO & Local Listings Specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Helping local businesses dominate search results and drive foot traffic.",
  },
];

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "Every decision we make is focused on driving real business outcomes for our clients.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We leverage cutting-edge AI and automation to deliver faster, better results.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "We treat every project as a partnership, working closely with you every step of the way.",
  },
  {
    icon: Award,
    title: "Quality Obsessed",
    description: "We don't cut corners. Every website we deliver meets our exacting standards.",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | WebniereAgency - AI-Powered Web Development</title>
        <meta name="description" content="Learn about WebniereAgency's mission to transform local business websites using AI-accelerated workflows and a team of dedicated specialists." />
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
                About Us
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                Building the Future of
                <br />
                <span className="text-gradient">Local Business Websites</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                WebniereAgency was founded with a simple mission: make professional, 
                high-converting websites accessible to every local business, 
                regardless of budget or technical expertise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We noticed a problem: local businesses were being left behind in the digital age. 
                    Traditional web agencies were too expensive, too slow, and often delivered 
                    cookie-cutter solutions that didn't drive results.
                  </p>
                  <p>
                    So we built something better. By combining AI-powered workflows with human 
                    creativity and expertise, we've created a system that delivers stunning, 
                    conversion-optimized websites in just 72 hours.
                  </p>
                  <p>
                    Today, we've helped over 100 local businesses transform their online presence. 
                    From plumbers to dentists, fitness studios to restaurants — we've seen firsthand 
                    how the right website can transform a business.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 p-6 rounded-xl bg-card border border-border shadow-xl">
                  <span className="text-4xl font-bold text-primary">100+</span>
                  <p className="text-sm text-muted-foreground">Projects Delivered</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">
                Transform local businesses into
                <br />
                <span className="text-gradient">digital powerhouses</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every local business deserves a website that works as hard as they do. 
                We're on a mission to democratize access to professional web development, 
                using AI-accelerated workflows to deliver enterprise-quality results 
                at a fraction of the traditional cost and timeline.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
                Our Team
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                Meet the Specialists
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A dedicated team of designers, developers, and marketing experts 
                working together to deliver exceptional results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold to-gold-light opacity-20 blur-xl" />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-full h-full rounded-full object-cover border-4 border-primary/20"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
                Our Values
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold">
                What Drives Us
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
                  Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold">
                  The WebniereAgency Difference
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "72-hour delivery on most projects",
                  "AI-accelerated workflows for faster results",
                  "Dedicated project manager for every client",
                  "Conversion-focused design principles",
                  "Local SEO optimization included",
                  "30-day post-launch support",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mt-12"
              >
                <Link to="/order">
                  <Button variant="gold" size="lg" className="group">
                    Start Your Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
