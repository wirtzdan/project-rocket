import { authConfig } from "./auth-config";
import { cookieBannerConfig } from "./cookie-banner-config";
import { generalConfig } from "./general-config";
import { outsetaConfig } from "./outseta-config";
import { seoConfig } from "./seo-config";
import { socialConfig } from "./social-config";
import { themeConfig } from "./theme-config";

export const projectConfig = {
  general: generalConfig,
  theme: themeConfig,
  cookieBannerOptions: cookieBannerConfig,
  seo: seoConfig,
  links: socialConfig,
  outsetaOptions: outsetaConfig,
  auth: authConfig,
  outsetaExtraOptions: {
    showChatOn: "**",
  },
};
