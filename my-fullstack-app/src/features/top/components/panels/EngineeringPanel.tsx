"use client";

import { Box, Container, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppButton from "@/components/ui/AppButton";
import { colors } from "@/theme/colors";
import { typographyPresets } from "@/theme/typography";

const IconPixelBackground = dynamic(() => import("../p5/IconpixelBackground"), {
  ssr: false,
});

const EngineeringSection = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ bgcolor: colors.background.dark, minHeight: "100svh", px: 0 }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1440,
          mx: "auto",
          minHeight: "100svh",
          p: { xs: 2.5, sm: 0 },
        }}
      >
        <Box
          component="section"
          sx={{
            minHeight: "100svh",
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
          }}
        >
          {/* 左側 */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: { xs: "flex-start", sm: "center" },
              alignItems: "center",
              p: { xs: 0, sm: 0 },
              pt: { xs: 2, sm: 0 },
              textAlign: "left",
              gap: 1,
              minHeight: { xs: "58svh", sm: "auto" },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "64%" },
              }}
            >
              <Typography
                sx={{
                  ...(isPc
                    ? typographyPresets.topSection4.pc.h2
                    : typographyPresets.topSection4.sp.h2),
                  mb: { xs: 2, sm: 1 },
                }}
              >
                ENGINEER
              </Typography>

              <Typography
                sx={{
                  ...(isPc
                    ? typographyPresets.topSection4.pc.h3
                    : typographyPresets.topSection4.sp.h3),
                  mb: { xs: 2, sm: 2 },
                }}
              >
                From 2021 to 2025
              </Typography>

              <Box
                aria-hidden
                sx={{
                  mt: 1,
                  width: { xs: 180, md: 280 },
                  height: 2,
                  background: "linear-gradient(90deg, #e0c200, #5a50ff)",
                  mb: { xs: 2, sm: 3 },
                }}
              />

              <Typography
                sx={{
                  ...(isPc
                    ? typographyPresets.topSection4.pc.body1
                    : typographyPresets.topSection4.sp.body1),
                  mb: { xs: 4, sm: 5 },
                }}
              >
                フロントエンド（HTML/CSS/JS）を基盤に、DX・UX・生成AIに対応すべくフルスタック設計へ拡張。モダンWeb開発の品質を支えるテストやセキュリティ、AWS中心のインフラ知識を強化し、継続的にスキルを磨いています。（言語：TypeScript、Python）
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: { xs: "center", sm: "flex-start" },
                  mb: { xs: 2, sm: 2 },
                }}
              >
                <AppButton
                  tone="secondaryWhite"
                  component="a"
                  href="https://github.com/X1106/2026-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mb: 2 }}
                >
                  Gitを確認する
                </AppButton>
                <Link
                  component={NextLink}
                  href="https://www.notion.so/Notion-2fd05a8f2b5280e7aaf7c7981d76a36b?source=copy_link"
                  underline="none"
                  target="_blank"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    color: colors.text.link,
                    fontWeight: 600,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  <Box
                    component="img"
                    src="/icons/link.svg"
                    alt=""
                    aria-hidden="true"
                    sx={{ width: 18, height: 18 }}
                  />
                  構成図はこちらから
                </Link>
              </Box>
            </Box>
          </Box>

          {/* 右側：p5 正方形（前面テキストなし） */}
          <Box
            sx={{
              flex: 1,
              display: "flex",

              justifyContent: { xs: "center", md: "center" },

              alignItems: "center",

              p: { xs: 0, sm: 0 },
              boxSizing: "border-box",
              minHeight: { xs: "42svh", sm: "auto" },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: "min(80vw, 260px)", sm: 360 },
                aspectRatio: "1 / 1",
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: 6,
              }}
            >
              <IconPixelBackground />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EngineeringSection;
