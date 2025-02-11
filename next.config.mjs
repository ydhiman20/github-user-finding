/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        pathname: "/**", // Allow any path from picsum.photos
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
