/**
 * 站点绝对 URL —— 单处定义，全站复用。
 *
 * 优先级：
 * 1. NEXT_PUBLIC_SITE_URL —— 绑定自定义域名后，在 Vercel 项目环境变量里设置它即可覆盖。
 * 2. VERCEL_URL           —— Vercel 部署时自动注入（形如 xxx.vercel.app，不带协议）。
 * 3. localhost            —— 本地开发兜底。
 */
export function getSiteUrl(): string {
  const custom = process.env.NEXT_PUBLIC_SITE_URL;
  if (custom) return custom.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
