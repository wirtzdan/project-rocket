import fs from "node:fs/promises";
import path from "node:path";
import { generalConfig } from "../config/general-config";
import { system } from "../theme/theme";

const INPUT_PATH = path.join(process.cwd(), "styles", "outseta-styles.css");
const OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "outseta-hosted-styles.css"
);
const HOSTED_CODE_OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "outseta-hosted-code.html"
);

const CSS_VAR_REGEX = /var\(--chakra-[^)]+\)/g;

type TokenEntry = {
  value: string;
  extensions: {
    cssVar?: { var: string; ref: string };
    conditions?: Record<string, string>;
  };
  name: string;
};

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
    const match = ref.match(/^\{(.+)\}$/);
    if (match) {
      return nameToValue.get(match[1]);
    }
    // Plain value like "white" — try as color token
    const asColor = nameToValue.get(`colors.${ref}`);
    if (asColor) return asColor;
    return ref;
  };

  // Second pass: build CSS var name → resolved static value map
  const cssVarToValue = new Map<string, string>();
  for (const token of allTokens) {
    const cssVar = token.extensions.cssVar?.var;
    if (!cssVar) continue;

    // Skip negative spacing tokens (e.g. spacing.-2) — they share the same
    // CSS var name as the positive token and would overwrite the correct value
    if (token.name.includes(".-")) continue;

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

const processCSS = (
  cssContent: string,
  tokenMap: Map<string, string>
): string => {
  return cssContent.replace(CSS_VAR_REGEX, (match) => {
    // Extract CSS variable name from var(...) — handle extra content like fallbacks
    const inner = match.slice(4, -1); // Remove "var(" and ")"
    const cssVarName = inner.split(/[\s,]/)[0]; // Take only the variable name

    const resolved = tokenMap.get(cssVarName);
    if (resolved) return resolved;

    // Return original if we can't resolve
    return match;
  });
};

const buildHostedCode = (): string => {
  const siteUrl = generalConfig.siteUrl.replace(/\/$/, "");

  return `<!-- Icons -->
<link rel="icon" href="${siteUrl}/static/favicon.ico" type="image/x-icon" sizes="32x32">
<link rel="icon" href="${siteUrl}/static/icon.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${siteUrl}/static/apple-icon.png" sizes="180x180">
<!-- Outseta Styling -->
<link rel="preload" href="${siteUrl}/static/outseta-hosted-styles.css" as="style">
`;
};

const main = async (): Promise<void> => {
  try {
    const tokenMap = buildTokenMap();
    const cssContent = await fs.readFile(INPUT_PATH, "utf8");
    const resolvedCSS = processCSS(cssContent, tokenMap);

    // Validate no unresolved chakra vars remain
    const remaining = resolvedCSS.match(CSS_VAR_REGEX);
    if (remaining) {
      // eslint-disable-next-line no-console
      console.warn(
        "Unresolved Chakra CSS variables:",
        [...new Set(remaining)].join(", ")
      );
    }

    await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    await fs.writeFile(OUTPUT_PATH, resolvedCSS, "utf8");

    const hostedCode = buildHostedCode();
    await fs.writeFile(HOSTED_CODE_OUTPUT_PATH, hostedCode, "utf8");

    // eslint-disable-next-line no-console
    console.log(`Generated ${OUTPUT_PATH}`);
    // eslint-disable-next-line no-console
    console.log(`Generated ${HOSTED_CODE_OUTPUT_PATH}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to generate outseta-styles.css", error);
    process.exit(1);
  }
};

main().catch(() => {
  // Error handling is performed in main.
});
