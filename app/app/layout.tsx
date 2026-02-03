"use client";

import { Box } from "@chakra-ui/react";
import { Navbar } from "@/components/layout/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar type="app" />
      <Box as="main">{children}</Box>
    </>
  );
}
