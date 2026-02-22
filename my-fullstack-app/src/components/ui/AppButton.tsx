"use client";

import * as React from "react";
import NextLink from "next/link";
import { Button, ButtonProps } from "@mui/material";
import { colors } from "@/theme/colors";

type AppButtonTone =
  | "primary"
  | "secondaryWhite"
  | "secondaryBlack"
  | "tertiary";

type Props = ButtonProps & {
  tone?: AppButtonTone;
  href?: string;
};

const toneSx = (tone: AppButtonTone) => {
  switch (tone) {
    // primary：黒塗り
    case "primary":
      return {
        backgroundColor: colors.button.primary.bg, // #212121
        color: colors.button.primary.text, // #FFFFFF
        border: `1px solid ${colors.button.primary.border}`, // transparent
        "&:hover": {
          backgroundColor: colors.button.primary.bg,
          filter: "brightness(0.9)",
          transform: "translateY(-1px)",
        },
      };

    // ✅ secondaryWhite：背景透明、枠&文字が白
    case "secondaryWhite":
      return {
        backgroundColor: "transparent",
        color: colors.text.onDark, // #FAFAFA
        border: `1px solid ${colors.text.onDark}`, // 白枠
        "&:hover": {
          backgroundColor: "rgba(250,250,250,0.10)", // うっすら白面
          transform: "translateY(-1px)",
        },
      };

    // ✅ secondaryBlack：背景透明、枠&文字が黒
    case "secondaryBlack":
      return {
        backgroundColor: "transparent",
        color: colors.text.primary, // #212121
        border: `1px solid ${colors.text.primary}`, // 黒枠
        "&:hover": {
          backgroundColor: "rgba(33,33,33,0.06)", // うっすら黒面
          transform: "translateY(-1px)",
        },
      };

    // tertiary：disabled風（グレー枠）
    case "tertiary":
      return {
        backgroundColor: "transparent",
        color: colors.button.disabled.text, // #BDBDBD
        border: `1px solid ${colors.button.disabled.border}`, // #BDBDBD
        "&:hover": {
          backgroundColor: "transparent",
          transform: "none",
        },
      };
  }
};

export default function AppButton({
  tone = "primary",
  href,
  disabled,
  sx,
  children,
  ...props
}: Props) {
  const isTrulyDisabled = disabled || tone === "tertiary";

  return (
    <Button
      component={href ? NextLink : "button"}
      href={href}
      disabled={isTrulyDisabled}
      sx={[
        {
          // ✅ 共通スタイル
          width: 246, // 全ボタン固定
          textTransform: "none",
          borderRadius: 1,
          px: 3,
          py: 1.5,
          minHeight: 48,
          fontWeight: 600,
          boxShadow: "none",
          lineHeight: 1.2,

          // ✅ hover/active を滑らかに
          transition:
            "transform 160ms ease, filter 160ms ease, background-color 160ms ease",

          "&:active": {
            transform: "translateY(0px)",
            filter: "brightness(0.96)",
          },

          // フォーカス可視化（アクセシビリティ）
          "&:focus-visible": {
            outline: "2px solid rgba(0,0,0,0.55)",
            outlineOffset: 2,
          },

          // ✅ disabled の見た目を統一
          "&.Mui-disabled": {
            opacity: 1,
            cursor: "not-allowed",
            pointerEvents: "none",
            backgroundColor: "transparent",
            color: colors.button.disabled.text,
            border: `1px solid ${colors.button.disabled.border}`,
            transform: "none",
            filter: "none",
          },
        },
        toneSx(tone),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Button>
  );
}
