import { generalConfig } from "./general-config";

export const outsetaConfig = {
  domain: "project-rocket.outseta.com",
  knowledgeBaseUrl: "https://project-rocket.outseta.com/support/kb",
  load: "auth,customForm,emailList,leadCapture,nocode,profile,support,chat",
  monitorDom: true,
  tokenStorage: "local",
  translationLang: generalConfig.language,
  auth: {
    postRegistrationUrl:
      process.env.NODE_ENV === "production"
        ? "https://project-rocket.danielwirtz.com/thank-you"
        : "http://localhost:3000/thank-you",

    authenticationCallbackUrl:
      process.env.NODE_ENV === "production"
        ? "https://project-rocket.danielwirtz.com/app"
        : "http://localhost:3000/app",
    rememberLastEmail: true,
  },
  nocode: {
    hideBody: false,
    hideProtectedLinks: false,
    removeProtectedElements: false,
  },
};
