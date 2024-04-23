// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       "images.unsplash.com",
//       "unsplash.com",
//       "example.com",
//       "127.0.0.1",
//       "localhost"
//     ]
//   }
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/test",
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "unsplash.com" },
      { hostname: "example.com" },
      { hostname: "127.0.0.1" },
      { hostname: "localhost" },
      { hostname: "shop-golang" }
    ]
  }
};

module.exports = nextConfig;
