"use client";

import * as React from "react";
import { Box, Typography, TypographyProps } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const upFromBottom = keyframes`
  0% { transform: translateY(110%); }
  100% { transform: translateY(0%); }
`;

type Props = {
  text: string;
  once?: boolean;
  threshold?: number;
  durationSec?: number;
  staggerSec?: number;
} & Omit<TypographyProps, "children">;

export default function AnimatedUpText({
  text,
  once = true,
  threshold = 0.2,
  durationSec = 0.15,
  staggerSec = 0.15,
  sx,
  ...typographyProps
}: Props) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [play, setPlay] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setPlay(true);
          if (once) io.unobserve(el);
        } else if (!once) {
          setPlay(false);
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  const chars = React.useMemo(() => Array.from(text), [text]);

  return (
    <Typography
      ref={ref as any}
      aria-label={text}
      {...typographyProps}
      sx={{ display: "inline-block", ...sx }}
    >
      {/* SR対策：中身は隠して、aria-labelで普通に読ませる */}
      <Box component="span" aria-hidden sx={{ display: "inline-block" }}>
        {chars.map((ch, i) => {
          const isSpace = ch === " ";
          return (
            <Box
              key={`${ch}-${i}`}
              component="span"
              sx={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
              }}
            >
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  transform: "translateY(110%)",
                  ...(play && {
                    animation: `${upFromBottom} ${durationSec}s cubic-bezier(0.2, 0.8, 0.2, 1) both`,
                    animationDelay: `${i * staggerSec}s`,
                  }),
                  width: isSpace ? "0.33em" : "auto",
                }}
              >
                {isSpace ? "\u00A0" : ch}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Typography>
  );
}
