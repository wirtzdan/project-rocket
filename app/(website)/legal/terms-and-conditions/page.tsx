import Markdown from "react-markdown";
import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Terms and Conditions",
  description:
    "Read our terms of service and legal agreements for using our platform",
});

export default function TermsAndConditions() {
  return (
    <Section>
      <Prose mt="28" mx="auto" size="lg">
        <Markdown>
          {`
# Terms and Conditions

**Effective Date:** [Insert Date]

Welcome to [Your Company Name]! These Terms and Conditions govern your use of our website, products, and services. By accessing or using our services, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our services.

## 1. Definitions

-  **"Service"** refers to the services provided by [Your Company Name], including but not limited to [list services, e.g., SaaS, membership access, online courses, digital products].
-  **"User"** refers to any individual or entity that accesses or uses our services.
-  **"Content"** refers to any text, images, videos, or other materials provided by [Your Company Name] through the Service.

## 2. Acceptance of Terms

By using our Service, you confirm that you are at least 18 years old or have parental consent to use our services. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.

## 3. Account Registration

To access certain features of our Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.

## 4. Payment Terms

-  **Subscription Fees:** If you purchase a subscription, you agree to pay all fees associated with your subscription. All payments are non-refundable unless otherwise stated.
-  **Billing:** You authorize us to charge your designated payment method for the subscription fees and any applicable taxes.

## 5. License to Use Service

Subject to your compliance with these Terms, [Your Company Name] grants you a limited, non-exclusive, non-transferable license to access and use the Service for your personal or internal business purposes.

## 6. User Conduct

You agree not to:
-  Use the Service for any unlawful purpose.
-  Impersonate any person or entity.
-  Transmit any harmful or malicious code.
-  Disrupt or interfere with the security, integrity, or performance of the Service.

## 7. Intellectual Property

All Content provided through the Service is the property of [Your Company Name] or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.

## 8. Termination

We may terminate or suspend your access to the Service at any time, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will immediately cease.

## 9. Disclaimer of Warranties

The Service is provided on an "as is" and "as available" basis. [Your Company Name] makes no warranties, express or implied, regarding the Service, including but not limited to its availability, reliability, or fitness for a particular purpose.

## 10. Limitation of Liability

To the fullest extent permitted by law, [Your Company Name] shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.

## 11. Indemnification

You agree to indemnify and hold harmless [Your Company Name], its affiliates, and their respective officers, directors, employees, and agents from any claims, losses, liabilities, damages, costs, or expenses arising out of your use of the Service or your violation of these Terms.

## 12. Changes to Terms

We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website. Your continued use of the Service after any changes constitutes your acceptance of the new Terms.

## 13. Governing Law

These Terms shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law principles.

## 14. Contact Information

If you have any questions about these Terms, please contact us at:

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
