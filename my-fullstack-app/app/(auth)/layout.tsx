// app/(auth)/layout.tsx
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer/Footer";
import { Box } from "@mui/material";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
        <Box
          component="footer"
          sx={{
            width: "100%",
            position: { xs: "static", md: "absolute" },
            bottom: 0,
            py: 0,
            textAlign: "center",
            bgcolor: "transparent",
          }}
        >
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
