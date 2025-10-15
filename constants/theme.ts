/**
 * Theme Constants
 * Cores, gradientes e estilos padronizados do app Make My Drink
 *
 * O app usa NativeWind (Tailwind CSS) para estilização.
 * Estas constantes são usadas principalmente para LinearGradient e cores customizadas.
 */

import { Platform } from "react-native";

/**
 * Cores customizadas do app
 */
export const COLORS = {
  // Background gradients - Cor principal do app
  primary: {
    gradient: ["#CE5F68", "#ce5f6883"] as const,
    solid: "#CE5F68",
    light: "#ce5f6883",
  },

  // Backgrounds secundários
  background: {
    dark: "#991b1b",
    light: "#7f1d1d",
  },

  // Cards e componentes
  card: {
    gradient: ["#f8fafc", "#e2e8f0"] as const,
    light: "#f1f5f9",
    accent: "#ffdedeff",
  },

  // Text colors
  text: {
    primary: "#1f2937", // gray-800
    secondary: "#6b7280", // gray-500
    light: "#f5f5f4", // stone-100
    accent: "#991b1b", // red-800
    white: "#ffffff",
  },
} as const;

/**
 * Configurações de gradientes prontas para uso com LinearGradient
 * Uso: <LinearGradient {...GRADIENTS.primary} />
 */
export const GRADIENTS = {
  // Gradiente principal do app (rosa/vermelho)
  primary: {
    colors: COLORS.primary.gradient,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },

  // Gradiente de fundo das telas (vermelho escuro)
  background: {
    colors: [COLORS.background.dark, COLORS.background.light] as const,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },

  // Gradiente dos cards (cinza claro para rosa claro)
  card: {
    colors: COLORS.card.gradient,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
} as const;

/**
 * Cores do Expo (mantidas para compatibilidade)
 * Não estão sendo usadas no momento, mas podem ser úteis futuramente
 */
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

/**
 * Fontes do sistema (mantidas da configuração Expo)
 */
export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
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
