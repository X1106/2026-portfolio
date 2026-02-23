"use client";

import Link from "next/link";
import { Container, Typography, Button, Stack } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={2}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          エラーが発生しました
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          一時的な問題の可能性があります。再試行してください。
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={reset}>
            もう一度試す
          </Button>

          {/* ✅ 修正ポイント: component={Link} を使わず、LinkでButtonを囲む */}
          <Link href="/news" passHref style={{ textDecoration: "none" }}>
            <Button variant="outlined" component="span">
              一覧へ
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
