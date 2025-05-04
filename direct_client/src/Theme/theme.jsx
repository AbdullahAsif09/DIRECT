import { createTheme } from "@mui/material";
import { components } from "./components";
const darkColor = "#252B42";

const secondDarkColor = "#0b101e";
const ThirdDarkColor = "#161e29";

export const customTheme = createTheme({
  // Extend the base theme's palette
  palette: {
    bg: {
      fadedPink: "#ff6b81",
      vibrantBlue: "#70a1ff",
      black: "rgb(27, 28, 28)",
      darkBlue: "#252B42",
      secondDarkBlue: secondDarkColor,
      blue: "#3498db",
      lightPurple: "#5758BB",
      lightOrange: "#e67e22",
      orange: "#f39c12",
      lightRed: "#ff7675",
      slightlyLightRed: "#e74c3c",
      normalRed: "#c0392b",
      lightGray: "#5758BB",
      Gray: "gray",
      white: "#FFFFFF",
      parrotGreen: "#6ab04c",
      greenLight: "#00AD50",
      greenMui: "#2e7d32",
      greenMuiHover: "#1b5e20",
      green: "#075B2B",
      greenDark: "#098E6E",
      greenDarker: "#115740",
      greenGradient: `linear-gradient(269deg, #075B2B 16.65%, #098E6E 97.87%) `,
    },
    boxShadows: {
      boxShadowNormal: "0px 0px 10px 0px rgba(7, 6, 18, 0.20)",
      boxShadowTable:
        "0px 2px 4px -1px rgba(-1,0,0,0.2), 0px 4px 12px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.1)",
      boxShadowCards: "0px 0px 10px 0px rgba(7, 6, 18, 0.20)",
      boxShadowCardsLight:
        "rgba(9, 30, 66, 0.18) 0px 4px 8px -2px, rgba(9, 30, 66, 0.18) 0px 0px 0px 1px",
    },
    text: {
      dark: darkColor,
      grey: "#737373",
      slightyLightGray: "#5758BB",
      lightGrey: "rgb(220,220,220)",
    },
    customPalette2: {
      main: "#2196F3", // Custom color 2
    },

    appPadding: {
      paddingBlock: "5rem",
      paddingInline: "3.5rem",
    },
  },
  typography: {
    fontFamily: "'Roboto Slab', serif",
    fontHeading: "24px",
    h1: {
      fontSize: "40px",
      fontWeight: "bold",
      color: darkColor,
    },
    h2: {
      fontSize: "26px",
      fontWeight: "bold",
      color: darkColor,
    },
    h3: {
      fontSize: "22px",
      color: darkColor,
      fontWeight: "bold",
    },
    h4: {
      color: darkColor,
      fontSize: "18px",
      fontWeight: "500",
    },
    h5: {
      color: darkColor,
      fontSize: "16px",
      fontWeight: "500",
    },
    h6: {
      color: darkColor,
      fontSize: "14px",
      fontWeight: "500",
    },
  },
  components,
});
