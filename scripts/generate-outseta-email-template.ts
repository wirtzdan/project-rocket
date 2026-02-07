import fs from "node:fs/promises";
import path from "node:path";
import { generalConfig } from "../config/general-config";
import { system } from "../theme/theme";

const TEMPLATE_SOURCE_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "outseta-email-template.source.html"
);
const TEMPLATE_OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "outseta-email-template.html"
);

interface TokenEntry {
  value: string;
  extensions: {
    cssVar?: { var: string; ref: string };
    conditions?: Record<string, string>;
  };
  name: string;
}

const REFERENCE_REGEX = /^\{(.+)\}$/;
const SOCIAL_SECTION_REGEX =
  /<!-- Socials -->[\s\S]*?<\/table>[\s\n]*<!-- Buttons -->/;
const HEX_COLOR_REGEX = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g;
const CSS_VAR_REGEX = /var\(--chakra-[^)]+\)/g;
const TRAILING_SLASH_REGEX = /\/$/;
const PROTOCOL_REGEX = /^https?:\/\//;

const buildTokenMap = (): Map<string, string> => {
  const allTokens = system.tokens.allTokens as TokenEntry[];

  // First pass: build a name → raw value map for resolving references
  const nameToValue = new Map<string, string>();
  for (const token of allTokens) {
    if (!token.extensions.conditions && token.value) {
      nameToValue.set(token.name, token.value);
    }
  }

  // Resolve a reference value like "{colors.primary.600}" or "white" to static value
  const resolveReference = (ref: string): string | undefined => {
    const match = ref.match(REFERENCE_REGEX);
    if (match) {
      return nameToValue.get(match[1]);
    }
    // Plain value like "white" — try as color token
    const asColor = nameToValue.get(`colors.${ref}`);
    if (asColor) {
      return asColor;
    }
    return ref;
  };

  // Second pass: build CSS var name → resolved static value map
  const cssVarToValue = new Map<string, string>();
  for (const token of allTokens) {
    const cssVar = token.extensions.cssVar?.var;
    if (!cssVar) {
      continue;
    }

    // Skip negative spacing tokens (e.g. spacing.-2) — they share the same
    // CSS var name as the positive token and would overwrite the correct value
    if (token.name.includes(".-")) {
      continue;
    }

    if (token.extensions.conditions) {
      // Semantic token — resolve _light value, fall back to base
      const refValue =
        token.extensions.conditions._light ?? token.extensions.conditions.base;
      if (refValue) {
        const resolved = resolveReference(refValue);
        if (resolved) {
          cssVarToValue.set(cssVar, resolved);
        }
      }
    } else {
      // Raw token — value is already resolved
      cssVarToValue.set(cssVar, token.value);
    }
  }

  return cssVarToValue;
};

const getColorValue = (
  tokenMap: Map<string, string>,
  tokenPath: string
): string | undefined => {
  const cssVar = `--chakra-colors-${tokenPath.replace(/\./g, "-")}`;
  return tokenMap.get(cssVar);
};

const createColorMapping = (
  tokenMap: Map<string, string>
): Map<string, string> => {
  const colorMap = new Map<string, string>();

  // Map hardcoded colors to design system tokens
  // Background colors
  const bgSubtle = getColorValue(tokenMap, "bg.subtle");
  const bgPanel = getColorValue(tokenMap, "bg.panel");
  const bgEmphasized = getColorValue(tokenMap, "bg.emphasized");

  // Text colors
  const fg = getColorValue(tokenMap, "fg");
  const fgSubtle = getColorValue(tokenMap, "fg.subtle");

  // Border colors
  const border = getColorValue(tokenMap, "border");

  // Primary colors
  const primary600 = getColorValue(tokenMap, "primary.600");
  const primarySolid = getColorValue(tokenMap, "primary.solid");

  // Error colors
  const fgError = getColorValue(tokenMap, "fg.error");

  // Base colors
  const black = getColorValue(tokenMap, "black");
  const white = getColorValue(tokenMap, "white");

  // Map email template colors to design system
  // #EAEAEA (background) → bg.subtle
  if (bgSubtle) {
    colorMap.set("#EAEAEA", bgSubtle);
    colorMap.set("#eaeaea", bgSubtle.toLowerCase());
  }

  // #F4F4F4 (card background) → bg.panel
  if (bgPanel) {
    colorMap.set("#F4F4F4", bgPanel);
    colorMap.set("#f4f4f4", bgPanel.toLowerCase());
  }

  // #201D1D (text) → fg
  if (fg) {
    colorMap.set("#201D1D", fg);
    colorMap.set("#201d1d", fg.toLowerCase());
  }

  // #E1E1E1 (borders) → border
  if (border) {
    colorMap.set("#E1E1E1", border);
    colorMap.set("#e1e1e1", border.toLowerCase());
  }

  // #817F7F (muted text) → fg.subtle
  if (fgSubtle) {
    colorMap.set("#817F7F", fgSubtle);
    colorMap.set("#817f7f", fgSubtle.toLowerCase());
  }

  // #F84131 (coral button) → primary.600 or fg.error
  const buttonColor = primary600 || primarySolid || fgError;
  if (buttonColor) {
    colorMap.set("#F84131", buttonColor);
    colorMap.set("#f84131", buttonColor.toLowerCase());
  }

  // #000 (black) → black or fg
  const blackColor = black || fg;
  if (blackColor) {
    colorMap.set("#000", blackColor);
    colorMap.set("#000000", blackColor);
  }

  // #ffffff (white) → white
  if (white) {
    colorMap.set("#ffffff", white);
    colorMap.set("#FFFFFF", white);
  }

  // #cacaca (neutral-400 hover) → bg.emphasized or similar
  if (bgEmphasized) {
    colorMap.set("#cacaca", bgEmphasized);
    colorMap.set("#CACACA", bgEmphasized);
  }

  // #df3b2c (coral hover) → darker shade of primary
  const coralHover = primary600 || fgError;
  if (coralHover) {
    colorMap.set("#df3b2c", coralHover);
    colorMap.set("#DF3B2C", coralHover);
  }

  return colorMap;
};

const removeSocialLinksSection = (html: string): string => {
  // Remove the entire Socials table section
  // Match from <!-- Socials --> to </table> that closes it
  return html.replace(SOCIAL_SECTION_REGEX, "<!-- Buttons -->");
};

const replaceChakraCSSVars = (
  html: string,
  tokenMap: Map<string, string>
): string => {
  return html.replace(CSS_VAR_REGEX, (match) => {
    // Extract CSS variable name from var(...)
    const inner = match.slice(4, -1); // Remove "var(" and ")"
    const cssVarName = inner.split(/[\s,]/)[0]; // Take only the variable name

    const resolved = tokenMap.get(cssVarName);
    if (resolved) {
      return resolved;
    }

    // Return original if we can't resolve
    return match;
  });
};

const replaceColors = (html: string, colorMap: Map<string, string>): string => {
  let result = html;

  // Replace colors in style attributes and CSS
  // Match hex colors in various contexts: #RRGGBB, #RGB, with or without quotes
  result = result.replace(HEX_COLOR_REGEX, (match) => {
    // Normalize to uppercase for matching
    const normalized = match.toUpperCase();
    // Handle shorthand colors like #FFF -> #FFFFFF
    const fullHex =
      normalized.length === 4
        ? `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`
        : normalized;

    const replacement = colorMap.get(fullHex) || colorMap.get(normalized);
    if (replacement) {
      // Preserve original case pattern (uppercase/lowercase)
      return match === normalized
        ? replacement.toUpperCase()
        : replacement.toLowerCase();
    }
    return match;
  });

  return result;
};

const replaceConfigValues = (html: string): string => {
  let result = html;
  const siteUrl = generalConfig.siteUrl.replace(TRAILING_SLASH_REGEX, "");
  const siteUrlWithoutProtocol = siteUrl.replace(PROTOCOL_REGEX, "");
  const projectName = generalConfig.name;

  // Replace config placeholders
  result = result.replace(/\{\{ siteUrl \}\}/g, siteUrl);
  result = result.replace(/\{\{ siteUrlDomain \}\}/g, siteUrlWithoutProtocol);
  result = result.replace(/\{\{ projectName \}\}/g, projectName);

  return result;
};

const processTemplate = (
  html: string,
  tokenMap: Map<string, string>
): string => {
  // Step 1: Remove social links section (if present)
  let result = removeSocialLinksSection(html);

  // Step 2: Replace Chakra CSS variables with resolved values
  result = replaceChakraCSSVars(result, tokenMap);

  // Step 3: Create color mapping for any remaining hex colors
  const colorMap = createColorMapping(tokenMap);

  // Step 4: Replace any remaining hex colors
  result = replaceColors(result, colorMap);

  // Step 5: Replace config values
  result = replaceConfigValues(result);

  return result;
};

const main = async (): Promise<void> => {
  try {
    const tokenMap = buildTokenMap();

    // Read the template file
    const templateContent = await fs.readFile(TEMPLATE_SOURCE_PATH, "utf8");

    // Process the template
    const processedTemplate = processTemplate(templateContent, tokenMap);

    // Ensure output directory exists
    await fs.mkdir(path.dirname(TEMPLATE_OUTPUT_PATH), { recursive: true });

    // Write the processed template
    await fs.writeFile(TEMPLATE_OUTPUT_PATH, processedTemplate, "utf8");

    // eslint-disable-next-line no-console
    console.log(`Generated ${TEMPLATE_OUTPUT_PATH}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to generate email template", error);
    process.exit(1);
  }
};

main().catch(() => {
  // Error handling is performed in main.
});
