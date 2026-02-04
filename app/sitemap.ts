import { projectConfig } from "@/config";

export default function sitemap() {
  const baseUrl = projectConfig.general.siteUrl;

  // Add your public routes here
  const routes = [
    "",
    "/about",
    "/contact",
    "/legal/privacy-policy",
    "/legal/terms-and-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return routes;
}
