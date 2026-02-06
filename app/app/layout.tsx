import { Box } from "@chakra-ui/react";
import { AuthGate } from "@/components/auth/auth-gate";
import { Navbar } from "@/components/layout/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        className="skip-to-content"
        href="#main-content"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
        }}
      >
        Skip to content
      </a>
      <Navbar type="app" />
      <Box as="main" id="main-content">
        <AuthGate>{children}</AuthGate>
      </Box>
    </>
  );
}
