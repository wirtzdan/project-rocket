import {
  Box,
  Container,
  Skeleton,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";

export function PageSkeleton() {
  return (
    <Box as="section" w="full">
      <Container maxW={{ base: "full", md: "3xl" }}>
        <Box pb={{ base: "12", md: "16" }} pt={{ base: "136px", md: "152px" }}>
          <VStack align="start" gap="4" w="full">
            <Skeleton height="36px" width="240px" />
            <SkeletonText noOfLines={2} width="full" />
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
