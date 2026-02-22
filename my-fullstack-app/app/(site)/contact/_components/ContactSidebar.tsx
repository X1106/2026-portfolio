// app/(site)/contact/_components/ContactSidebar.tsx
import { Box, Paper, Typography } from "@mui/material";

type Props = {
  stickyTop?: number;
};

export default function ContactSidebar({ stickyTop = 96 }: Props) {
  const imageBoxSx = {
    bgcolor: "#111",
    display: "grid",
    placeItems: "center",
    color: "#fff",
    fontWeight: 900,
    fontSize: 28,
  } as const;

  return (
    <Box
      component="aside"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2.5, md: 3 },
        position: { md: "sticky" },
        top: { md: stickyTop },
        alignSelf: "flex-start",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ ...imageBoxSx, aspectRatio: "16 / 10" }}>画像</Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ ...imageBoxSx, aspectRatio: "16 / 10" }}>画像</Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid rgba(0,0,0,0.08)",
          p: { xs: 2, md: 3 },
          bgcolor: "#fff",
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: 14, mb: 1 }}>
          お問い合わせの目安
        </Typography>
        <Typography
          sx={{ fontSize: 12.5, color: "text.secondary", lineHeight: 1.9 }}
        >
          2〜3営業日以内にご返信します。内容によってはお時間をいただく場合があります。
        </Typography>
      </Paper>
    </Box>
  );
}
