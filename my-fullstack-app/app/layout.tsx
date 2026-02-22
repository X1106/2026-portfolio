import type { Metadata } from "next";
import { CssBaseline } from "@mui/material";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Portfolio site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <CssBaseline />

          {children}
        </Providers>
      </body>
    </html>
  );
}

// import Providers from "@/components/Providers";
// import Header from "@/components/layout/Header/Header";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="ja">
//       <body>
//         <Providers>
//           <Header />
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }
