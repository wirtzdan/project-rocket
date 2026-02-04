import { Center, type CenterProps } from "@chakra-ui/react";
import { LuImage } from "react-icons/lu";

export const ImagePlaceholder = (props: CenterProps) => (
  <Center bg="bg.muted" color="fg.subtle" h="full" w="full" {...props}>
    <LuImage size="48px" />
  </Center>
);
