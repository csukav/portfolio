import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// Removed blog posts → blog index, so old links and indexed URLs don't 404.
const removedPosts = ["taskflow-react-supabase", "offline-first-react-native"];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return removedPosts.flatMap((slug) =>
      ["hu", "en"].map((lang) => ({
        source: `/${lang}/blog/${slug}`,
        destination: `/${lang}/blog`,
        permanent: true,
      })),
    );
  },
};

export default nextConfig;
