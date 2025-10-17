import { Platform } from "react-native";

export const COLORS = {
  primary: {
    gradient: ["#CE5F68", "#ce5f6883"] as const,
    solid: "#CE5F68",
    light: "#ce5f6883",
  },

  background: {
    dark: "#991b1b",
    light: "#7f1d1d",
  },

  card: {
    gradient: ["#f8fafc", "#e2e8f0"] as const,
    light: "#f1f5f9",
    accent: "#ffdedeff",
  },

  text: {
    primary: "#1f2937",
    secondary: "#6b7280",
    light: "#f5f5f4",
    accent: "#991b1b",
    white: "#ffffff",
  },
} as const;

export const GRADIENTS = {
  primary: {
    colors: COLORS.primary.gradient,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },

  background: {
    colors: [COLORS.background.dark, COLORS.background.light] as const,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },

  card: {
    colors: COLORS.card.gradient,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
} as const;

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",

    serif: "ui-serif",

    rounded: "ui-rounded",

    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
