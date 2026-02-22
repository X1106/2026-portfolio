// src/theme/typographyPresets.ts
import { SxProps, Theme } from "@mui/material/styles";

/**
 * タイポ定義表の「字間%」→ CSS letter-spacing へ
 * 15% = 0.15em / 8% = 0.08em / 4% = 0.04em / 0% = 0em
 * （ページ別表に % と (0.15em) が併記されている箇所あり）:contentReference[oaicite:5]{index=5}
 */
const ls = (pct: 0 | 4 | 8 | 15) => {
  switch (pct) {
    case 0:
      return "0em";
    case 4:
      return "0.04em";
    case 8:
      return "0.08em";
    case 15:
      return "0.15em";
  }
};

const fw = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// px → rem（root 16px 前提）
const rem = (px: number) => `${px / 16}rem`;

/**
 * line-height は表の「1.2~1.4」「1.8」をそのまま数値で指定してOK :contentReference[oaicite:6]{index=6}
 * - 見出し/通常本文: 1.2~1.4 → ここでは “基準値” として 1.3 を採用
 * - 長文: 1.8
 */
const lhTight = 1.3;
const lhLong = 1.8;

type DevicePair = { xs: number; md: number };

const sxText = (opts: {
  size: DevicePair;
  weight: number;
  lineHeight: number;
  letterSpacingPct: 0 | 4 | 8 | 15;
  color: string;
}): SxProps<Theme> => ({
  fontSize: { xs: rem(opts.size.xs), md: rem(opts.size.md) },
  fontWeight: opts.weight,
  lineHeight: opts.lineHeight,
  letterSpacing: ls(opts.letterSpacingPct),
  color: opts.color,
});

/**
 * PC/SP で字間が違うケースが多いので、共通で組み合わせやすいヘルパーも用意
 */
const spLs4: SxProps<Theme> = { letterSpacing: ls(4) };
const pcLs15: SxProps<Theme> = { letterSpacing: ls(15) };

export const typographyPresets = {
  // =========================
  // auth（ログイン等）
  // =========================
  auth: {
    pc: {
      h1: sxText({
        size: { md: 64, xs: 64 }, // pc基準（xs側は使わない運用でもOK）
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      h2: sxText({
        size: { md: 32, xs: 32 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      body1_1: sxText({
        size: { md: 16, xs: 16 },
        weight: fw.semibold,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      body1_2: sxText({
        size: { md: 16, xs: 16 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
    },
    sp: {
      h1: sxText({
        size: { md: 16, xs: 16 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      h2: sxText({
        size: { md: 24, xs: 24 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
    },
  },

  // =========================
  // contact
  // =========================
  contact: {
    pc: {
      h2: sxText({
        size: { md: 40, xs: 40 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      body2: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
    },
    sp: {
      h2: sxText({
        size: { md: 32, xs: 32 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      body2: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
    },
  },

  // contact/confirm
  contactConfirm: {
    pc: {
      h2: sxText({
        size: { md: 40, xs: 40 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      body2: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#424242",
      }),
    },
    sp: {
      h2: sxText({
        size: { md: 32, xs: 32 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      body2: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#424242",
      }),
    },
  },

  // contact/confirm/thanks
  contactThanks: {
    pc: {
      h2: sxText({
        size: { md: 40, xs: 40 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
    },
    sp: {
      h2: sxText({
        size: { md: 32, xs: 32 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhLong, // SPは 1.8 指定 :contentReference[oaicite:7]{index=7}
        letterSpacingPct: 4,
        color: "#212121",
      }),
    },
  },

  // =========================
  // news（一覧）
  // =========================
  news: {
    pc: {
      h2: sxText({
        size: { md: 40, xs: 40 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      h3: sxText({
        size: { md: 20, xs: 20 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      body2: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhLong,
        letterSpacingPct: 15,
        color: "#2F2F2F",
      }),
    },
    sp: {
      h2: sxText({
        size: { md: 32, xs: 32 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      h3: sxText({
        size: { md: 20, xs: 20 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      body2: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhLong,
        letterSpacingPct: 4,
        color: "#2F2F2F",
      }),
    },
  },

  // news/page（詳細）
  newsPage: {
    pc: {
      h2: sxText({
        size: { md: 40, xs: 40 },
        weight: fw.medium, // Mdium :contentReference[oaicite:8]{index=8}
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#303030",
      }),
      body2: sxText({
        size: { md: 16, xs: 16 },
        weight: fw.regular,
        lineHeight: lhLong,
        letterSpacingPct: 15,
        color: "#2F2F2F",
      }),
    },
    sp: {
      h2: sxText({
        size: { md: 20, xs: 20 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#303030",
      }),
      body2: sxText({
        size: { md: 16, xs: 16 },
        weight: fw.regular,
        lineHeight: lhLong,
        letterSpacingPct: 4,
        color: "#2F2F2F",
      }),
    },
  },

  // =========================
  // top/section-1
  // =========================
  topSection1: {
    pc: {
      h1: sxText({
        size: { md: 48, xs: 48 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 24, xs: 24 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#616161",
      }),
    },
    sp: {
      h1: sxText({
        size: { md: 24, xs: 24 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#616161",
      }),
    },
  },

  // =========================
  // top/section-2（背景 04050B）
  // =========================
  topSection2: {
    bg: "#04050B",
    pc: {
      h2: sxText({
        size: { md: 48, xs: 48 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#FAFAFA",
      }),
      h3: sxText({
        size: { md: 20, xs: 20 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#FAFAFA",
      }),
      subtitle: sxText({
        size: { md: 20, xs: 20 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#616161",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#FAFAFA",
      }),
    },
    sp: {
      h2: sxText({
        size: { md: 32, xs: 32 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#FAFAFA",
      }),
      h3: sxText({
        size: { md: 32, xs: 32 }, // 表では SP H3 32px :contentReference[oaicite:9]{index=9}
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#FAFAFA",
      }),
      subtitle: sxText({
        size: { md: 20, xs: 20 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#616161",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhLong, // SP Body-1 は 1.8 指定 :contentReference[oaicite:10]{index=10}
        letterSpacingPct: 4,
        color: "#FAFAFA",
      }),
    },
  },

  // =========================
  // top/section-3
  // =========================
  topSection3: {
    pc: {
      h2: sxText({
        size: { md: 76, xs: 76 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 8,
        color: "#212121",
      }),
      h3: sxText({
        size: { md: 24, xs: 24 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 8,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhLong,
        letterSpacingPct: 15,
        color: "#212121",
      }),
    },
    sp: {
      h2: sxText({
        size: { md: 32, xs: 32 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 8,
        color: "#212121",
      }),
      h3: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 8,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhLong,
        letterSpacingPct: 4,
        color: "#212121",
      }),
    },
  },

  // =========================
  // top/section-4（背景 04050B）
  // ※ 表では背景が04050Bだがテキスト色は #212121 のままになっているので、
  //    「表の値を優先してそのまま」実装しています。:contentReference[oaicite:11]{index=11}
  // =========================
  topSection4: {
    bg: "#04050B",
    pc: {
      h2: sxText({
        size: { md: 76, xs: 76 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 8,
        color: "#FFFFFF",
      }),
      h3: sxText({
        size: { md: 24, xs: 24 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 8,
        color: "#FFFFFF",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhLong,
        letterSpacingPct: 15,
        color: "#FFFFFF",
      }),
    },
    sp: {
      h2: sxText({
        size: { md: 32, xs: 32 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 8,
        color: "#FFFFFF",
      }),
      h3: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.medium,
        lineHeight: lhTight,
        letterSpacingPct: 8,
        color: "#FFFFFF",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhLong,
        letterSpacingPct: 4,
        color: "#FFFFFF",
      }),
    },
  },

  // =========================
  // error
  // =========================
  error: {
    pc: {
      h1: sxText({
        size: { md: 40, xs: 40 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 16, xs: 16 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 15,
        color: "#212121",
      }),
    },
    sp: {
      h1: sxText({
        size: { md: 20, xs: 20 },
        weight: fw.bold,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
      body1: sxText({
        size: { md: 14, xs: 14 },
        weight: fw.regular,
        lineHeight: lhTight,
        letterSpacingPct: 4,
        color: "#212121",
      }),
    },
  },

  // =========================
  // header/footer/link/button/form/badge（UIパーツ）
  // =========================
  uiParts: {
    header: sxText({
      size: { md: 14, xs: 14 },
      weight: fw.light,
      lineHeight: lhTight,
      letterSpacingPct: 15,
      color: "#212121",
    }),
    footer: sxText({
      size: { md: 14, xs: 14 },
      weight: fw.regular,
      lineHeight: lhTight,
      letterSpacingPct: 8,
      color: "#212121",
    }),
    actionLink: sxText({
      size: { md: 14, xs: 14 },
      weight: fw.semibold,
      lineHeight: lhTight,
      letterSpacingPct: 0,
      color: "#212121",
    }),
    buttonText: sxText({
      size: { md: 14, xs: 14 },
      weight: fw.semibold,
      lineHeight: lhTight,
      letterSpacingPct: 0,
      color: "#212121",
    }),
    formLabelPc: sxText({
      size: { md: 14, xs: 14 },
      weight: fw.regular,
      lineHeight: lhTight,
      letterSpacingPct: 15,
      color: "#424242",
    }),
    formLabelSp: sxText({
      size: { md: 14, xs: 14 },
      weight: fw.regular,
      lineHeight: lhTight,
      letterSpacingPct: 4,
      color: "#424242",
    }),
    badge: sxText({
      size: { md: 14, xs: 14 },
      weight: fw.regular,
      lineHeight: lhTight,
      letterSpacingPct: 4,
      color: "#424242",
    }),
  },

  // 汎用：組み合わせ用（必要なら使う）
  helpers: {
    spLs4,
    pcLs15,
  },
} as const;
