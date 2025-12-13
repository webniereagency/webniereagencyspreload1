import { useState } from "react";
import { PreloadContainer } from "@/components/preload/PreloadContainer";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AISection } from "@/components/home/AISection";
import { CTASection } from "@/components/home/CTASection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      <Helmet>
        <title>WebniereAgency | Modern Websites for Local Businesses in 72 Hours</title>
        <meta name="description" content="Transform your outdated website into a fast, beautiful, AI-optimized site. WebniereAgency delivers professional websites for local businesses in just 72 hours." />
        <meta property="og:title" content="WebniereAgency | Modern Websites for Local Businesses" />
        <meta property="og:description" content="AI-accelerated web development. Get a stunning website delivered in 72 hours." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://webniereagency.com" />
      </Helmet>
      
      {showPreloader && <PreloadContainer onComplete={() => setShowPreloader(false)} />}
      
      <Layout>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <PortfolioPreview />
        <TestimonialsSection />
        <AISection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
