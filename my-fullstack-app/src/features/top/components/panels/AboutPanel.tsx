"use client";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { colors } from "@/theme/colors";
import { typographyPresets } from "@/theme/typography";
import { layoutTheme } from "@/theme/layout";
import AppButton from "@/components/ui/AppButton";
const MuiLayoutSample = () => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        height: "100%",
        zIndex: 0,
        bgcolor: colors.background.dark,

        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          opacity: { xs: "0.2", sm: "0.4" },
          backgroundImage: 'url("/images/bg-img.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
          backgroundSize: "cover",
          pointerEvents: "none",
          zIndex: -1,

          "@media (min-width:600px)": {
            width: "48%",
          },
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1440,
          mx: "auto",
          position: "relative",
          height: "100svh",
          overflow: "hidden",
          px: { xs: 2.5, sm: 0 },
        }}
      >
        <Box
          component="section"
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "floralwhite",
            width: { xs: "100%", sm: "46%" },
            pl: "5%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography
              sx={{
                ...(isPc
                  ? typographyPresets.topSection2.pc.h3
                  : typographyPresets.topSection2.sp.h3),
                mb: { xs: 1, sm: 1 },
              }}
            >
              ABOUT 2025
            </Typography>
            <Typography
              sx={{
                ...(isPc
                  ? typographyPresets.topSection2.pc.h2
                  : typographyPresets.topSection2.sp.h2),
                mb: { xs: 1, sm: 1 },
              }}
            >
              KOTARO TAKANO
            </Typography>
            <Typography
              sx={{
                ...(isPc
                  ? typographyPresets.topSection2.pc.subtitle
                  : typographyPresets.topSection2.sp.subtitle),
                mb: { xs: 2, sm: 5 },
              }}
            >
              Front-End Engineer / UX Designer
            </Typography>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography
              sx={{
                ...(isPc
                  ? typographyPresets.topSection2.pc.body1
                  : typographyPresets.topSection2.sp.body1),
                mb: { xs: 5, sm: 5 },
              }}
            >
              2010年、紙媒体のデザインサポートを機にWebの世界へ。統計解析に基づく論理的設計を強みに、デザイナー兼エンジニアとしてキャリアを築いてきました。
              現在は、UX/DX推進やWebシステム構築に従事。クリエイティブと技術を融合させた柔軟なアプローチで、ユーザー体験の最適化に貢献しています。プロジェクト詳細や設計書は、下のボタンよりNotionにてご覧いただけます。
            </Typography>

            <AppButton
              tone="secondaryWhite"
              component="a"
              href="https://www.notion.so/Notion-2fd05a8f2b5280e7aaf7c7981d76a36b?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              プロジェクトを確認する
            </AppButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MuiLayoutSample;
