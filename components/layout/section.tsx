import { Box, type BoxProps, Container } from "@chakra-ui/react";
import type React from "react";

export interface SectionProps extends BoxProps {
  children?: React.ReactNode;
  header?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Section = ({ header, size = "md", ...props }: SectionProps) => {
  const { ...rootProps } = props;
  const paddingY = {
    sm: {
      base: "6",
      md: "8",
    },
    md: {
      base: "12",
      md: "16",
    },
    lg: {
      base: "16",
      md: "24",
    },
  };
  if (header) {
    const topPadding = (size: "sm" | "md" | "lg") => {
      const conversion = {
        sm: {
          base: "112px",
          md: "120px",
        },
        md: {
          base: "136px",
          md: "152px",
        },
        lg: {
          base: "152px",
          md: "184px",
        },
      } as const;

      return conversion[size];
    };

    return (
      <Box as="header" w="full" {...rootProps}>
        <Container maxW={{ base: "full", md: "3xl" }}>
          <Box
            pb={{ base: paddingY[size].base, md: paddingY[size].md }}
            pt={{ base: topPadding(size).base, md: topPadding(size).md }}
          >
            {props.children}
          </Box>
        </Container>
      </Box>
    );
  }
  return (
    <Box as="section" w="full" {...rootProps}>
      <Container maxW={{ base: "full", md: "3xl" }}>
        <Box py={{ base: paddingY[size].base, md: paddingY[size].md }}>
          {props.children}
        </Box>
      </Container>
    </Box>
  );
};
