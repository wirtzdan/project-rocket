import type { Metadata } from "next";
import { projectConfig } from "@/config";

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: GenerateMetadataProps): Metadata {
  const fullTitle = title
    ? `${title} | ${projectConfig.general.name}`
    : projectConfig.seo.defaultTitle;

  const fullDescription = description || projectConfig.seo.defaultDescription;
  const url = `${projectConfig.general.siteUrl}${path}`;

  const twitterHandle = projectConfig.seo.twitterHandle;

  return {
    title: fullTitle,
    description: fullDescription,
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    metadataBase: new URL(projectConfig.general.siteUrl),
    alternates: {
      canonical: url,
    },
    icons: {
      icon: [
        { url: "/static/favicon.ico", sizes: "32x32", type: "image/x-icon" },
        { url: "/static/icon.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/static/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: projectConfig.general.name,
      locale: projectConfig.seo.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      ...(twitterHandle ? { creator: twitterHandle } : {}),
    },
  };
}
