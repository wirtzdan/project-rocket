/**
 * Outseta Configuration
 *
 * Configuration options for Outseta integration.
 * See: https://go.outseta.com/support/kb/articles/aWxXddWV/javascript-configuration-guide
 *
 * Note: 404 errors from widget initialization endpoints (e.g., /widgets/chat/init, /widgets/auth/init)
 * may occur in development/staging environments if widgets are not fully configured in the Outseta dashboard.
 * These errors are handled gracefully and do not break the application.
 */
export const outsetaConfig = {
  /** Required: Your Outseta domain (e.g., 'project-rocket.outseta.com') */
  domain: "project-rocket.outseta.com",
  /**
   * Optional: Comma-separated list of Outseta modules to load.
   * Available modules: auth, profile, support, chat, emailList, leadCapture, nocode
   * See: https://go.outseta.com/support/kb/articles/aWxXddWV/javascript-configuration-guide#load
   */
  load: "auth,profile,support,chat,emailList,leadCapture,nocode",
  /**
   * Optional: Whether to monitor DOM for changes (required for SPAs).
   * Set to true for React/Next.js applications.
   */
  monitorDom: true,
  /**
   * Optional: Where to store the authentication token.
   * Options: 'cookie' (cross-tab, cross-subdomain), 'local' (localStorage), 'session' (sessionStorage)
   * See: https://go.outseta.com/support/kb/articles/aWxXddUV/javascript-configuration-guide#tokenStorage
   */
  tokenStorage: "cookie",
  /**
   * Optional: Language for Outseta widgets.
   * Set to 'auto' to honor Accept-Language header, or specific language code (e.g., 'en')
   */
  translationLang: "en",
  auth: {
    /**
     * Optional: URL to redirect after successful registration.
     * Uses window.location.origin pattern for dev/staging environments.
     * See: https://go.outseta.com/support/kb/articles/xmeyJRmV/localdev-test-and-staging-environment
     */
    postRegistrationUrl:
      process.env.NODE_ENV === "production"
        ? "https://project-rocket.danielwirtz.com/thank-you"
        : "http://localhost:3000/thank-you",
    /**
     * Optional: URL to redirect after successful authentication.
     * Overrides Post-Login URL from Outseta dashboard.
     * See: https://go.outseta.com/support/kb/articles/aWxXddUV/javascript-configuration-guide#authenticationCallbackUrl
     */
    authenticationCallbackUrl:
      process.env.NODE_ENV === "production"
        ? "https://project-rocket.danielwirtz.com/app"
        : "http://localhost:3000/app",
    /**
     * Optional: Whether to remember the last email used for login.
     * Defaults the email field in the login form to the last used email.
     */
    rememberLastEmail: true,
    /**
     * Required: Public JWT certificate for verifying Outseta access tokens.
     * Find this under Sign Up > Advanced in your Outseta dashboard.
     * Used for server-side token verification.
     */
    publicKey: `-----BEGIN CERTIFICATE----- 
MIICzDCCAbSgAwIBAgIQANOnyWX39GOTemR5gtC1pTANBgkqhkiG9w0BAQ0FADAhMR8wHQYDVQQD

DBZlYXN5LXRpbWVyLm91dHNldGEuY29tMCAXDTI0MTIwMjE0NDQzM1oYDzIxMjQxMjAyMTQ0NDMz

WjAhMR8wHQYDVQQDDBZlYXN5LXRpbWVyLm91dHNldGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOC

AQ8AMIIBCgKCAQEAj1dcGuHuf6CzO0oPfbISnTdhBTBQYNPsxdsE6wHZXEbSainl6JFsisJCDoS5

Jfq+yPUYJafn4dN9n50whJ2epk3MA/y7sYfa9qkJi0FSLKDOTyiVy0suWJNl9TOY4bBXhB9XiKAW

XRugbV2ppSE2tG38oz6+gLpJYlUI2zPdZxL+OTbCnveDgF/sB833WjMxp4cYJZMI2nDvQIX/2N4K

7svPsiiyQONpNkKtYG/A4to1/kG4+KWcMEYS6b2Z5gY1qLynHUDdRRJotr7AMYaaev1M1Nn4gkv1

T/ksXMQHaRCIFwdEzVsHiQ4M0U1nEoiWtld1pGnw325XtUYiMgJiiwIDAQABMA0GCSqGSIb3DQEB

DQUAA4IBAQBhZvzrRnNu7u01areF1ZCaAeVhxJgHtl3P3c9XuFL1gEtvYYJOQCs0yltXfj7lfJj+

OD7TgCXNfeZ0NEqoJuPXo6m2r3jxvbkDPf3eZ4kPefaopzgDwAVVTUg2t+3DhZs5VdKoMWOVX735

QQpgi5FW0GQ7JfAOdHseUDhTy3YRWfwWTbipKC8Er8N8txwDwVBk7fG6MHGDQlxA+Nn9OdhjdNYN

dUAFZS2Kde57b5SzBeK4yAbBVGg2dnJPhESEVnARhg49pfTgS7c9RgcYt079i2ssClctf76uBnPG

GEtwkQBpw6TGcCdD5QsNQ09z5Cm2KCm/RQjsXImYK/dhWYEc
-----END CERTIFICATE-----`,
  },
};
