"use client";
import { Box, Container, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { colors } from "@/theme/colors";
import { typographyPresets } from "@/theme/typography";
import { layoutTheme } from "@/theme/layout";
import AppButton from "@/components/ui/AppButton";
import { auth } from "@/lib/auth";

const AboutSection = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      sx={{
        bgcolor: "#ffff",
        height: "100%",
        backgroundImage: 'url("/images/bg-section3.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1440,
          mx: "auto",
          height: "100svh",
          overflow: "hidden",
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
          {/* 上段（SP） / 左側（PC） */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: { xs: "flex-start", sm: "center" },
              alignItems: "center",
              textAlign: "left",
              minHeight: { xs: "58svh", sm: "auto" },
              pt: { xs: 2, sm: 0 },
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
                    ? typographyPresets.topSection3.pc.h2
                    : typographyPresets.topSection3.sp.h2),
                  mb: { xs: 2, sm: 1 },
                }}
              >
                DESIGN
              </Typography>

              <Typography
                sx={{
                  ...(isPc
                    ? typographyPresets.topSection3.pc.h3
                    : typographyPresets.topSection3.sp.h3),
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
                  alignSelf: "flex-start",
                  mb: { xs: 2, sm: 3 },
                }}
              />

              <Typography
                sx={{
                  ...(isPc
                    ? typographyPresets.topSection3.pc.body1
                    : typographyPresets.topSection3.sp.body1),
                  mb: { xs: 4, sm: 5 },
                }}
              >
                紙媒体デザイン（POP,名刺など）から独学でWEBデザインへ領域を広げ、表現と構造の両面を磨いてきました。近年は広告企業での改善経験を活かし、インタビュー調査やユーザーの行動分析にとりくみ、デザインやUI/UXの改善に取り組んでおります。
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: { xs: "center", sm: "flex-start" },
                }}
              >
                <AppButton
                  tone="secondaryBlack"
                  component="a"
                  href="https://www.figma.com/design/wzsR5gc7lKBqaoxB1aUkML/Untitled?node-id=0-1&t=lYliMifxSHnwcPRD-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mb: 2 }}
                >
                  Figmaを確認する
                </AppButton>
                <Link
                  component={NextLink}
                  href="https://www.notion.so/Notion-2fd05a8f2b5280e7aaf7c7981d76a36b?source=copy_link"
                  target="_blank"
                  underline="none"
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
                  スタイルガイドはこちら
                </Link>
              </Box>
            </Box>
          </Box>

          {/* 下段（SP） / 右側（PC） */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: { xs: "normal", sm: "center" },
              justifyContent: { xs: "center", sm: "normal" },
              minHeight: { xs: "42svh", sm: "auto" },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
              <Image
                src="/images/img-section3.svg"
                alt="icon1"
                width={480}
                height={480}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutSection;
