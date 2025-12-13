import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Owner, Coastal Plumbing Co.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "WebniereAgency transformed our outdated website in just 3 days. The new site brings in 5x more leads than before. Worth every penny!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Director, Green Valley Dental",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    content: "Professional, fast, and the results speak for themselves. Our online booking increased by 200% after the new website launched.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amanda Rodriguez",
    role: "Founder, Urban Fitness Studio",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "I was skeptical about the 72-hour promise, but they delivered exactly as promised. The website is beautiful and our members love the new booking system.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Background accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl"
        style={{
          background: "radial-gradient(ellipse at center, hsl(43 65% 52% / 0.05) 0%, transparent 70%)",
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
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what business owners 
            are saying about their experience with WebniereAgency.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 rounded-2xl bg-background border border-border"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Quote className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6 pt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
