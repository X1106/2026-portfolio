import {
  Container,
  Typography,
  Stack,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import AppButton from "@/components/ui/AppButton";
import Link from "next/link";
type Props = {
  article: {
    title: string;
    body: string; // HTML
    publishedAt?: string;
    category?: string;
  };
};

function formatDateJa(iso?: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export default function NewsArticle({ article }: Props) {
  if (!article) return null;

  const dateText = formatDateJa(article.publishedAt);

  return (
    <Stack spacing={2}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "1.6rem", md: "2.125rem" }, // ← SPを小さく
        }}
      >
        {article.title}
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ flexWrap: "wrap" }}
      >
        {dateText && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {dateText}
          </Typography>
        )}
        {article.category && <Chip size="small" label={article.category} />}
      </Stack>

      <Divider />

      <Box
        sx={{
          "& h1": { fontSize: "1.8rem", fontWeight: 800, mt: 3 },
          "& h2": { fontSize: "1.5rem", fontWeight: 800, mt: 3 },
          "& h3": { fontSize: "1.25rem", fontWeight: 800, mt: 2.5 },
          "& p": { lineHeight: 1.9, mt: 1.5, fontSize: "1rem" },
          "& ul, & ol": { pl: 3, mt: 1.5 },
          "& li": { mt: 0.5, lineHeight: 1.9 },
          "& a": { textDecoration: "underline" },
          "& img": {
            maxWidth: "100%",
            height: "auto",
            borderRadius: 2,
            pt: 3,
          },
          "& pre": {
            overflowX: "auto",
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(0,0,0,0.04)",
          },
        }}
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 5,
        }}
      >
        <Link href="/news" style={{ textDecoration: "none" }}>
          <AppButton tone="primary">記事一覧に戻る</AppButton>
        </Link>
      </Box>
    </Stack>
  );
}
