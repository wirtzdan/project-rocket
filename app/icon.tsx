import { ImageResponse } from "next/og";
import { projectConfig } from "@/config";
import { colorPalettes } from "@/theme/colors";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  const primaryPalette = colorPalettes[projectConfig.theme.primaryColorPalette];
  const solidColor = primaryPalette[600].value;
  const emphasizedColor = primaryPalette[700].value;

  const svgString = `<svg width="32" height="32" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path clip-rule="evenodd" d="M20.127 0C15.466 0 11.2287 1.69492 7.83887 4.23729L30.9321 31.9915L49.788 17.7966C48.9406 7.83898 40.466 0 30.0846 0" fill="${solidColor}" fill-rule="evenodd"/>
    <path clip-rule="evenodd" d="M30.0847 50C41.1017 50 50 41.1017 50 30.0847V29.0254L32.839 41.7373C30.9322 43.2203 28.178 42.7966 26.6949 41.1017L2.11864 11.4407C0.847458 13.983 0 16.9491 0 19.9152V29.8729C0 40.8898 8.89831 49.7881 19.9153 49.7881" fill="${emphasizedColor}" fill-rule="evenodd"/>
  </svg>`;

  const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(svgString)}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url("${svgDataUrl}")`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />,
    {
      ...size,
    }
  );
}
