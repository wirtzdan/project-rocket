import fs from "node:fs/promises";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { Logo, LogoMark } from "../config/theme-config";
import { system } from "../theme/theme";

const LOGO_OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "logo.svg"
);

const LOGO_MARK_OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "logo-mark.svg"
);

const LOGO_PNG_OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "logo.png"
);

const LOGO_MARK_PNG_OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "logo-mark.png"
);

const PNG_HEIGHT = 200;

const ensureXmlns = (svg: string): string => {
  if (svg.includes("xmlns=")) {
    return svg;
  }

  return svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
};

const getLogoColors = () => {
  const primarySolidColor = system.token("colors.primary.600", "#000000");
  const primaryEmphasizedColor = system.token("colors.primary.300", "#000000");
  const foregroundColor = system.token("colors.black", "#000000");

  return {
    primarySolidColor,
    primaryEmphasizedColor,
    foregroundColor,
  };
};

const writeLogoAssets = async (): Promise<void> => {
  const colors = getLogoColors();

  await fs.mkdir(path.dirname(LOGO_OUTPUT_PATH), { recursive: true });

  const logoSvg = ensureXmlns(renderToStaticMarkup(<Logo {...colors} />));
  await fs.writeFile(`${LOGO_OUTPUT_PATH}`, `${logoSvg}\n`, "utf8");

  const logoMarkSvg = ensureXmlns(
    renderToStaticMarkup(<LogoMark {...colors} />)
  );
  await fs.writeFile(`${LOGO_MARK_OUTPUT_PATH}`, `${logoMarkSvg}\n`, "utf8");

  // Generate PNGs from SVGs
  const logoPng = await sharp(Buffer.from(logoSvg))
    .resize({ height: PNG_HEIGHT })
    .png()
    .toBuffer();
  await fs.writeFile(LOGO_PNG_OUTPUT_PATH, logoPng);

  const logoMarkPng = await sharp(Buffer.from(logoMarkSvg))
    .resize({ height: PNG_HEIGHT })
    .png()
    .toBuffer();
  await fs.writeFile(LOGO_MARK_PNG_OUTPUT_PATH, logoMarkPng);
};

const main = async (): Promise<void> => {
  try {
    await writeLogoAssets();
    // eslint-disable-next-line no-console
    console.log(`Generated ${LOGO_OUTPUT_PATH}`);
    // eslint-disable-next-line no-console
    console.log(`Generated ${LOGO_MARK_OUTPUT_PATH}`);
    // eslint-disable-next-line no-console
    console.log(`Generated ${LOGO_PNG_OUTPUT_PATH}`);
    // eslint-disable-next-line no-console
    console.log(`Generated ${LOGO_MARK_PNG_OUTPUT_PATH}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to generate logo.svg", error);
    process.exit(1);
  }
};

main().catch(() => {
  // Error handling is performed in main.
});
