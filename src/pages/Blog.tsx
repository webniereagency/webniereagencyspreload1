import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  { id: 1, title: "Why Your Local Business Needs a Modern Website in 2024", excerpt: "In today's digital-first world, your website is often the first impression customers have of your business...", date: "Dec 10, 2024", category: "Business Tips", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
  { id: 2, title: "The 72-Hour Website: How AI is Revolutionizing Web Development", excerpt: "Traditional web development can take weeks or even months. Here's how we deliver professional websites in just 72 hours...", date: "Dec 5, 2024", category: "Technology", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80" },
  { id: 3, title: "Local SEO: The Complete Guide for Small Businesses", excerpt: "Want to rank higher in local search results? This comprehensive guide covers everything you need to know...", date: "Nov 28, 2024", category: "SEO", image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80" },
];

const Blog = () => (
  <>
    <Helmet><title>Blog | WebniereAgency</title></Helmet>
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">Blog</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Insights & <span className="text-gradient">Resources</span></h1>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group rounded-2xl bg-card border border-border overflow-hidden">
                <div className="aspect-video overflow-hidden"><img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3"><Calendar className="w-4 h-4" />{post.date}<span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{post.category}</span></div>
                  <h2 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                  <Link to="#" className="inline-flex items-center gap-2 text-primary text-sm font-medium">Read More <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  </>
);

export default Blog;
