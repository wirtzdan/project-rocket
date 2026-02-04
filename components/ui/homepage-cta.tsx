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
          Get started <PiArrowRight />
        </Link>
      </Button>

      <Link href="https://github.com/wirtzdan/project-rocket">
        <Button onClick={handleGithubClick} size="xl" variant="ghost">
          Github <PiArrowSquareOut />
        </Button>
      </Link>
    </Stack>
  );
};
