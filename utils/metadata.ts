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

  return {
    title: fullTitle,
    description: fullDescription,
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    metadataBase: new URL(projectConfig.general.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: projectConfig.general.name,
      locale: projectConfig.seo.locale,
      type: "website",
      images: [
        {
          url: projectConfig.seo.ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      creator: projectConfig.seo.twitterHandle,
      images: [projectConfig.seo.ogImage],
    },
  };
}
