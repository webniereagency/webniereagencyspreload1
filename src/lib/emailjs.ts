import emailjs from '@emailjs/browser';

// EmailJS Configuration
export const EMAILJS_SERVICE_ID = 'service_4u0e1rk';
export const EMAILJS_TEMPLATE_ID = 'template_5ozj6tb';
export const EMAILJS_AUTOREPLY_TEMPLATE_ID = 'template_cl75402';
export const EMAILJS_PUBLIC_KEY = 'oNqRLB3CPqtXHgdnh';

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

    // Send notification to agency
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    console.log('Agency notification sent:', response);

    // Send auto-reply to customer
    const autoReplyParams = {
      to_email: formData.contactEmail,
      business_name: formData.businessName,
      contact_name: formData.businessName,
      selected_package: formData.packageName,
      package_price: formData.packagePrice,
      launch_date: formData.launchDate || 'To be determined',
      submission_date: new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    const autoReplyResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_AUTOREPLY_TEMPLATE_ID,
      autoReplyParams,
      EMAILJS_PUBLIC_KEY
    );
    console.log('Auto-reply sent to customer:', autoReplyResponse);

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};
