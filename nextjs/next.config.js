/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // { hostname: "images.unsplash.com" },
      // { hostname: "unsplash.com" },
      // { hostname: "example.com" },
      { hostname: "127.0.0.1" },
      { hostname: "localhost" },
      { hostname: "shop-golang" }
    ]
  }
};

module.exports = nextConfig;
