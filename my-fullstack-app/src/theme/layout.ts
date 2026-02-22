// src/theme/layout.ts
import type { ThemeOptions } from "@mui/material/styles";

/* ------------------------------------------------------------
   Layout Theme Extension
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

      /** spacing.ts で使う拡張（ここが無いと型が合わない） */
      spacing?: {
        unit: number;
        gutterSp: number;
        barHeight: number;
        inset: { sm: number; md: number };
        stack: { sm: number; md: number };
        section: { sm: number; md: number };
      };

      /** ページ余白トークン */
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
    };
  }

  interface ThemeOptions {
    layout?: Theme["layout"];
  }
}

/* ------------------------------------------------------------
   ThemeOptions（createTheme しない）
------------------------------------------------------------ */
export const layoutTheme: ThemeOptions = {
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
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--app-header-h": "80px",
          "--app-footer-h": "80px",
        },
        "html, body": { height: "100%" },
        body: { margin: 0 },
      },
    },
  },
};
