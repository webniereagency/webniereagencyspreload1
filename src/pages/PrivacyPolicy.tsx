import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => (
  <>
    <Helmet><title>Privacy Policy | WebniereAgency</title></Helmet>
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-serif font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 13, 2024</p>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <h2 className="text-xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
            <p>We collect information you provide directly, including: name, email address, phone number, business information, website credentials (securely stored), and payment information processed through our secure payment provider.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
            <p>We use collected information to: provide and improve our services, communicate with you about your project, process payments, send marketing communications (with your consent), and comply with legal obligations.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">3. Data Security</h2>
            <p>We implement industry-standard security measures including encryption, secure data storage, and regular security audits. Website credentials are encrypted and only accessed when necessary for project completion.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">4. Third-Party Services</h2>
            <p>We may share data with trusted third-party services including payment processors (2Checkout/Verifone), hosting providers, and analytics tools. These partners are bound by confidentiality agreements.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">5. Your Rights</h2>
            <p>You have the right to: access your personal data, request corrections, request deletion, opt-out of marketing, and data portability. Contact us at support@webniereagency.biz for requests.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">6. Contact Us</h2>
            <p>For privacy-related inquiries: support@webniereagency.biz</p>
          </div>
        </div>
      </section>
    </Layout>
  </>
);

export default PrivacyPolicy;
