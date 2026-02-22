// app/(site)/news/page.tsx
import NewsListClient from "./_components/NewsListClient";
import { Suspense } from "react"; // 追加

export default function NewsPage() {
  return (
    // fallback の中身はローディング中に表示したいもの（"Loading..." など）を入れます
    <Suspense fallback={<div>Loading news...</div>}>
      <NewsListClient />
    </Suspense>
  );
}
