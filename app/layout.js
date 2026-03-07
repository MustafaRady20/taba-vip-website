// Root layout — middleware redirects / to /ar or /en
// The real layout with <html> is in app/[locale]/layout.js
export default function RootLayout({ children }) {
  return children;
}
