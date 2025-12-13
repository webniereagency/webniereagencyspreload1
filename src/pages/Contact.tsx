import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | WebniereAgency</title>
        <meta name="description" content="Get in touch with WebniereAgency. We're here to help with your website project." />
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
                Contact Us
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                Let's Talk About
                <br />
                <span className="text-gradient">Your Project</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have questions? Ready to start? We'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
                  Get in Touch
                </h2>
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Us</h3>
                      <a href="mailto:support@webniereagency.com" className="text-muted-foreground hover:text-primary transition-colors block">
                        support@webniereagency.com
                      </a>
                      <a href="mailto:billing@webniereagency.com" className="text-muted-foreground hover:text-primary transition-colors block">
                        billing@webniereagency.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Call Us</h3>
                      <a href="tel:+1-555-123-4567" className="text-muted-foreground hover:text-primary transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">Remote-First Agency</p>
                      <p className="text-muted-foreground">Serving clients worldwide</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 9am - 6pm EST</p>
                      <p className="text-muted-foreground">Weekend: By appointment</p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="aspect-video rounded-xl bg-card border border-border flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Interactive map coming soon</p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="p-8 rounded-2xl bg-card border border-border">
                  <h2 className="text-2xl font-serif font-bold mb-6">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={6}
                        required
                      />
                    </div>
                    <Button variant="gold" size="lg" type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
