import Markdown from "react-markdown";
import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Cookie Policy",
  description:
    "Learn about how we use cookies and similar technologies to improve your experience",
});

export default function CookiePolicy() {
  return (
    <Section>
      <Prose mx="auto" size="lg" mt="28">
        <Markdown>
          {`
# Cookie Policy

**Effective Date:** [Insert Date]

At [Your Company Name], we use cookies and similar tracking technologies to enhance your experience on our website and services. This Cookie Policy explains what cookies are, how we use them, how third-parties we may partner with may use cookies on the service, your choices regarding cookies, and further information about cookies.

## 1. What Are Cookies?

Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make it more secure, provide better user experience, and understand how the website performs and to analyze what works and where it needs improvement.

## 2. How [Your Company Name] Uses Cookies

When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:

-  **Essential Cookies:** We use cookies to remember information that changes the way the Service behaves or looks, such as a user's language preference on the Service.
-  **Account-Related Cookies:** We use cookies to manage the signup process and general administration. These cookies will usually be deleted when you log out; however, in some cases, they may remain afterward to remember your site preferences when logged out.
-  **Analytics Cookies:** We use cookies to help us analyze how our visitors use the Service and to monitor website performance. This helps us provide a high-quality experience by customizing our offering and quickly identifying and fixing any issues that arise.
-  **Advertising Cookies:** We may use cookies to serve you with advertisements that are relevant to you and your interests. 

## 3. Third-Party Cookies

In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service and deliver advertisements on and through the Service. These third-party cookies are governed by the respective privacy policies of these third parties.

## 4. Your Choices Regarding Cookies

If you prefer to avoid the use of cookies on the website, you must first disable the use of cookies in your browser and then delete the cookies saved in your browser associated with this website. You may use this option for preventing the use of cookies at any time.

-  **Browser Settings:** Most web browsers allow you to control cookies through their settings preferences. To find out more about cookies, including how to see what cookies have been set, visit [www.allaboutcookies.org](http://www.allaboutcookies.org/) or [www.youronlinechoices.eu](http://www.youronlinechoices.eu/).

-  **Opting Out:** You can opt out of targeted advertising by visiting the following links:
  - [Network Advertising Initiative](http://www.networkadvertising.org/)
  - [Digital Advertising Alliance](http://www.aboutads.info/)
  - [Your Online Choices](http://www.youronlinechoices.eu/)

## 5. Changes to This Cookie Policy

We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page. You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.

## 6. Contact Us

If you have any questions about this Cookie Policy, please contact us at:

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
