import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => (
  <>
    <Helmet><title>Terms of Service | WebniereAgency</title></Helmet>
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-serif font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 13, 2024</p>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <h2 className="text-xl font-semibold text-foreground mt-8">1. Services</h2>
            <p>WebniereAgency provides website design, development, and local SEO services for businesses. Our services include website rebuilds, new website builds, local SEO management, and custom development solutions.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">2. Project Timeline</h2>
            <p>Estimated delivery times are provided in good faith. The 72-hour delivery applies to standard website rebuilds and requires timely provision of all necessary materials and access credentials by the client.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">3. Payment Terms</h2>
            <p>Payment is required upfront before project commencement. We accept major credit cards and process payments securely through 2Checkout (Verifone). Prices are in USD unless otherwise specified.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">4. Client Responsibilities</h2>
            <p>Clients must provide: accurate business information, necessary access credentials, brand assets and content, timely feedback on deliverables, and approval for final launch.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">5. Intellectual Property</h2>
            <p>Upon full payment, clients receive full ownership of their completed website. We retain the right to showcase completed work in our portfolio unless otherwise agreed.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">6. Revisions</h2>
            <p>Standard packages include up to 2 rounds of revisions. Additional revisions may incur extra charges. Major scope changes require a new quote.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">7. Limitation of Liability</h2>
            <p>WebniereAgency's liability is limited to the amount paid for services. We are not liable for indirect, consequential, or incidental damages.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">8. Contact</h2>
            <p>For questions about these terms: support@webniereagency.biz</p>
          </div>
        </div>
      </section>
    </Layout>
  </>
);

export default TermsOfService;
