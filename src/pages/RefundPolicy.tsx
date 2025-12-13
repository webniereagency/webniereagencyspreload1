import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

const RefundPolicy = () => (
  <>
    <Helmet><title>Refund Policy | WebniereAgency</title></Helmet>
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-serif font-bold mb-8">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 13, 2024</p>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <h2 className="text-xl font-semibold text-foreground mt-8">1. Satisfaction Guarantee</h2>
            <p>We are committed to your satisfaction. If you're not happy with the initial design concepts, we'll work with you to make it right or provide a refund as outlined below.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">2. Refund Eligibility</h2>
            <p><strong>Full Refund (100%):</strong> Available within 24 hours of payment if no work has begun.<br/><strong>Partial Refund (50%):</strong> Available before design mockups are approved.<br/><strong>No Refund:</strong> Once development begins after design approval.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">3. How to Request a Refund</h2>
            <p>Email billing@webniereagency.com with your order number and reason for the refund request. We respond within 24 business hours.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">4. Refund Processing</h2>
            <p>Approved refunds are processed within 5-10 business days to the original payment method. Processing times may vary by financial institution.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">5. Monthly Services</h2>
            <p>For ongoing services (Local SEO Management), you may cancel at any time. Refunds for partial months are not provided, but service continues until the end of the billing period.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">6. Exceptions</h2>
            <p>Custom development projects with specific deliverables may have different refund terms as outlined in the project agreement.</p>
            <h2 className="text-xl font-semibold text-foreground mt-8">7. Contact</h2>
            <p>For refund inquiries: billing@webniereagency.com</p>
          </div>
        </div>
      </section>
    </Layout>
  </>
);

export default RefundPolicy;
