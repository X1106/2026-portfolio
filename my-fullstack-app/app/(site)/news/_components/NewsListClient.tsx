// app/(site)/news/_components/NewsListClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NewsHero from "./NewsHero";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Stack,
  Container,
} from "@mui/material";
import NewsGrid from "./NewsGrid";
import NewsPagination from "./NewsPagination";

type Category = "all" | "notice" | "blog";

type NewsItem = {
  id: string;
  title: string;
  publishedAt?: string;
  category?: any;
  categories?: any;
  categoryName?: string;
  excerpt?: string;
};

type ApiResponse = {
  items: NewsItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  category: string;
};

function normalizeCategory(v: string | null): Category {
  if (v === "notice" || v === "blog" || v === "all") return v;
  return "all";
}

function normalizePage(v: string | null): number {
  const n = Number(v ?? "1");
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}

function getCategoryKeys(cat: any): string[] {
  const keys: string[] = [];
  const push = (v: any) => {
    if (typeof v === "string" && v.trim()) keys.push(v.trim().toLowerCase());
  };

  if (Array.isArray(cat)) {
    cat.forEach((c) => keys.push(...getCategoryKeys(c)));
    return Array.from(new Set(keys));
  }

  push(cat);

  if (cat && typeof cat === "object") {
    push(cat.id);
    push(cat.value);
    push(cat.key);
    push(cat.slug);
    push(cat.name);
    push(cat.label);
  }

  return Array.from(new Set(keys));
}

async function fetchNewsAll() {
  const params = new URLSearchParams();
  params.set("page", "1");
  params.set("limit", "100");
  params.set("category", "all");

  const res = await fetch(`/api/news?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Failed to fetch news: ${res.status}\n${body}`);
  }

  return (await res.json()) as ApiResponse;
}

export default function NewsListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = useMemo(
    () => normalizeCategory(searchParams.get("category")),
    [searchParams]
  );
  const urlPage = useMemo(
    () => normalizePage(searchParams.get("page")),
    [searchParams]
  );

  const [category, setCategory] = useState<Category>(urlCategory);
  const [page, setPage] = useState<number>(urlPage);

  const [allItems, setAllItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const VIEW_LIMIT = 6;

  useEffect(() => {
    setCategory(urlCategory);
    setPage(urlPage);
  }, [urlCategory, urlPage]);

  const setQuery = (next: { category?: Category; page?: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next.category) params.set("category", next.category);
    if (typeof next.page === "number") params.set("page", String(next.page));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const onChangeCategory = (value: Category) => {
    setCategory(value);
    setPage(1);
    setQuery({ category: value, page: 1 });
  };

  const onChangePage = (nextPage: number) => {
    setPage(nextPage);
    setQuery({ page: nextPage });
  };

  const loadAll = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await fetchNewsAll();
      setAllItems(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      console.error(e);
      setAllItems([]);
      setErrorMsg("記事の取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (category === "all") return allItems;

    return allItems.filter((x) => {
      const keys = [
        ...getCategoryKeys((x as any).category),
        ...getCategoryKeys((x as any).categories),
        ...getCategoryKeys((x as any).categoryName),
      ];

      const isNews = keys.some((k) =>
        ["news", "notice", "information", "お知らせ"].some((w) => k.includes(w))
      );
      const isBlog = keys.some((k) =>
        ["blog", "ブログ"].some((w) => k.includes(w))
      );

      if (category === "notice") return isNews;
      if (category === "blog") return isBlog;
      return true;
    });
  }, [allItems, category]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / VIEW_LIMIT));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (page !== safePage) setPage(safePage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safePage]);

  const items = useMemo(() => {
    const start = (safePage - 1) * VIEW_LIMIT;
    return filtered.slice(start, start + VIEW_LIMIT);
  }, [filtered, safePage]);

  return (
    <Box sx={{ bgcolor: "#fff" }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2.5, sm: 4, md: 0 },
          py: { xs: 15, sm: 20 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 6 },
            alignItems: "flex-start",
          }}
        >
          {/* =========================
              Left: list
          ========================= */}
          <Box component="section" sx={{ width: { xs: "100%", md: "68%" } }}>
            {/* ✅ タイトル/リード（NewsHero）と フィルターを横並び */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "stretch", md: "flex-end" },
                justifyContent: "space-between",
                gap: { xs: 2, md: 3 },
                mb: 7,
              }}
            >
              {/* 左：タイトル・リード */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <NewsHero />
              </Box>

              {/* 右：フィルター */}
              <Box
                sx={{
                  width: { xs: "60%", md: 220 },
                  ml: { xs: "auto", md: 0 },
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-end" },
                }}
              >
                <FormControl size="small" sx={{ width: "100%" }}>
                  <Select
                    value={category}
                    onChange={(e) =>
                      onChangeCategory(e.target.value as Category)
                    }
                    displayEmpty
                  >
                    <MenuItem value="all">すべて</MenuItem>
                    <MenuItem value="notice">お知らせ</MenuItem>
                    <MenuItem value="blog">ブログ</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Typography sx={{ mt: 1, color: "text.secondary", fontSize: 13 }}>
              {loading
                ? "読み込み中…"
                : `全${total}件 / ${safePage} / ${totalPages}ページ`}
            </Typography>

            <Paper
              elevation={0}
              sx={{
                mt: { xs: 2, md: 3 },
                p: { xs: 0, md: 0 },
                bgcolor: "transparent",
              }}
            >
              {/* ✅ ここから下はそのまま（フィルターBoxは上に移動済み） */}
              {errorMsg ? (
                <Stack spacing={2} sx={{ py: 2 }}>
                  <Typography sx={{ color: "error.main" }}>
                    {errorMsg}
                  </Typography>
                  <Button variant="contained" onClick={loadAll}>
                    再読み込み
                  </Button>
                </Stack>
              ) : (
                <>
                  <NewsGrid
                    items={items.map((x) => {
                      const keys = [
                        ...getCategoryKeys((x as any).category),
                        ...getCategoryKeys((x as any).categories),
                        ...getCategoryKeys((x as any).categoryName),
                      ];

                      const isNews = keys.some((k) =>
                        ["news", "notice", "information", "お知らせ"].some(
                          (w) => k.includes(w)
                        )
                      );
                      const isBlog = keys.some((k) =>
                        ["blog", "ブログ"].some((w) => k.includes(w))
                      );

                      return {
                        slug: x.id,
                        title: x.title,
                        excerpt: x.excerpt,
                        publishedAt: x.publishedAt,
                        category: isNews ? "news" : isBlog ? "blog" : "",
                      };
                    })}
                  />

                  <Box
                    sx={{
                      mt: { xs: 5, md: 8 },
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <NewsPagination
                      page={safePage}
                      count={totalPages}
                      onChange={onChangePage}
                    />
                  </Box>
                </>
              )}
            </Paper>
          </Box>

          {/* =========================
              Right: sidebar（PCのみ表示）
          ========================= */}
          <Box
            component="aside"
            sx={{
              width: { md: "32%" },
              display: { xs: "none", md: "block" },
              px: 2,
            }}
          >
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: 1,
                overflow: "hidden",
                bgcolor: "#BDBDBD",
              }}
            >
              <Box
                component="img"
                src="/images/sidebar.svg"
                alt="サイドバー画像"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box
              sx={{
                mt: 3,
                width: "100%",
                borderRadius: 1,
                border: "1px solid rgba(0,0,0,0.18)",
                bgcolor: "transparent",
                p: 2,
                Height: "auto",
                fontSize: 14,
                lineHeight: 1.9,
                color: "text.secondary",
              }}
            >
              こちらは、ポートフォリオ用の参考ページになります。
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
