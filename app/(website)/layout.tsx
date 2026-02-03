import { Box } from "@chakra-ui/react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar type="website" />
      <Box as="main">{children}</Box>
      <Footer />
    </>
  );
}
