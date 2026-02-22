// app/(site)/news/[slug]/page.tsx
import { notFound } from "next/navigation";
import { client as microcmsClient } from "@/lib/microcms/client";
import NewsArticle from "../_components/NewsArticle";
import { Box, Container } from "@mui/material";

type MicroCMSCategory = { id: string; name?: string } | null;

type MicroCMSArticle = {
  id: string;
  title: string;
  content?: string;
  publishedAt?: string;
  category?: MicroCMSCategory;
};

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const data = await microcmsClient.getListDetail<MicroCMSArticle>({
      endpoint: "article",
      contentId: slug,
      queries: {
        fields: "id,title,content,publishedAt,category.name",
      },
    });

    if (!data?.id) return notFound();

    return (
      <Container
        sx={{
          bgcolor: "#fff",
          py: { xs: 15, md: 20 },
          px: { xs: 2.5, md: 0 },
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            px: { xs: 2.5, md: 10 },
            py: { xs: 8, md: 10 },
            maxWidth: 900,
            mx: "auto",
          }}
        >
          <NewsArticle
            article={{
              title: data.title,
              body: data.content ?? "",
              publishedAt: data.publishedAt,
              category: data.category?.name ?? "",
            }}
          />
        </Box>
      </Container>
    );
  } catch {
    return notFound();
  }
}
