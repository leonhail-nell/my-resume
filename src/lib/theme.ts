"use client";

import { createTheme } from "@mui/material/styles";
import { EB_Garamond, Inter } from "next/font/google";
import { colors } from "./colors";

export { colors };

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    background: {
      default: colors.background,
      paper: colors.background,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    divider: colors.divider,
    primary: {
      main: colors.textPrimary,
    },
  },
  typography: {
    fontFamily: `${inter.style.fontFamily}, system-ui, -apple-system, sans-serif`,
    h1: { fontFamily: ebGaramond.style.fontFamily, fontWeight: 400 },
    h2: { fontFamily: ebGaramond.style.fontFamily, fontWeight: 400 },
    h3: { fontFamily: ebGaramond.style.fontFamily, fontWeight: 400 },
    h4: { fontFamily: ebGaramond.style.fontFamily, fontWeight: 400 },
    h5: { fontFamily: ebGaramond.style.fontFamily, fontWeight: 400 },
    h6: { fontFamily: ebGaramond.style.fontFamily, fontWeight: 400 },
    body1: { fontSize: 14, color: colors.textPrimary },
    body2: { fontSize: 13, color: colors.textSecondary },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background,
        },
      },
    },
  },
});

export default theme;
