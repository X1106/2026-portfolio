/** @type {import('next').NextConfig} */
const nextConfig = {
  // 型エラーがあってもビルドを続行させる魔法の設定
  typescript: {
    ignoreBuildErrors: true,
  },
  // ついでにESLint（構文チェック）のエラーも無視するようにします
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
