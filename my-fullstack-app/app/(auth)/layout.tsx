// app/(auth)/layout.tsx
import Footer from "@/components/layout/Footer/Footer";
import { Box } from "@mui/material";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* ここを基準点にする */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* コンテンツ本体 */}
        <Box sx={{ flexGrow: 1 }}>{children}</Box>

        {/* フッターを最下部に固定して浮かせる */}
        <Box
          component="footer"
          sx={{
            width: "100%",
            position: { xs: "static", md: "absolute" }, // スマホでは自然な流れ、PCでは浮かせると安全
            bottom: 0,
            py: 0,
            textAlign: "center",
            // 背景を邪魔しないように透明にする
            bgcolor: "transparent",
          }}
        >
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
