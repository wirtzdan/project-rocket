import { Center, type CenterProps } from "@chakra-ui/react";
import { LuImage } from "react-icons/lu";

export const ImagePlaceholder = (props: CenterProps) => (
  <Center w="full" h="full" bg="bg.muted" color="fg.subtle" {...props}>
    <LuImage size="48px" />
  </Center>
);
