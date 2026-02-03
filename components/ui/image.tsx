import {
  Image as ChakraImage,
  type ImageProps as ChakraImageProps,
  defaultSystem,
} from "@chakra-ui/react";
import NextImage from "next/image";

export type ImageProps = Omit<ChakraImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  sizes?: string;
};

export const Image = ({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  ...props
}: ImageProps) => {
  const getValue = (size: string | number | undefined): number => {
    if (!size) return 100;

    // Handle pixel values directly (e.g. "640px")
    if (typeof size === "string" && size.endsWith("px")) {
      return parseInt(size, 10);
    }

    // Get value from defaultSystem tokens - Updated comparison
    const sizeToken = Array.from(
      defaultSystem.tokens.categoryMap.get("sizes")?.values() ?? [],
    ).find((token) => token.name === `sizes.${size}`);

    if (!sizeToken?.value) return 100;

    const value = sizeToken.value;

    // Handle rem values (e.g. "0.125rem")
    if (typeof value === "string" && value.endsWith("rem")) {
      return parseFloat(value) * 16; // Convert rem to pixels (1rem = 16px)
    }

    // Handle percentage values
    if (typeof value === "string" && value.endsWith("%")) {
      // For images, we'll return a default size for percentage values
      return 100;
    }

    // Handle special values
    if (typeof value === "string") {
      switch (value) {
        case "max-content":
        case "min-content":
        case "fit-content":
        case "100vh":
        case "100vw":
        case "100dvh":
        case "100svh":
        case "100lvh":
        case "100dvw":
        case "100svw":
        case "100lvw":
          return 100; // Default fallback for special values
        default:
          if (value.endsWith("ch")) {
            return parseInt(value, 10) * 8; // Approximate ch to pixels
          }
      }
    }

    return 100; // Default fallback
  };

  if (fill) {
    return (
      <ChakraImage
        asChild
        position="relative"
        width={width}
        height={height}
        {...props}
      >
        <NextImage src={src} alt={alt} fill={true} sizes={sizes} />
      </ChakraImage>
    );
  }

  return (
    <ChakraImage asChild {...props}>
      <NextImage
        src={src}
        alt={alt}
        width={getValue(width)}
        height={getValue(height)}
      />
    </ChakraImage>
  );
};
