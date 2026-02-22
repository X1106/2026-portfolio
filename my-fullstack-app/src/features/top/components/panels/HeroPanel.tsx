"use client";

import { Box, Container, Typography } from "@mui/material";
import dynamic from "next/dynamic";

import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { colors } from "@/theme/colors";
import { typographyPresets } from "@/theme/typography";
import { layoutTheme } from "@/theme/layout";
import AnimatedUpText from "@/components/ui/AnimatedUpText";

const HeroBackground = dynamic(() => import("../p5/HeroBackground"), {
  ssr: false,
});

const HeroSection = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      className="bg-1"
      sx={{
        position: "relative",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* ===== 背景（p5.js） ===== */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none", // ← UI操作を邪魔しない
          "& canvas": {
            display: "block",
          },
        }}
      >
        <HeroBackground />
      </Box>

      {/* ===== 前面コンテンツ ===== */}
      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          zIndex: 1, // ← 背景より前
          maxWidth: 1440,
          mx: "auto",
          height: "100svh", // 画面高に固定
          overflow: "hidden",
          px: { xs: 0, sm: 0 },
        }}
      >
        <Box
          component="section"
          sx={{
            minHeight: "100svh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "floralwhite",
          }}
        >
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <AnimatedUpText
              text="PORTFOLIO REPORT"
              once
              threshold={0.2}
              durationSec={0.55}
              staggerSec={0.04}
              sx={{
                ...(isPc
                  ? typographyPresets.topSection1.pc.h1
                  : typographyPresets.topSection1.sp.h1),
                mb: 3,
              }}
            />

            <Typography
              sx={
                isPc
                  ? typographyPresets.topSection1.pc.body1
                  : typographyPresets.topSection1.sp.body1
              }
            >
              UX Design × Front-End
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
