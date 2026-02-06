import { Box } from "@chakra-ui/react";
import { AuthGate } from "@/components/auth/auth-gate";
import { Navbar } from "@/components/layout/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar type="app" />
      <Box as="main">
        <AuthGate>{children}</AuthGate>
      </Box>
    </>
  );
}
