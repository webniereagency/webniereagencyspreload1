import emailjs from '@emailjs/browser';

// EmailJS Configuration - Replace these with your actual values
export const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
export const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
export const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export interface ProjectFormData {
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
  packageName: string;
  packagePrice: string;
}

export const sendProjectEmail = async (formData: ProjectFormData): Promise<boolean> => {
  try {
    const templateParams = {
      // Business Info
      business_name: formData.businessName,
      business_category: formData.businessCategory,
      contact_email: formData.contactEmail,
      contact_phone: formData.contactPhone || 'Not provided',
      
      // Current Website
      current_website: formData.currentWebsiteUrl || 'No existing website',
      domain_registrar: formData.domainRegistrar || 'Not provided',
      hosting_provider: formData.hostingProvider || 'Not provided',
      will_provide_access: formData.willProvideAccess ? 'Yes' : 'No',
      
      // Project Details
      required_pages: formData.requiredPages || 'Not specified',
      competitor_examples: formData.competitorExamples || 'Not provided',
      project_goal: formData.projectGoal || 'Not specified',
      launch_date: formData.launchDate || 'No deadline specified',
      
      // Package
      selected_package: formData.packageName,
      package_price: formData.packagePrice,
      
      // Meta
      submission_date: new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }),
      to_email: 'fromtoptotop12@gmail.com',
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};
