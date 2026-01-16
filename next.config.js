/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: "standalone", // ⚡ importante para Vercel

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.leadconnectorhq.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

module.exports = nextConfig;
