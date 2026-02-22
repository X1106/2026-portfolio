// app/(site)/news/_components/NewsPagination.tsx
"use client";

import { Pagination } from "@mui/material";

export default function NewsPagination({
  page,
  count,
  onChange,
}: {
  page: number;
  count: number;
  onChange?: (nextPage: number) => void;
}) {
  return (
    <Pagination
      page={page}
      count={count}
      shape="rounded"
      onChange={(_, value) => onChange?.(value)}
    />
  );
}
