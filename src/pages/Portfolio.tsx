import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { ExternalLink, Github, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

// Portfolio images
import aceAfter from "@/assets/portfolio/ace-after.png";
import mrelectricBefore from "@/assets/portfolio/mrelectric-before.png";
import mrelectricAfter from "@/assets/portfolio/mrelectric-after.png";
import solinaBefore from "@/assets/portfolio/solina-before.png";
import solinaAfter from "@/assets/portfolio/solina-after.png";
import blackpotionBefore from "@/assets/portfolio/blackpotion-before.png";
import blackpotionAfter from "@/assets/portfolio/blackpotion-after.png";

const projects = [
  {
    id: 1,
    title: "ACE Cooling, Heating, Plumbing and Electrical",
    location: "Phoenix, AZ",
    category: "Local Service Business",
    description: "This business did not have a dedicated website before working with us. We designed and launched a complete, professional website from scratch, structured around clarity, trust, and fast customer conversion.",
    challenge: "A growing multi-service home company operating without a central website, relying on fragmented contact points and offline trust.",
    solution: "We designed and launched a complete, professional website from scratch, structured around clarity, trust, and fast customer conversion.",
    results: [
      "Strong digital presence established",
      "All services unified under one brand",
      "Immediate credibility elevation",
      "Improved customer trust signals",
    ],
    beforeImage: null, // No website previously
    afterImage: aceAfter,
    tags: ["New Build", "Multi-Service", "Lead Generation"],
    website: "https://acehomeaz.com/",
    github: "https://github.com/webniereagency/acehomeaz",
    deliverables: ["Complete website", "Service pages", "Contact integration", "Mobile responsive", "SEO optimization"],
  },
  {
    id: 2,
    title: "Mr. Electric of Dallas",
    location: "Dallas, TX",
    category: "Local Electrician",
    description: "They were relying primarily on Facebook and social media presence until 2024. We translated their real-world trust into a structured, high-performance website designed for local service discovery.",
    challenge: "Strong local reputation, but no professional website to support credibility or capture search traffic.",
    solution: "We translated their real-world trust into a structured, high-performance website designed for local service discovery.",
    results: [
      "Modern digital presence established",
      "Growth beyond social platforms",
      "Improved customer acquisition",
      "Local search visibility gained",
    ],
    beforeImage: mrelectricBefore,
    afterImage: mrelectricAfter,
    tags: ["Website Build", "Local SEO", "Electrician"],
    website: "https://www.mrelectricdallas.com/",
    github: "https://github.com/webniereagency/mrelectricdallas",
    deliverables: ["Professional website", "Service pages", "Contact forms", "Local SEO", "Mobile optimization"],
  },
  {
    id: 3,
    title: "Solina Coffee",
    location: "Addis Ababa, Ethiopia",
    category: "Coffee Shop",
    description: "They had no website and no Google Business presence, limiting visibility despite strong in-store quality. We built a professional website and fully registered and managed their Google Business profile.",
    challenge: "A quality local café invisible online and missing from local search results.",
    solution: "We built a professional website and fully registered and managed their Google Business profile.",
    results: [
      "Over 395+ Google reviews",
      "4.8⭐ rating achieved",
      "Strong local discovery",
      "6-month transformation",
    ],
    beforeImage: solinaBefore,
    afterImage: solinaAfter,
    tags: ["New Build", "Google Business", "Local Discovery"],
    website: "https://solinacoffee.lovable.app/",
    github: "https://github.com/webniereagency/solinacoffee",
    deliverables: ["Custom website", "Google Business setup", "Review management", "Local SEO", "Bilingual content"],
  },
  {
    id: 4,
    title: "Black Potion Sedona",
    location: "Sedona, AZ",
    category: "Café & Crystal Shop",
    description: "They previously had a single-page, unclear website that did not explain the crystal shop concept. We rebuilt the site into a multi-page experience with structure, education, and brand depth.",
    challenge: "A unique hybrid café and crystal shop with no clear digital storytelling.",
    solution: "We rebuilt the site into a multi-page experience with structure, education, and brand depth.",
    results: [
      "Clear concept communication",
      "Improved visitor understanding",
      "Enhanced brand storytelling",
      "Multi-page experience created",
    ],
    beforeImage: blackpotionBefore,
    afterImage: blackpotionAfter,
    tags: ["Website Rebuild", "Brand Storytelling", "Multi-page"],
    website: "https://www.blackpotionsedona.com/",
    github: "https://github.com/webniereagency/blackpotionsedona",
    deliverables: ["Multi-page website", "Crystal shop section", "Menu integration", "Brand storytelling", "Gallery"],
  },
];

const BeforeAfterSlider = ({ beforeImage, afterImage }: { beforeImage: string | null; afterImage: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  // If no before image, just show the after image with a "No Previous Website" overlay
  if (!beforeImage) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Before side with "No Website" message */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 bg-background flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Globe className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-semibold text-muted-foreground">No Website Previously</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Started from scratch</p>
            </div>
          </div>
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
  }

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
        />
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
                      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                        {project.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4">{project.location}</p>
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
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                          View Website
                          <ExternalLink className="w-3 h-3" />
                        </a>
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
