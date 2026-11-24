/**
 * 站点绝对 URL —— 单处定义，全站复用。
 *
 * 优先级：
 * 1. NEXT_PUBLIC_SITE_URL —— 绑定自定义域名后，在托管平台环境变量里设置它即可覆盖。
 * 2. VERCEL_URL           —— Vercel 部署时自动注入（形如 xxx.vercel.app，不带协议）。
 * 3. CF_PAGES_URL         —— Cloudflare Pages 部署时自动注入（形如 https://xxx.pages.dev，带协议）。
 * 4. localhost            —— 本地开发兜底。
 */
export function getSiteUrl(): string {
  const custom = process.env.NEXT_PUBLIC_SITE_URL;
  if (custom) return custom.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  const cfPages = process.env.CF_PAGES_URL;
  if (cfPages) return cfPages.replace(/\/$/, "");

  return "http://localhost:3000";
}
