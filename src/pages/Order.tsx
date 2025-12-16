import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight, ArrowLeft, AlertCircle, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { sendProjectEmail } from "@/lib/emailjs";
import { CheckoutModal } from "@/components/order/CheckoutModal";

const steps = [
  { id: 1, title: "Business Info" },
  { id: 2, title: "Current Website" },
  { id: 3, title: "Project Details" },
  { id: 4, title: "Package Selection" },
  { id: 5, title: "Review & Submit" },
];

const businessCategories = [
  "Plumbing & HVAC",
  "Dental & Healthcare",
  "Fitness & Wellness",
  "Restaurant & Food Service",
  "Legal Services",
  "Real Estate",
  "Construction & Home Services",
  "Retail & E-commerce",
  "Professional Services",
  "Other",
];

const packages = [
  {
    id: "rebuild",
    name: "Rapid Website Rebuild",
    price: "Starting at $250",
    description: "Most projects completed for $300-$500 • 72 hours",
    features: [
      "72-hour turnaround",
      "Mobile-responsive design",
      "SEO-optimized structure",
      "Performance optimization",
      "30-day support included",
    ],
  },
  {
    id: "newbuild",
    name: "New Website Build",
    price: "Starting at $250",
    description: "Complete new website from scratch",
    features: [
      "Custom futuristic design",
      "Modern animations & interactions",
      "Content strategy guidance",
      "Domain & hosting setup",
      "Contact forms & integrations",
      "60-day support included",
    ],
  },
  {
    id: "seo",
    name: "Local SEO Management",
    price: "Only $50/month",
    description: "No contracts • Cancel anytime • Ongoing",
    features: [
      "Google Business optimization",
      "Local citation building",
      "Review management",
      "Monthly performance reports",
      "Cancel anytime",
    ],
  },
  {
    id: "custom",
    name: "Premium Custom Build",
    price: "Let's Talk",
    description: "Custom quote based on your vision",
    features: [
      "Fully custom functionality",
      "API integrations",
      "E-commerce capabilities",
      "Priority ongoing support",
      "Dedicated project manager",
    ],
  },
];

interface FormData {
  businessName: string;
  businessCategory: string;
  currentWebsiteUrl: string;
  domainRegistrar: string;
  hostingProvider: string;
  willProvideAccess: boolean;
  requiredPages: string;
  competitorExamples: string;
  projectGoal: string;
  launchDate: string;
  contactEmail: string;
  contactPhone: string;
  selectedPackage: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

const Order = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessCategory: "",
    currentWebsiteUrl: "",
    domainRegistrar: "",
    hostingProvider: "",
    willProvideAccess: false,
    requiredPages: "",
    competitorExamples: "",
    projectGoal: "",
    launchDate: "",
    contactEmail: "",
    contactPhone: "",
    selectedPackage: "",
    termsAccepted: false,
    privacyAccepted: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateForm = (): { valid: boolean; message?: string } => {
    // Validate required fields
    if (!formData.businessName.trim()) {
      return { valid: false, message: "Please enter your business name." };
    }
    if (!formData.businessCategory) {
      return { valid: false, message: "Please select your business category." };
    }
    if (!formData.contactEmail.trim()) {
      return { valid: false, message: "Please enter your contact email." };
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      return { valid: false, message: "Please enter a valid email address." };
    }
    if (!formData.selectedPackage) {
      return { valid: false, message: "Please select a package." };
    }
    if (!formData.termsAccepted || !formData.privacyAccepted) {
      return { valid: false, message: "You must accept the Terms of Service and Privacy Policy to continue." };
    }
    return { valid: true };
  };

  const handleSubmit = async () => {
    const validation = validateForm();
    if (!validation.valid) {
      toast({
        title: "Please complete the form",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const selectedPkg = packages.find(p => p.id === formData.selectedPackage);
    
    const success = await sendProjectEmail({
      ...formData,
      packageName: selectedPkg?.name || 'Not selected',
      packagePrice: selectedPkg?.price || 'N/A',
    });

    setIsSubmitting(false);

    if (success) {
      toast({
        title: "Application Submitted!",
        description: "We've received your project details and will contact you soon.",
      });
      setIsSubmitted(true);
    } else {
      toast({
        title: "Submission Failed",
        description: "We couldn't send your request right now. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePackageSelect = (packageId: string) => {
    updateFormData("selectedPackage", packageId);
    setShowCheckout(true);
  };

  const selectedPkg = packages.find(p => p.id === formData.selectedPackage);

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Application Submitted | WebniereAgency</title>
        </Helmet>
        <Layout>
          <section className="section-padding pt-32">
            <div className="container-custom max-w-3xl">
              {/* Success Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="text-center mb-12"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/30"
                >
                  <Check className="w-12 h-12 text-primary-foreground" />
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-5xl font-serif font-bold mb-4"
                >
                  Thank You! 🎉
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-muted-foreground mb-2"
                >
                  Your project application has been submitted successfully!
                </motion.p>
              </motion.div>

              {/* Email Verification Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 mb-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Check Your Email!</h3>
                    <p className="text-muted-foreground mb-3">
                      We've sent a confirmation email to <span className="font-semibold text-primary">{formData.contactEmail}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Please check your inbox (and spam folder) for your project confirmation and next steps.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-8 rounded-2xl bg-card border border-border mb-8"
              >
                <h2 className="text-xl font-semibold mb-6">Your Application Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Business Name</span>
                    <span className="font-medium">{formData.businessName}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{formData.businessCategory}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Selected Package</span>
                    <span className="font-medium text-primary">
                      {packages.find(p => p.id === formData.selectedPackage)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Contact Email</span>
                    <span className="font-medium">{formData.contactEmail}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-muted-foreground">Estimated Price</span>
                    <span className="font-bold text-lg text-primary">
                      {packages.find(p => p.id === formData.selectedPackage)?.price}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* What's Next */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="p-6 rounded-xl bg-secondary/50 border border-border mb-8"
              >
                <h4 className="font-semibold mb-4">What happens next?</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Our team will review your application within 24 hours</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p className="text-sm text-muted-foreground">You'll receive a detailed proposal with timeline and pricing</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <p className="text-sm text-muted-foreground">After approval, we'll begin building your website!</p>
                  </li>
              </ul>
              </motion.div>

              {/* Auth CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-6 rounded-xl bg-card border border-border mb-8"
              >
                <h4 className="font-semibold mb-2">Want to follow your project's progress?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Sign in or create an account to track updates, delivery timeline, and next steps.
                </p>
                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => navigate("/dashboard")}
                  className="w-full sm:w-auto"
                >
                  Sign in / Create account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Prefer social media? That works too 👇
                </p>
              </motion.div>

              {/* Social Media Follow Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="p-6 rounded-xl bg-secondary/50 border border-border mb-8"
              >
                <h4 className="font-semibold mb-2">Stay Connected</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  We share updates, behind-the-scenes work, and project highlights on our social channels. Follow us to stay connected.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/webniere/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary hover:text-primary transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    Instagram
                  </a>
                  <a
                    href="https://web.facebook.com/webniere"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary hover:text-primary transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </a>
                  <a
                    href="https://t.me/Revonyx1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary hover:text-primary transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    Telegram
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  variant="goldOutline"
                  size="lg"
                  onClick={() => window.location.href = '/'}
                  className="flex-1"
                >
                  Back to Home
                </Button>
                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => window.location.href = '/services'}
                  className="flex-1"
                >
                  Explore Our Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </section>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Start Your Project | WebniereAgency</title>
        <meta name="description" content="Start your website project with WebniereAgency. Fill out our questionnaire and get your new website in 72 hours." />
      </Helmet>

      <Layout>
        <section className="section-padding pt-32">
          <div className="container-custom max-w-4xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
                Start Your Project
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Tell Us About Your Business
              </h1>
              <p className="text-muted-foreground">
                Complete this questionnaire to get started. It only takes about 10 minutes.
              </p>
            </motion.div>

            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                        currentStep >= step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`hidden sm:block w-16 md:w-24 h-1 mx-2 rounded-full ${
                          currentStep > step.id ? "bg-primary" : "bg-secondary"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {steps.map((step) => (
                  <span
                    key={step.id}
                    className={`text-xs hidden sm:block ${
                      currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Form Steps */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              {/* Step 1: Business Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">Business Information</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Your Business Name"
                        value={formData.businessName}
                        onChange={(e) => updateFormData("businessName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessCategory">Business Category *</Label>
                      <Select
                        value={formData.businessCategory}
                        onValueChange={(value) => updateFormData("businessCategory", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.contactEmail}
                        onChange={(e) => updateFormData("contactEmail", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.contactPhone}
                        onChange={(e) => updateFormData("contactPhone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Current Website */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">Current Website Details</h2>
                  <div className="space-y-2">
                    <Label htmlFor="currentWebsiteUrl">Current Website URL</Label>
                    <Input
                      id="currentWebsiteUrl"
                      placeholder="https://www.yourbusiness.com"
                      value={formData.currentWebsiteUrl}
                      onChange={(e) => updateFormData("currentWebsiteUrl", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Leave blank if you don't have a website</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="domainRegistrar">Domain Registrar</Label>
                      <Input
                        id="domainRegistrar"
                        placeholder="e.g., GoDaddy, Namecheap"
                        value={formData.domainRegistrar}
                        onChange={(e) => updateFormData("domainRegistrar", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hostingProvider">Hosting Provider</Label>
                      <Input
                        id="hostingProvider"
                        placeholder="e.g., Bluehost, SiteGround"
                        value={formData.hostingProvider}
                        onChange={(e) => updateFormData("hostingProvider", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary">
                    <Checkbox
                      id="willProvideAccess"
                      checked={formData.willProvideAccess}
                      onCheckedChange={(checked) => updateFormData("willProvideAccess", !!checked)}
                    />
                    <Label htmlFor="willProvideAccess" className="cursor-pointer">
                      I will provide access to my domain registrar and hosting account
                    </Label>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        We'll collect your logo, images, and brand assets after submission using your preferred contact method.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Project Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">Project Details</h2>
                  <div className="space-y-2">
                    <Label htmlFor="requiredPages">Required Pages</Label>
                    <Textarea
                      id="requiredPages"
                      placeholder="e.g., Home, About, Services, Contact, Gallery... — or let us include all essential pages your professional website needs."
                      value={formData.requiredPages}
                      onChange={(e) => updateFormData("requiredPages", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="competitorExamples">Competitor Examples</Label>
                    <Textarea
                      id="competitorExamples"
                      placeholder="Share links to websites you like or competitors in your industry... — or leave this to us and we'll research your competitors."
                      value={formData.competitorExamples}
                      onChange={(e) => updateFormData("competitorExamples", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectGoal">Project Goal</Label>
                    <Textarea
                      id="projectGoal"
                      placeholder="What do you want your new website to achieve? More leads? Better branding? Online sales? — or select all outcomes you want us to optimize for."
                      value={formData.projectGoal}
                      onChange={(e) => updateFormData("projectGoal", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="launchDate">Desired Launch Date</Label>
                    <Input
                      id="launchDate"
                      type="date"
                      value={formData.launchDate}
                      onChange={(e) => updateFormData("launchDate", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Package Selection */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">Select Your Package</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => handlePackageSelect(pkg.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.selectedPackage === pkg.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold">{pkg.name}</h3>
                          {formData.selectedPackage === pkg.id && (
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
                        <ul className="space-y-1.5 mb-4">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Check className="w-3 h-3 text-primary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <span className="text-primary font-semibold">{pkg.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Review & Submit */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">Review & Submit</h2>
                  <div className="space-y-4 p-6 rounded-xl bg-secondary">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Business:</span>
                        <span className="ml-2 font-medium">{formData.businessName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <span className="ml-2 font-medium">{formData.businessCategory}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <span className="ml-2 font-medium">{formData.contactEmail}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Package:</span>
                        <span className="ml-2 font-medium text-primary">
                          {packages.find(p => p.id === formData.selectedPackage)?.name || "Not selected"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="termsAccepted"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => updateFormData("termsAccepted", !!checked)}
                      />
                      <Label htmlFor="termsAccepted" className="text-sm cursor-pointer">
                        I accept the <a href="/terms-of-service" className="text-primary hover:underline">Terms of Service</a>
                      </Label>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="privacyAccepted"
                        checked={formData.privacyAccepted}
                        onCheckedChange={(checked) => updateFormData("privacyAccepted", !!checked)}
                      />
                      <Label htmlFor="privacyAccepted" className="text-sm cursor-pointer">
                        I accept the <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                {currentStep < steps.length ? (
                  <Button variant="gold" onClick={nextStep}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button variant="gold" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Order
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          packageName={selectedPkg?.name || ""}
          packagePrice={selectedPkg?.price || ""}
        />
      </Layout>
    </>
  );
};

export default Order;
