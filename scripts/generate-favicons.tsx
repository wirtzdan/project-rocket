import fs from "node:fs/promises";
import path from "node:path";
import pngToIco from "png-to-ico";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { projectConfig } from "../config";
import { LogoMark } from "../config/theme-config";
import { colorPalettes } from "../theme/colors";

const FAVICON_OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "favicon.ico"
);

const ICON_OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "icon.png"
);

const APPLE_ICON_OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "apple-icon.png"
);

const ensureXmlns = (svg: string): string => {
  if (svg.includes("xmlns=")) {
    return svg;
  }

  return svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
};

const getIconColors = () => {
  const primaryPalette = colorPalettes[projectConfig.theme.primaryColorPalette];
  const solidColor = primaryPalette[600].value;
  const emphasizedColor = primaryPalette[700].value;

  return {
    primarySolidColor: solidColor,
    primaryEmphasizedColor: emphasizedColor,
  };
};

const generateFavicons = async (): Promise<void> => {
  const colors = getIconColors();

  const svgString = ensureXmlns(
    renderToStaticMarkup(
      <LogoMark
        height="32"
        primaryEmphasizedColor={colors.primaryEmphasizedColor}
        primarySolidColor={colors.primarySolidColor}
        viewBox="0 0 50 50"
        width="32"
      />
    )
  );

  const svgBuffer = Buffer.from(svgString);

  await fs.mkdir(path.dirname(FAVICON_OUTPUT_PATH), { recursive: true });

  const icon32Png = await sharp(svgBuffer).resize(32, 32).png().toBuffer();

  const appleIconPng = await sharp(svgBuffer).resize(180, 180).png().toBuffer();

  await fs.writeFile(ICON_OUTPUT_PATH, icon32Png);
  await fs.writeFile(APPLE_ICON_OUTPUT_PATH, appleIconPng);

  const faviconIco = await pngToIco([icon32Png]);
  await fs.writeFile(FAVICON_OUTPUT_PATH, faviconIco);

  // eslint-disable-next-line no-console
  console.log(`Generated ${FAVICON_OUTPUT_PATH}`);
  // eslint-disable-next-line no-console
  console.log(`Generated ${ICON_OUTPUT_PATH}`);
  // eslint-disable-next-line no-console
  console.log(`Generated ${APPLE_ICON_OUTPUT_PATH}`);
};

const main = async (): Promise<void> => {
  try {
    await generateFavicons();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to generate favicons", error);
    process.exit(1);
  }
};

main().catch(() => {
  // Error handling is performed in main.
});
