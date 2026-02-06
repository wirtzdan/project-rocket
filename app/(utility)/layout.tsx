import { Box } from "@chakra-ui/react";
import { BackButton } from "@/components/ui/back-button";

export default function UtilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackButton />
      <Box as="main">{children}</Box>
    </>
  );
}
