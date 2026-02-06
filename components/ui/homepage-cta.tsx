"use client";

import { Button, Stack } from "@chakra-ui/react";
import posthog from "posthog-js";
import { PiArrowRight, PiArrowSquareOut } from "react-icons/pi";
import { Link } from "@/components/ui/link";

export const HomepageCTA = () => {
  const handleCtaClick = () => {
    posthog.capture("cta_clicked", {
      cta_text: "Get started",
      cta_destination: "/docs",
      source: "homepage_hero",
    });
  };

  const handleGithubClick = () => {
    posthog.capture("github_link_clicked", {
      source: "homepage_hero",
    });
  };

  return (
    <Stack align="center" direction={{ base: "column", md: "row" }} gap="3">
      <Button asChild onClick={handleCtaClick} size="xl">
        <Link href="/docs">
          Get started <PiArrowRight aria-hidden="true" />
        </Link>
      </Button>

      <Button asChild onClick={handleGithubClick} size="xl" variant="ghost">
        <Link href="https://github.com/wirtzdan/project-rocket">
          Github <PiArrowSquareOut aria-hidden="true" />
        </Link>
      </Button>
    </Stack>
  );
};
