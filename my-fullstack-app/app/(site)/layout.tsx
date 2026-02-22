import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { Box } from "@mui/material";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200, // ✅ 関数NG → 数値で固定
          width: "100%",
        }}
      >
        <Header />
      </Box>

      {/* ✅ 余白を足さない・囲まない */}
      <main>{children}</main>

      <Box
        component="footer"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200, // ✅ 関数NG → 数値で固定
          width: "100%",
        }}
      >
        <Footer />
      </Box>
    </>
  );
}
