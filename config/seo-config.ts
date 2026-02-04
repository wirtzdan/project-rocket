import { generalConfig } from "./general-config";

const languageToLocale: Record<string, string> = {
  en: "en_US",
};

export const seoConfig = {
  titleTemplate: `%s | ${generalConfig.name}`,
  defaultTitle: `${generalConfig.name} - ${generalConfig.title}`,
  defaultDescription: generalConfig.description,
  ogImage: "/og-image.jpg",
  robotsDisallowPaths: ["/app/*", "/api/*"],
  twitterHandle: "",
  locale:
    languageToLocale[generalConfig.language] ??
    `${generalConfig.language}_${generalConfig.language.toUpperCase()}`,
};
