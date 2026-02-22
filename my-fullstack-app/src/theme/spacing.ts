import { ThemeOptions } from "@mui/material/styles";

/**
 * Spacing Theme
 * - 8px grid を基本とする
 * - 仕様例外は用途限定で定義
 */
export const spacingTheme: ThemeOptions = {
  spacing: 8, // MUI 標準（8px grid）

  layout: {
    spacing: {
      /** 基本単位 */
      unit: 8,

      /** 仕様例外 */
      gutterSp: 20, // SP左右ガター専用
      barHeight: 80, // Header / Footer 高さ（参照用）

      /** 用途別プリセット */
      inset: {
        sm: 16, // Card / Box 内側
        md: 24,
      },
      stack: {
        sm: 16, // 要素縦並び
        md: 24,
      },
      section: {
        sm: 48, // セクション間
        md: 64,
      },
    },
  },
};
