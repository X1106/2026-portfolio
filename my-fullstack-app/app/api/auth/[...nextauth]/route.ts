import { handlers } from "@/lib/auth";

export const runtime = "nodejs"; // ✅重要
export const dynamic = "force-dynamic"; // 任意（キャッシュ回避）

export const GET = handlers.GET;
export const POST = handlers.POST;
