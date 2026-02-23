// app/(auth)/login/page.tsx
"use client";

import { Box, Container, Typography, Paper, Stack } from "@mui/material";
import LoginForm from "@/features/auth/components/LoginForm";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { typographyPresets } from "@/theme/typography";

export default function LoginPage() {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      component="main"
      sx={{
        height: "100dvh",
        maxHeight: "100dvh",
        overflow: "hidden",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundImage: {
          xs: "none",
          md: 'url("/images/auth-background.svg")',
        },
        backgroundRepeat: "no-repeat",
        backgroundPosition: { xs: "top center", md: "center" },
        backgroundSize: { xs: "160% auto", md: "30% auto" },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2.5, md: 6 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.15fr 1fr" },
            gap: { xs: 2.5, md: 0 },
            alignItems: "center",
          }}
        >
          {/* PCのみ：左ビジュアル（SPは上バナーに寄せる） :contentReference[oaicite:3]{index=3} */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              position: "relative",
              minHeight: 540,
              alignItems: "center",
              overflow: "hidden",
              borderRadius: 4,
            }}
          >
            <Box sx={{ px: 4, py: 4 }}>
              <Typography
                sx={{
                  ...(isPc
                    ? typographyPresets.auth.pc.h1
                    : typographyPresets.auth.sp.h1),
                  mb: { xs: 2, sm: 2 },
                }}
              >
                PORTFOLIO
              </Typography>

              <Typography
                sx={{
                  ...(isPc
                    ? typographyPresets.auth.pc.body1_1
                    : typographyPresets.auth.sp.body1),
                  mb: 0,
                }}
              >
                ログインIDとパスはこちらをご利用ください。
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    ...(isPc
                      ? typographyPresets.auth.pc.body1_1
                      : typographyPresets.auth.sp.body1),
                    mb: 1,
                  }}
                >
                  Username : test
                </Typography>
                <Typography
                  sx={{
                    ...(isPc
                      ? typographyPresets.auth.pc.body1_1
                      : typographyPresets.auth.sp.body1),
                    mb: 0,
                  }}
                >
                  Password : 00000
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* 右カラム */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            <Stack sx={{ width: "100%", maxWidth: 520 }} spacing={2}>
              {/* SPのみ：上バナー（角丸・薄グレー） :contentReference[oaicite:4]{index=4} */}
              <Paper
                elevation={0}
                sx={{
                  display: { xs: "block", md: "none" },
                  borderRadius: 2,
                  p: 2,
                  bgcolor: "#F4F4F4",
                }}
              >
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 900, letterSpacing: "0.06em" }}>
                    PORTFOLIO
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    ログインIDとパスはこちらをご利用ください。
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                    Username : <b>test</b>　Password : <b>00000</b>
                  </Typography>
                </Stack>
              </Paper>

              {/* ログインカード（影・角丸をデザイン寄せ） :contentReference[oaicite:5]{index=5} */}
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  borderRadius: 0.5,
                  px: { xs: 3, md: 10 },
                  py: { xs: 3, md: 6 },
                  bgcolor: "#fff",

                  // ふわっとした影（Paper elevation よりデザインに近い）
                  boxShadow:
                    "0 18px 50px rgba(0,0,0,0.12), 0 2px 10px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                {/* 見出しは中央寄せ（SPデザイン寄り） :contentReference[oaicite:6]{index=6} */}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    mb: 4,
                    textAlign: { xs: "center", md: "center" },
                  }}
                >
                  ログイン
                </Typography>

                <LoginForm />
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
