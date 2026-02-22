// app/(site)/news/_components/NewsCard.tsx
import Link from "next/link";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Chip,
  Box,
} from "@mui/material";

type Item = {
  slug: string;
  title: string;
  publishedAt?: string;
  excerpt?: string;
  category?: string;
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

// ✅ 一覧から渡ってくる "news" / "blog" を基準に判定
function getCategoryThumb(category?: string) {
  const c = (category ?? "").trim().toLowerCase();

  if (
    c === "news" ||
    c === "notice" ||
    c === "information" ||
    c === "お知らせ"
  ) {
    return { src: "/images/news.svg", label: "お知らせ" };
  }
  if (c === "blog" || c === "ブログ") {
    return { src: "/images/Blog.svg", label: "ブログ" };
  }
  return null;
}
export default function NewsCard({ item }: { item: Item }) {
  if (!item?.slug) return null;

  const thumb = getCategoryThumb(item.category);

  return (
    <Card variant="outlined">
      {/* 修正ポイント：CardActionAreaの外側をLinkで囲み、component={Link}を削除します */}
      <Link
        href={`/news/${item.slug}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardActionArea>
          {/* ✅ サムネイル部分 */}
          {thumb && (
            <Box
              sx={{
                width: "100%",
                height: 160,
                bgcolor: "#f4f4f4",
                display: "grid",
                placeItems: "center",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Box
                component="img"
                src={thumb.src}
                alt={thumb.label}
                sx={{ width: 96, height: 96 }}
              />
            </Box>
          )}

          <CardContent>
            {/* ...（中身は変更なし）... */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 0.5, flexWrap: "wrap" }}
            >
              <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
                {formatDateJa(item.publishedAt)}
              </Typography>
              <Chip size="small" label={thumb?.label ?? item.category ?? ""} />
            </Stack>

            <Typography variant="h6" sx={{ mb: 1 }}>
              {item.title}
            </Typography>

            {!!item.excerpt && (
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {item.excerpt}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
