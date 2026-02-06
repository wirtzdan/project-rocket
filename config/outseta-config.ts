import { generalConfig } from "./general-config";

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
  translationLang: generalConfig.language,
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
  },
  nocode: {
    /**
     * Optional: Whether to remove the access token from the querystring after login.
     * See: https://go.outseta.com/support/kb/articles/aWxXddWV/javascript-configuration-guide#clearQuerystring
     */
    clearQuerystring: true,
  },
};
