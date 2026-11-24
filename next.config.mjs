/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Cloudflare Pages / 纯静态托管：预渲染为 out/，3D 与互动模块均为客户端逻辑，不受影响
  output: "export",
};

export default nextConfig;
