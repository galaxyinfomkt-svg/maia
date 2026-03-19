/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.leadconnectorhq.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "assets.cdn.filesafe.space" },
    ],
  },

  // Trailing slashes for better static hosting compatibility
  trailingSlash: true,
};

module.exports = nextConfig;
