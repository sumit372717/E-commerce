/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com", // update if needed
      },
    ],
  },
};

export default nextConfig;