export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] }],
    sitemap: 'https://taba-vip-website.vercel.app/sitemap.xml',
    host: 'https://taba-vip-website.vercel.app',
  };
}
