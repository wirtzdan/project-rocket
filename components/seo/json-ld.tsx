import { projectConfig } from "@/config";

export function OrganizationJsonLd() {
  const { general, links } = projectConfig;

  const sameAs = [links.twitter, links.github, links.linkedin].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: general.name,
    url: general.siteUrl,
    logo: `${general.siteUrl}static/logo.svg`,
    description: general.description,
    email: general.support.email,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
}
