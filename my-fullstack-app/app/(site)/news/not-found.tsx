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

        {/* ✅ 修正ポイント: component={Link} を削除し、LinkでButtonを囲む */}
        <Link href="/news" passHref style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            component="span" // HTML構造を正しく保つために span に変更
            sx={{ width: "fit-content" }}
          >
            一覧に戻る
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
