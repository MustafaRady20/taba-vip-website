export default function sitemap() {
  const baseUrl = 'https://taba-vip-website.vercel.app';
  return [
    { url: `${baseUrl}/ar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];
}
