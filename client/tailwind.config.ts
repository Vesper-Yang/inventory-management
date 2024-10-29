import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

// 1. Tailwind CSS 的标准颜色
const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

// 2. 色调映射：Tailwind CSS 的标准色阶，可以反转颜色的深浅。
const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

// 3. 生成颜色主题
const generateThemeObject = (colors: any, mapping: any, invert = false) => {
  const theme: any = {};
  baseColors.forEach((color) => {
    theme[color] = {};
    Object.entries(mapping).forEach(([key, value]: any) => {
      const shadeKey = invert ? value : key;
      theme[color][key] = colors[color][shadeKey];
    });
  });
  return theme;
};

// 4. 创建浅色和深色主题
const lightTheme = generateThemeObject(colors, shadeMapping);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

// 5. 存储浅色和深色主题
const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff",
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"], // 几乎是黑色 '#030712'
    black: colors.gray["50"], // 几乎是黑色 '#f9fafb' tailwind的颜色对象
  },
};

const config: Config = {
  darkMode: "class", // 在CSS中输入dark来启用深色主题
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [createThemes(themes)], //插件用来扩展 Tailwind 的功能或添加自定义功能，一旦注册了这个插件，Tailwind 就知道在构建样式时要使用这个插件。
};

export default config;
