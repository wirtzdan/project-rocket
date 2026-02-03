import Markdown from "react-markdown";
import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Privacy Policy",
  description:
    "Understand how we collect, use, and protect your personal information",
});

export default function PrivacyPolicy() {
  return (
    <Section>
      <Prose mx="auto" size="lg" mt="">
        <Markdown>
          {`
# Privacy Policy

**Effective Date:** [Insert Date]

At [Your Company Name], we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website and use our services. By accessing or using our services, you agree to the terms of this Privacy Policy.

## 1. Information We Collect

We may collect the following types of information:

### 1.1 Personal Information
When you register for our services, we may collect personal information that can identify you, such as:
-  Name
-  Email address
-  Phone number
-  Billing address
-  Payment information

### 1.2 Non-Personal Information
We may also collect non-personal information that does not identify you, including:
-  Browser type
-  Device information
-  IP address
-  Pages visited
-  Time spent on pages

## 2. How We Use Your Information

We may use the information we collect for various purposes, including to:
-  Provide, maintain, and improve our services
-  Process your transactions and manage your account
-  Communicate with you about your account or transactions
-  Send you marketing communications and promotional materials
-  Analyze usage and trends to enhance user experience
-  Comply with legal obligations and enforce our terms

## 3. Disclosure of Your Information

We may share your information in the following circumstances:
-  **With Service Providers:** We may share your information with third-party vendors who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.
-  **For Legal Reasons:** We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
-  **Business Transfers:** If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.

## 4. Data Security

We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security.

## 5. Your Rights

Depending on your location, you may have the following rights regarding your information:
-  The right to access, correct, or delete your personal information
-  The right to object to or restrict the processing of your personal information
-  The right to data portability
-  The right to withdraw consent at any time where we rely on your consent to process your information

To exercise these rights, please contact us using the contact information provided below.

## 6. Third-Party Websites

Our services may contain links to third-party websites. We do not control and are not responsible for the content or privacy practices of these websites. We encourage you to review the privacy policies of any third-party sites you visit.

## 7. Children’s Privacy

Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.

## 8. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website with a new effective date. Your continued use of our services after any changes constitutes your acceptance of the updated Privacy Policy.

## 9. Contact Us

If you have any questions about this Privacy Policy or our privacy practices, please contact us at:

[Your Company Name]  
[Your Address]  
[Your Email Address]  
[Your Phone Number]  

---

**Last Updated:** [Insert Date]
          `}
        </Markdown>
      </Prose>
    </Section>
  );
}
