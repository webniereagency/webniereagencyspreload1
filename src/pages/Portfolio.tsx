import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Coastal Plumbing Co.",
    category: "Local Service Business",
    description: "Complete website rebuild for a family-owned plumbing company serving the coastal region. The old site was slow, outdated, and not mobile-friendly. We transformed it into a modern, lead-generating machine.",
    challenge: "The existing website was built in 2012 and hadn't been updated since. It wasn't mobile-responsive, loaded slowly, and ranked poorly in local search results.",
    solution: "We rebuilt the entire site with a mobile-first approach, implemented local SEO best practices, and added a prominent call-to-action for emergency services.",
    results: [
      "340% increase in lead generation",
      "PageSpeed score improved from 23 to 94",
      "First page ranking for 12 local keywords",
      "50% reduction in bounce rate",
    ],
    beforeImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    tags: ["Website Rebuild", "SEO", "Lead Generation"],
    github: "https://github.com/webniereagency/coastal-plumbing-demo",
    deliverables: ["5-page website", "Contact forms", "Service area pages", "Emergency CTA", "Google Analytics"],
  },
  {
    id: 2,
    title: "Green Valley Dental",
    category: "Healthcare",
    description: "Modern, HIPAA-compliant website with online booking integration and patient portal. The practice needed a professional online presence that would attract new patients while serving existing ones.",
    challenge: "The dental practice had no online booking system, forcing staff to handle all appointments by phone. They also needed a secure way for patients to access forms and records.",
    solution: "We built a custom website with integrated online scheduling, a patient portal, and optimized landing pages for each dental service they offer.",
    results: [
      "200% increase in online bookings",
      "70% reduction in phone inquiries",
      "First page ranking for 'dentist near me'",
      "45 new patients in first month",
    ],
    beforeImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    tags: ["New Build", "Booking System", "Healthcare"],
    github: "https://github.com/webniereagency/greenvalley-dental-demo",
    deliverables: ["10-page website", "Online booking", "Patient portal", "Service pages", "Blog"],
  },
  {
    id: 3,
    title: "Urban Fitness Studio",
    category: "Fitness & Wellness",
    description: "Dynamic website with class scheduling, membership management, and payment processing. The studio needed a complete digital transformation to compete with larger gym chains.",
    challenge: "The fitness studio was using paper sign-up sheets and manual payment collection. They needed a modern system to manage classes, memberships, and payments online.",
    solution: "We developed a fully integrated website with real-time class scheduling, membership tiers, and seamless payment processing through Stripe.",
    results: [
      "150% increase in class bookings",
      "85% of payments now online",
      "30% reduction in admin time",
      "New membership tier generating $5k/month",
    ],
    beforeImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    tags: ["Custom Build", "E-commerce", "Scheduling"],
    github: "https://github.com/webniereagency/urban-fitness-demo",
    deliverables: ["Custom web app", "Class scheduling", "Membership system", "Payment integration", "Mobile app"],
  },
];

const BeforeAfterSlider = ({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden cursor-ew-resize">
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(100%) brightness(0.8)" }}
        />
        <div className="absolute inset-0 bg-background/20" />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-primary-foreground -mr-1" />
          <ChevronRight className="w-4 h-4 text-primary-foreground -ml-1" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 text-xs font-medium">
        Before
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-xs font-medium text-primary-foreground">
        After
      </div>

      {/* Invisible slider input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  );
};

const Portfolio = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio | WebniereAgency - Our Work & Case Studies</title>
        <meta name="description" content="Explore our portfolio of successful website projects for local businesses. See real results and case studies from WebniereAgency." />
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
                Portfolio
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                Our Work Speaks
                <br />
                <span className="text-gradient">For Itself</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Real projects. Real results. Explore case studies from local businesses 
                we've helped transform their online presence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="space-y-24">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  {/* Project Number */}
                  <div className="absolute -left-4 top-0 text-8xl font-serif font-bold text-primary/10 hidden lg:block">
                    0{project.id}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Content */}
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 block">
                        {project.category}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                        {project.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="space-y-6 mb-8">
                        <div>
                          <h4 className="font-semibold mb-2">The Challenge</h4>
                          <p className="text-sm text-muted-foreground">{project.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Our Solution</h4>
                          <p className="text-sm text-muted-foreground">{project.solution}</p>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="p-6 rounded-xl bg-card border border-border mb-6">
                        <h4 className="font-semibold mb-4">Results</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {project.results.map((result, i) => (
                            <div key={i} className="text-sm text-muted-foreground">
                              <span className="text-primary font-medium">✓</span> {result}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tags & Links */}
                      <div className="flex flex-wrap items-center gap-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm hover:bg-secondary/80 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Before/After Slider */}
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <BeforeAfterSlider
                        beforeImage={project.beforeImage}
                        afterImage={project.afterImage}
                      />
                      
                      {/* Deliverables */}
                      <div className="mt-6 p-4 rounded-xl bg-card border border-border">
                        <h4 className="text-sm font-semibold mb-3">Deliverables</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.deliverables.map((item) => (
                            <span
                              key={item}
                              className="px-2 py-1 rounded-md bg-primary/10 text-xs text-primary"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
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
                Ready to Be Our Next Success Story?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join the growing list of local businesses we've helped transform. 
                Start your project today.
              </p>
              <Button variant="gold" size="lg" asChild>
                <a href="/order">Start Your Project</a>
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Portfolio;
