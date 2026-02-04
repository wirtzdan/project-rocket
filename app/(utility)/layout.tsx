"use client";

import { Box, Button } from "@chakra-ui/react";
import { PiArrowLeft } from "react-icons/pi";
import { Link } from "@/components/ui/link";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box
        as="header"
        left="6"
        position="fixed"
        top="6"
        w="full"
        zIndex="docked"
      >
        <Link href="/">
          <Button colorPalette="gray" variant="outline">
            <PiArrowLeft />
            Back home
          </Button>
        </Link>
      </Box>
      <Box as="main">{children}</Box>
    </>
  );
}
