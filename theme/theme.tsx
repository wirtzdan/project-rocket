import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { projectConfig } from "@/config";
import { colorPalettes, neutralPalettes } from "@/theme/colors";

const fallback = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: {
          value: `"${projectConfig.theme.headingFont}", ${fallback}`,
        },
        body: {
          value: `"${projectConfig.theme.bodyFont}", ${fallback}`,
        },
        mono: {
          value: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
        },
      },
      colors: {
        black: { value: "#09090B" },
        white: { value: "#FFFFFF" },
        neutral: neutralPalettes[projectConfig.theme.neutralColorPalette],
        primary: colorPalettes[projectConfig.theme.primaryColorPalette],
        secondary: colorPalettes[projectConfig.theme.secondaryColorPalette],
      },
      fontSizes: {
        "2xs": { value: "0.625rem" },
        xs: { value: "0.75rem" },
        sm: { value: "0.875rem" },
        md: { value: "1rem" },
        lg: { value: "1.125rem" },
        xl: { value: "1.25rem" },
        "2xl": { value: "1.5rem" },
        "3xl": { value: "1.875rem" },
        "4xl": { value: "2.25rem" },
        "5xl": { value: "3rem" },
        "6xl": { value: "3.75rem" },
        "7xl": { value: "4.5rem" },
        "8xl": { value: "6rem" },
        "9xl": { value: "8rem" },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: {
              _light: "white",
              _dark: "{colors.neutral.950}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.neutral.50}",
              _dark: "{colors.neutral.950}",
            },
          },
          muted: {
            value: {
              _light: "{colors.neutral.100}",
              _dark: "{colors.neutral.900}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.neutral.200}",
              _dark: "{colors.neutral.800}",
            },
          },
          inverted: {
            value: { _light: "{colors.black}", _dark: "{colors.white}" },
          },
          panel: {
            value: { _light: "{colors.white}", _dark: "{colors.neutral.950}" },
          },
          error: {
            value: { _light: "{colors.red.50}", _dark: "{colors.red.950}" },
          },
          warning: {
            value: {
              _light: "{colors.orange.50}",
              _dark: "{colors.orange.950}",
            },
          },
          success: {
            value: { _light: "{colors.green.50}", _dark: "{colors.green.950}" },
          },
          info: {
            value: { _light: "{colors.blue.50}", _dark: "{colors.blue.950}" },
          },
        },
        fg: {
          DEFAULT: {
            value: { _light: "{colors.black}", _dark: "{colors.neutral.50}" },
          },
          muted: {
            value: {
              _light: "{colors.neutral.600}",
              _dark: "{colors.neutral.400}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.neutral.400}",
              _dark: "{colors.neutral.500}",
            },
          },
          inverted: {
            value: { _light: "{colors.neutral.50}", _dark: "{colors.black}" },
          },
          error: {
            value: { _light: "{colors.red.500}", _dark: "{colors.red.400}" },
          },
          warning: {
            value: {
              _light: "{colors.orange.600}",
              _dark: "{colors.orange.300}",
            },
          },
          success: {
            value: {
              _light: "{colors.green.600}",
              _dark: "{colors.green.300}",
            },
          },
          info: {
            value: { _light: "{colors.blue.600}", _dark: "{colors.blue.300}" },
          },
        },
        border: {
          DEFAULT: {
            value: {
              _light: "{colors.neutral.200}",
              _dark: "{colors.neutral.800}",
            },
          },
          muted: {
            value: {
              _light: "{colors.neutral.100}",
              _dark: "{colors.neutral.900}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.neutral.50}",
              _dark: "{colors.neutral.950}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.neutral.300}",
              _dark: "{colors.neutral.700}",
            },
          },
          inverted: {
            value: {
              _light: "{colors.neutral.800}",
              _dark: "{colors.neutral.200}",
            },
          },
          error: {
            value: { _light: "{colors.red.500}", _dark: "{colors.red.400}" },
          },
          warning: {
            value: {
              _light: "{colors.orange.500}",
              _dark: "{colors.orange.400}",
            },
          },
          success: {
            value: {
              _light: "{colors.green.500}",
              _dark: "{colors.green.400}",
            },
          },
          info: {
            value: { _light: "{colors.blue.500}", _dark: "{colors.blue.400}" },
          },
        },
        primary: {
          contrast: {
            value: { _light: "white", _dark: "white" },
          },
          fg: {
            value: {
              _light: "{colors.primary.700}",
              _dark: "{colors.primary.300}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.primary.100}",
              _dark: "{colors.primary.900}",
            },
          },
          muted: {
            value: {
              _light: "{colors.primary.200}",
              _dark: "{colors.primary.800}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.primary.300}",
              _dark: "{colors.primary.700}",
            },
          },
          solid: {
            value: {
              _light: "{colors.primary.600}",
              _dark: "{colors.primary.600}",
            },
          },
          focusRing: {
            value: {
              _light: "{colors.primary.600}",
              _dark: "{colors.primary.600}",
            },
          },
        },
      },
      radii: {
        l1: {
          value: getBorderRadiusValue(projectConfig.theme.radius, -1),
        },
        l2: {
          value: getBorderRadiusValue(projectConfig.theme.radius, 0),
        },
        l3: {
          value: getBorderRadiusValue(projectConfig.theme.radius, 1),
        },
      },
      shadows: {
        xs: {
          value: {
            _light:
              "0px 1px 2px {colors.neutral.900/10}, 0px 0px 1px {colors.neutral.900/20}",
            _dark:
              "0px 1px 1px {black/64}, 0px 0px 1px inset {colors.neutral.300/20}",
          },
        },
        sm: {
          value: {
            _light:
              "0px 2px 4px {colors.neutral.900/10}, 0px 0px 1px {colors.neutral.900/30}",
            _dark:
              "0px 2px 4px {black/64}, 0px 0px 1px inset {colors.neutral.300/30}",
          },
        },
        md: {
          value: {
            _light:
              "0px 4px 8px {colors.neutral.900/10}, 0px 0px 1px {colors.neutral.900/30}",
            _dark:
              "0px 4px 8px {black/64}, 0px 0px 1px inset {colors.neutral.300/30}",
          },
        },
        lg: {
          value: {
            _light:
              "0px 8px 16px {colors.neutral.900/10}, 0px 0px 1px {colors.neutral.900/30}",
            _dark:
              "0px 8px 16px {black/64}, 0px 0px 1px inset {colors.neutral.300/30}",
          },
        },
        xl: {
          value: {
            _light:
              "0px 16px 24px {colors.neutral.900/10}, 0px 0px 1px {colors.neutral.900/30}",
            _dark:
              "0px 16px 24px {black/64}, 0px 0px 1px inset {colors.neutral.300/30}",
          },
        },
        "2xl": {
          value: {
            _light:
              "0px 24px 40px {colors.neutral.900/16}, 0px 0px 1px {colors.neutral.900/30}",
            _dark:
              "0px 24px 40px {black/64}, 0px 0px 1px inset {colors.neutral.300/30}",
          },
        },
        inner: {
          value: {
            _light: "inset 0 2px 4px 0 {black/5}",
            _dark: "inset 0 2px 4px 0 black",
          },
        },
        inset: {
          value: {
            _light: "inset 0 0 0 1px {black/5}",
            _dark: "inset 0 0 0 1px {colors.neutral.300/5}",
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);

function getBorderRadiusValue(selected: string, offset: number) {
  const values = [
    "none",
    "2xs",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "full",
  ];
  const selectedIndex = values.indexOf(selected);
  const targetIndex = Math.max(
    0,
    Math.min(values.length - 1, selectedIndex + offset)
  );
  return `{radii.${values[targetIndex]}}`;
}
