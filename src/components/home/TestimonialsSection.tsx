import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const initialTestimonials: Review[] = [
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
  {
    id: 4,
    name: "Daniel Hailu",
    role: "CEO, Addis Tech Solutions",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "Outstanding work! They understood our vision perfectly and delivered a website that truly represents our brand. The team communication was exceptional throughout.",
    rating: 5,
  },
  {
    id: 5,
    name: "Rebecca Johnson",
    role: "Owner, Sunset Café",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    content: "Our new website has completely transformed how customers find us. Online orders have tripled since launch. Highly recommend their services!",
    rating: 5,
  },
  {
    id: 6,
    name: "Marcus Thompson",
    role: "Director, Elite Auto Repair",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "The team went above and beyond. Fast delivery, beautiful design, and excellent follow-up support. Our customers constantly compliment the new site.",
    rating: 5,
  },
  {
    id: 7,
    name: "Helen Bekele",
    role: "Founder, Blossom Florist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    content: "From concept to launch in under a week! The website perfectly captures our brand's elegance. Customer inquiries have increased significantly.",
    rating: 5,
  },
  {
    id: 8,
    name: "James Carter",
    role: "Managing Partner, Carter Law Firm",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    content: "Professional, reliable, and delivered exactly what we needed. Our firm's online presence now matches the quality of our legal services. Exceptional work!",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Review[]>(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", content: "", rating: 5 });
  const [hoveredStar, setHoveredStar] = useState(0);
  const { toast } = useToast();

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in your name and review.",
        variant: "destructive",
      });
      return;
    }

    const review: Review = {
      id: Date.now(),
      name: newReview.name,
      role: "Verified Client",
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(newReview.name)}&background=c9a227&color=fff`,
      content: newReview.content,
      rating: newReview.rating,
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: "", content: "", rating: 5 });
    setShowForm(false);
    toast({
      title: "Thank you!",
      description: "Your review has been submitted successfully.",
    });
  };

  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);

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
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Don't just take our word for it. Here's what business owners 
            are saying about their experience with WebniereAgency.
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{avgRating} average rating</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{totalReviews}+</p>
              <p className="text-sm text-muted-foreground">Happy clients</p>
            </div>
          </div>

          {/* Leave Review Button */}
          <Button
            variant="outline"
            onClick={() => setShowForm(!showForm)}
            className="group"
          >
            <Star className="w-4 h-4 mr-2" />
            Leave a Review
          </Button>
        </motion.div>

        {/* Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-xl mx-auto mb-12 overflow-hidden"
            >
              <form onSubmit={handleSubmitReview} className="p-6 rounded-2xl bg-background border border-border space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <Input
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="John Doe"
                    className="bg-card"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Your Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoveredStar || newReview.rating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Review</label>
                  <Textarea
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    placeholder="Share your experience working with us..."
                    rows={4}
                    className="bg-card resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" variant="gold" className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Review
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative p-6 rounded-2xl bg-background border border-border"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 left-6">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Quote className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-0.5 mb-4 pt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground text-sm leading-relaxed mb-4 line-clamp-4">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
