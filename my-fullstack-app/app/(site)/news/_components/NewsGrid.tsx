// app/(site)/news/_components/NewsGrid.tsx
"use client";

import Link from "next/link";
import { Box, Paper, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type Item = {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  category?: string;
};

type Props = {
  items: Item[];
};

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function normalizeExcerpt(text?: string, max = 70) {
  const src = (text ?? "").replace(/\s+/g, " ").trim();
  if (!src) return "";
  if (src.length <= max) return src;
  return `${src.slice(0, max)}…`;
}

function getThumbByCategory(category?: string) {
  const c = (category ?? "").trim().toLowerCase();

  if (
    c === "news" ||
    c === "notice" ||
    c === "information" ||
    c === "お知らせ"
  ) {
    return { src: "/images/news.svg", alt: "お知らせ" };
  }
  if (c === "blog" || c === "ブログ") {
    return { src: "/images/blog.svg", alt: "ブログ" };
  }
  return null;
}

export default function NewsGrid({ items }: Props) {
  const theme = useTheme();
  // ✅ SP判定：md未満をSP扱い（必要なら down("sm") に変更OK）
  const isSp = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%" }}>
      {items.map((item) => {
        const date = formatDate(item.publishedAt);
        // ✅ SPは40文字、md以上は70文字
        const excerpt = normalizeExcerpt(item.excerpt, isSp ? 40 : 70);
        const thumb = getThumbByCategory(item.category);

        return (
          <Paper
            key={item.slug}
            elevation={2}
            sx={{
              mb: 1,
              bgcolor: "#fff",
              p: { xs: 2, md: "20px" },
              minHeight: { xs: 150, md: 170 },
              transition: "all .2s ease",
              "&:hover": {
                transform: { md: "translateY(-2px)" },
                bgcolor: { md: "rgba(0,0,0,0.03)" },
              },
            }}
          >
            <Link
              href={`/news/${item.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 0, md: 3 },
                  alignItems: "flex-start",
                }}
              >
                {/* ✅ サムネ：SPでは消す（md以上で表示） */}
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    width: 260,
                    height: 160,
                    bgcolor: "#D9D9D9",
                    flexShrink: 0,
                    overflow: "hidden",
                    borderRadius: 1,
                  }}
                >
                  {thumb ? (
                    <Box
                      component="img"
                      src={thumb.src}
                      alt={thumb.alt}
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                      }}
                      onError={() => {
                        console.error("thumbnail load failed:", thumb.src);
                      }}
                    />
                  ) : null}
                </Box>

                {/* ✅ 右コンテンツ（SPは縦積み＋下に矢印） */}
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 16, md: 20 },
                      fontWeight: 500,
                      letterSpacing: 1.5,
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 3, mb: 1.5 }}>
                    {date && (
                      <Typography
                        sx={{ fontSize: 12, color: "text.secondary" }}
                      >
                        {date}
                      </Typography>
                    )}

                    {item.category && (
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "text.secondary",
                          textTransform: "lowercase",
                        }}
                      >
                        {item.category}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      mb: 1,
                      height: 2,
                      width: 50,
                      maxWidth: "80%",
                      borderRadius: 999,
                      background:
                        "linear-gradient(90deg, #f1c21b 0%, #5b2eff 100%)",
                    }}
                  />

                  {excerpt && (
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "text.secondary",
                        lineHeight: 1.8,
                      }}
                    >
                      {excerpt}
                    </Typography>
                  )}

                  {/* ✅ SP：矢印を下（右下）へ */}
                  <Box
                    sx={{
                      mt: "auto",
                      pt: 1,
                      display: { xs: "flex", md: "none" },
                      justifyContent: "flex-end",
                      alignItems: "center",
                      color: "rgba(0,0,0,0.6)",
                    }}
                  >
                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                  </Box>
                </Box>

                {/* ✅ md以上：右矢印（現状維持） */}
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignSelf: "center",
                    color: "rgba(0,0,0,0.6)",
                    flexShrink: 0,
                  }}
                >
                  <ChevronRightIcon sx={{ fontSize: 20 }} />
                </Box>
              </Box>
            </Link>
          </Paper>
        );
      })}
    </Box>
  );
}
