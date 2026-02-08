/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "themewagon.com" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
