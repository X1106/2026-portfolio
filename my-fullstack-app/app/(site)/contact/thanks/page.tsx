// app/(site)/contact/thanks/page.tsx

import Link from "next/link";
import { Box, Container, Paper, Typography } from "@mui/material";
import AppButton from "@/components/ui/AppButton";

export default function ContactThanksPage() {
  return (
    <Box
      sx={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fff",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 0, md: 7 },
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>
            送信完了しました。
          </Typography>

          <Box
            aria-hidden
            sx={{
              mt: 2,
              mb: 3,
              mx: "auto",
              width: { xs: 160, md: 240 },
              height: 2,
              background: "linear-gradient(90deg, #e0c200, #5a50ff)",
            }}
          />

          <Typography sx={{ color: "text.secondary" }}>
            2〜3日以内に折り返しご連絡いたします。
          </Typography>

          <Typography sx={{ mt: 2, color: "text.secondary", mb: 3 }}>
            ※万が一連絡がない場合は、再送または迷惑メールフォルダをご確認ください。
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <AppButton
                variant="contained"
                tone="primary"
                sx={{ width: { xs: "100%", sm: 280 } }}
              >
                トップへ戻る
              </AppButton>
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
