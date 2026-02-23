// app/api/news/route.ts
import { NextResponse } from "next/server";
import { client as microcmsClient } from "@/lib/microcms/client";
import { makeExcerptFromHtml } from "@/features/news/utils/excerpt";

type CategoryKey = "all" | "notice" | "blog";

type MicroCMSCategory =
  | string
  | { id: string; name?: string }
  | null
  | undefined;

type MicroCMSArticle = {
  id: string;
  title?: string;
  content?: string;
  publishedAt?: string;
  category?: MicroCMSCategory;
};

const CATEGORY_ID = {
  notice: process.env.MICROCMS_CATEGORY_NOTICE_ID,
  blog: process.env.MICROCMS_CATEGORY_BLOG_ID,
} as const;

function clampInt(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function parseCategory(v: string | null): CategoryKey {
  if (v === "notice" || v === "blog" || v === "all") return v;
  return "all";
}

function getCatMeta(cat: MicroCMSCategory): { id?: string; name: string } {
  if (!cat) return { name: "" };
  if (typeof cat === "string") return { name: cat };
  return { id: cat.id, name: cat.name ?? "" };
}

function categoryKeyById(id?: string): CategoryKey {
  if (!id) return "all";
  if (CATEGORY_ID.notice && id === CATEGORY_ID.notice) return "notice";
  if (CATEGORY_ID.blog && id === CATEGORY_ID.blog) return "blog";
  return "all";
}

async function fetchList(args: {
  limit: number;
  offset: number;
  filters?: string;
}) {
  return microcmsClient.getList<MicroCMSArticle>({
    endpoint: "article",
    queries: {
      orders: "-publishedAt",
      limit: args.limit,
      offset: args.offset,
      filters: args.filters,
      fields: "id,title,content,publishedAt,category.id,category.name",
    },
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Math.max(Number(searchParams.get("page") ?? "1"), 1);
  const limit = clampInt(Number(searchParams.get("limit") ?? "6"), 1, 24);
  const category = parseCategory(searchParams.get("category"));

  const categoryId =
    category === "all"
      ? undefined
      : category === "notice"
      ? CATEGORY_ID.notice
      : CATEGORY_ID.blog;

  const filters =
    category !== "all" && categoryId
      ? `category[equals]${categoryId}`
      : undefined;

  try {
    const offset = (page - 1) * limit;
    let list = await fetchList({ limit, offset, filters });

    const total = Number(list.totalCount ?? 0);
    const totalPages = Math.max(Math.ceil(total / limit), 1);

    const safePage = Math.min(page, totalPages);
    if (safePage !== page) {
      list = await fetchList({
        limit,
        offset: (safePage - 1) * limit,
        filters,
      });
    }

    const items = (list.contents ?? []).map((x) => {
      const cat = getCatMeta(x.category);
      return {
        id: x.id,
        title: x.title ?? "",
        publishedAt: x.publishedAt ?? "",
        category: categoryKeyById(cat.id),
        categoryId: cat.id ?? "",
        categoryName: cat.name ?? "",
        excerpt: makeExcerptFromHtml(x.content ?? "", 130),
      };
    });

    const needFallback = category !== "all" && !categoryId;
    if (needFallback) {
      const BIG_LIMIT = 300;
      const all = await fetchList({ limit: BIG_LIMIT, offset: 0 });

      const normalized = (all.contents ?? []).map((x) => {
        const cat = getCatMeta(x.category);
        const key = categoryKeyById(cat.id);
        return {
          id: x.id,
          title: x.title ?? "",
          publishedAt: x.publishedAt ?? "",
          category: key,
          categoryId: cat.id ?? "",
          categoryName: cat.name ?? "",
          excerpt: makeExcerptFromHtml(x.content ?? "", 130),
        };
      });

      const filtered =
        (category as string) === "all"
          ? normalized
          : normalized.filter(
              (x) =>
                x.categoryName &&
                (category === "blog"
                  ? x.categoryName.includes("ブログ")
                  : x.categoryName.includes("お知らせ"))
            );

      const total2 = filtered.length;
      const totalPages2 = Math.max(Math.ceil(total2 / limit), 1);
      const safePage2 = Math.min(page, totalPages2);
      const slice = filtered.slice((safePage2 - 1) * limit, safePage2 * limit);

      return NextResponse.json({
        items: slice,
        page: safePage2,
        limit,
        total: total2,
        totalPages: totalPages2,
        category,
      });
    }

    return NextResponse.json({
      items,
      page: safePage,
      limit,
      total,
      totalPages,
      category,
    });
  } catch (e) {
    console.error("API /api/news error:", e);
    return NextResponse.json(
      { items: [], page: 1, limit, total: 0, totalPages: 1, category },
      { status: 500 }
    );
  }
}
