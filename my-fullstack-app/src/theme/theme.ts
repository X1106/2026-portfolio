// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

/* ------------------------------------------------------------
   Theme Extension: layout tokens
------------------------------------------------------------ */
declare module "@mui/material/styles" {
  interface Theme {
    layout: {
      /** max-width 管理 */
      maxWide: {
        default: number; // 1400
        top: number; // 1440
      };

      /** モバイル基準ガター */
      gutter: {
        sp: number; // 20
      };

      /** 固定バー（Header / Footer） */
      bar: {
        height: number; // 80
        zHeader: number; // 1200
        zFooter: number; // 1190
      };

      /** ページ余白トークン（後続実装用） */
      pagePadding: {
        contact: {
          pcX: number;
          pcTop: number;
          pcBottom: number;
          spX: number;
          spTop: number;
          spBottom: number;
        };
        news: {
          pcX: number;
          pcTop: number;
          pcBottom: number;
          spX: number;
          spTop: number;
          spBottom: number;
        };
      };

      /** spacing tokens（Spacing Style Guide の値を用途別に保持） */
      spacing: {
        unit: number; // 8
        gutterSp: number; // 20
        barHeight: number; // 80
        inset: { sm: number; md: number };
        stack: { sm: number; md: number };
        section: { sm: number; md: number };
      };
    };
  }

  interface ThemeOptions {
    layout?: Theme["layout"];
  }
}

/* ------------------------------------------------------------
   Theme
------------------------------------------------------------ */
const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: colors.text.primary, // #212121
      contrastText: colors.button.primary.text, // #FFFFFF
    },
    secondary: {
      main: colors.text.secondary, // #616161（必要なら変更OK）
    },

    background: {
      default: colors.background.base, // #FFFFFF
      paper: colors.background.base, // #FFFFFF
    },

    text: {
      primary: colors.text.primary, // #212121
      secondary: colors.text.secondary, // #616161
      disabled: colors.text.muted, // #9E9E9E（テキスト無効/注釈）
    },

    divider: colors.border.default, // #9E9E9E（区切り線）
  },

  typography: {
    fontFamily: [
      '"Roboto"',
      '"Hiragino Kaku Gothic ProN"',
      '"Meiryo"',
      "sans-serif",
    ].join(","),

    // ざっくり基準（細かいページ別は typographyPresets 側で sx 管理の想定）
    h1: { fontWeight: 900, lineHeight: 1.2 },
    h2: { fontWeight: 800, lineHeight: 1.25 },
    h3: { fontWeight: 700, lineHeight: 1.3 },
    body1: { lineHeight: 1.4 },
    body2: { lineHeight: 1.8 },
    button: { textTransform: "none", fontWeight: 700 },
  },

  shape: {
    borderRadius: 8,
  },

  spacing: 8, // 8px grid

  layout: {
    maxWide: {
      default: 1400,
      top: 1440,
    },
    gutter: {
      sp: 20,
    },
    bar: {
      height: 80,
      zHeader: 1200,
      zFooter: 1190,
    },
    pagePadding: {
      contact: {
        pcX: 160,
        pcTop: 154,
        pcBottom: 232,
        spX: 20,
        spTop: 100,
        spBottom: 108,
      },
      news: {
        pcX: 112,
        pcTop: 154,
        pcBottom: 232,
        spX: 20,
        spTop: 100,
        spBottom: 108,
      },
    },
    spacing: {
      unit: 8,
      gutterSp: 20,
      barHeight: 80,
      inset: { sm: 16, md: 24 },
      stack: { sm: 16, md: 24 },
      section: { sm: 48, md: 64 },
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          // Layout 用 CSS Variables
          "--app-header-h": "80px",
          "--app-footer-h": "80px",
        },
        "html, body": { height: "100%" },
        body: {
          margin: 0,
          backgroundColor: colors.background.base,
          color: colors.text.primary,
        },

        // リンクは必ず #0000EE
        a: {
          color: colors.text.link,
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          minHeight: 48,
          textTransform: "none",
          transition:
            "opacity 200ms ease, background-color 200ms ease, border-color 200ms ease",
          "&:hover": {
            transform: "none",
          },

          // ✅ disabled はここで上書き（MUI推奨の state class）
          "&.Mui-disabled": {
            backgroundColor: colors.button.disabled.bg,
            color: colors.button.disabled.text,
            border: `1px solid ${colors.button.disabled.border}`,
            opacity: 1, // MUI既定の opacity で薄くなるのを防ぐ
          },
        },

        // Pattern 1（Primary Button）
        containedPrimary: {
          backgroundColor: colors.button.primary.bg,
          color: colors.button.primary.text,
          "&:hover": {
            backgroundColor: colors.button.primary.bg,
            opacity: 0.9,
          },
        },

        // Pattern 2（Secondary Button / Outline）
        outlinedPrimary: {
          backgroundColor: colors.button.secondary.bg,
          color: colors.button.secondary.text,
          borderColor: colors.button.secondary.border,
          "&:hover": {
            backgroundColor: colors.button.secondary.bg,
            borderColor: colors.button.secondary.border,
            opacity: 0.9,
          },
        },
      },
    },
  },
});

export default theme;
