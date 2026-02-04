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

const parsePixelValue = (size: string): number | null => {
  if (size.endsWith("px")) {
    return Number.parseInt(size, 10);
  }
  return null;
};

const getTokenValue = (size: string | number): string | number | null => {
  const sizeToken = Array.from(
    defaultSystem.tokens.categoryMap.get("sizes")?.values() ?? []
  ).find((token) => token.name === `sizes.${size}`);
  return sizeToken?.value ?? null;
};

const parseRemValue = (value: string): number | null => {
  if (value.endsWith("rem")) {
    return Number.parseFloat(value) * 16;
  }
  return null;
};

const parsePercentageValue = (value: string): number | null => {
  if (value.endsWith("%")) {
    return 100;
  }
  return null;
};

const parseSpecialValue = (value: string): number | null => {
  const specialValues = [
    "max-content",
    "min-content",
    "fit-content",
    "100vh",
    "100vw",
    "100dvh",
    "100svh",
    "100lvh",
    "100dvw",
    "100svw",
    "100lvw",
  ];

  if (specialValues.includes(value)) {
    return 100;
  }

  if (value.endsWith("ch")) {
    return Number.parseInt(value, 10) * 8;
  }

  return null;
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
    if (!size) {
      return 100;
    }

    if (typeof size === "string") {
      const pixelValue = parsePixelValue(size);
      if (pixelValue !== null) {
        return pixelValue;
      }
    }

    const tokenValue = getTokenValue(size);
    if (!tokenValue) {
      return 100;
    }

    if (typeof tokenValue === "number") {
      return tokenValue;
    }

    const remValue = parseRemValue(tokenValue);
    if (remValue !== null) {
      return remValue;
    }

    const percentageValue = parsePercentageValue(tokenValue);
    if (percentageValue !== null) {
      return percentageValue;
    }

    const specialValue = parseSpecialValue(tokenValue);
    if (specialValue !== null) {
      return specialValue;
    }

    return 100;
  };

  if (fill) {
    return (
      <ChakraImage
        asChild
        height={height}
        position="relative"
        width={width}
        {...props}
      >
        <NextImage alt={alt} fill={true} sizes={sizes} src={src} />
      </ChakraImage>
    );
  }

  return (
    <ChakraImage asChild {...props}>
      <NextImage
        alt={alt}
        height={getValue(height)}
        src={src}
        width={getValue(width)}
      />
    </ChakraImage>
  );
};
