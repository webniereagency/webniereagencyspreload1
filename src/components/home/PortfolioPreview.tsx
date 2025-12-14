import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

import aceAfter from "@/assets/portfolio/ace-after.png";
import mrelectricAfter from "@/assets/portfolio/mrelectric-after.png";
import solinaAfter from "@/assets/portfolio/solina-after.png";

const projects = [
  {
    id: 1,
    title: "ACE Cooling, Heating, Plumbing & Electrical",
    category: "Local Service Business",
    description: "Complete website built from scratch for a multi-service home company in Phoenix, AZ.",
    image: aceAfter,
    tags: ["New Build", "Multi-Service", "Lead Generation"],
  },
  {
    id: 2,
    title: "Mr. Electric of Dallas",
    category: "Local Electrician",
    description: "Professional website replacing a social-media-only presence for local search visibility.",
    image: mrelectricAfter,
    tags: ["Website Build", "Local SEO", "Electrician"],
  },
  {
    id: 3,
    title: "Solina Coffee",
    category: "Coffee Shop",
    description: "Website and Google Business profile with 395+ reviews and 4.8⭐ rating in 6 months.",
    image: solinaAfter,
    tags: ["New Build", "Google Business", "Local Discovery"],
  },
];

export const PortfolioPreview = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Our Work
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">
              Recent Projects
            </h2>
          </div>
          <Link to="/portfolio" className="mt-6 md:mt-0">
            <Button variant="ghost" className="group">
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link to="/portfolio" className="block">
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <ExternalLink className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
