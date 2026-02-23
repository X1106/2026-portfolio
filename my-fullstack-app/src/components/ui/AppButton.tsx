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
    case "primary":
      return {
        backgroundColor: colors.button.primary.bg,
        color: colors.button.primary.text,
        border: `1px solid ${colors.button.primary.border}`,
        "&:hover": {
          backgroundColor: colors.button.primary.bg,
          filter: "brightness(0.9)",
          transform: "translateY(-1px)",
        },
      };

    case "secondaryWhite":
      return {
        backgroundColor: "transparent",
        color: colors.text.onDark,
        border: `1px solid ${colors.text.onDark}`,
        "&:hover": {
          backgroundColor: "rgba(250,250,250,0.10)",
          transform: "translateY(-1px)",
        },
      };

    case "secondaryBlack":
      return {
        backgroundColor: "transparent",
        color: colors.text.primary,
        border: `1px solid ${colors.text.primary}`,
        "&:hover": {
          backgroundColor: "rgba(33,33,33,0.06)",
          transform: "translateY(-1px)",
        },
      };

    case "tertiary":
      return {
        backgroundColor: "transparent",
        color: colors.button.disabled.text,
        border: `1px solid ${colors.button.disabled.border}`,
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
          width: 246,
          textTransform: "none",
          borderRadius: 1,
          px: 3,
          py: 1.5,
          minHeight: 48,
          fontWeight: 600,
          boxShadow: "none",
          lineHeight: 1.2,

          transition:
            "transform 160ms ease, filter 160ms ease, background-color 160ms ease",

          "&:active": {
            transform: "translateY(0px)",
            filter: "brightness(0.96)",
          },

          "&:focus-visible": {
            outline: "2px solid rgba(0,0,0,0.55)",
            outlineOffset: 2,
          },

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
