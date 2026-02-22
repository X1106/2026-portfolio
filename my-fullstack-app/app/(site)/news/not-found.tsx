import Link from "next/link";
import { Container, Typography, Button, Stack } from "@mui/material";

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={2}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          ページが見つかりません
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          URLが間違っているか、記事が削除された可能性があります。
        </Typography>

        <Button
          component={Link}
          href="/news"
          variant="contained"
          sx={{ width: "fit-content" }}
        >
          一覧に戻る
        </Button>
      </Stack>
    </Container>
  );
}
