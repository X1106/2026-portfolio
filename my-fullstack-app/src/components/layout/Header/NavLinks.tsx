"use client";

import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function NavLinks({ pages }: { pages: any[] }) {
  return (
    <Box>
      {pages.map((page) => (
        <Button
          key={page.href}
          component={Link}
          href={page.href}
          sx={{ color: "#fff" }}
        >
          {page.label}
        </Button>
      ))}
    </Box>
  );
}
