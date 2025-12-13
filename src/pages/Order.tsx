import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight, ArrowLeft, Upload, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { sendProjectEmail } from "@/lib/emailjs";

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
    price: "$997 - $1,997",
    description: "Transform your existing site in 72 hours",
  },
  {
    id: "newbuild",
    name: "New Website Build",
    price: "$1,497 - $2,997",
    description: "Complete new website from scratch",
  },
  {
    id: "seo",
    name: "Local SEO Management",
    price: "$497 - $997/mo",
    description: "Ongoing local search optimization",
  },
  {
    id: "custom",
    name: "Premium Custom Build",
    price: "$4,997 - $14,997",
    description: "Full custom development",
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
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleSubmit = async () => {
    if (!formData.termsAccepted || !formData.privacyAccepted) {
      toast({
        title: "Please accept the terms",
        description: "You must accept the Terms of Service and Privacy Policy to continue.",
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
        description: "There was an error sending your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePayment = () => {
    // Placeholder for 2Checkout integration
    window.open("https://secure.2checkout.com/checkout/buy", "_blank");
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Order Summary | WebniereAgency</title>
        </Helmet>
        <Layout>
          <section className="section-padding pt-32">
            <div className="container-custom max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Order Summary
                </h1>
                <p className="text-muted-foreground">
                  Review your order details below and proceed to payment.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border mb-8"
              >
                <h2 className="text-xl font-semibold mb-6">Order Details</h2>
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-xl bg-primary/10 border border-primary/20 mb-8 flex items-start gap-4"
              >
                <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">What happens next?</h4>
                  <p className="text-sm text-muted-foreground">
                    After payment, you'll receive a confirmation email with access to your 
                    client dashboard. Our team will begin working on your project within 24 hours.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  variant="goldOutline"
                  size="lg"
                  onClick={() => setIsSubmitted(false)}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Form
                </Button>
                <Button
                  variant="gold"
                  size="lg"
                  onClick={handlePayment}
                  className="flex-1"
                >
                  Proceed to Payment
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
                  <div className="p-4 rounded-xl border border-dashed border-border">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Upload className="w-5 h-5" />
                      <span className="text-sm">Drag & drop brand assets (logo, images) or click to upload</span>
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
                      placeholder="e.g., Home, About, Services, Contact, Gallery..."
                      value={formData.requiredPages}
                      onChange={(e) => updateFormData("requiredPages", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="competitorExamples">Competitor Examples</Label>
                    <Textarea
                      id="competitorExamples"
                      placeholder="Share links to websites you like or competitors in your industry..."
                      value={formData.competitorExamples}
                      onChange={(e) => updateFormData("competitorExamples", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectGoal">Project Goal</Label>
                    <Textarea
                      id="projectGoal"
                      placeholder="What do you want your new website to achieve? More leads? Better branding? Online sales?"
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
                        onClick={() => updateFormData("selectedPackage", pkg.id)}
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
                        <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
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
      </Layout>
    </>
  );
};

export default Order;
