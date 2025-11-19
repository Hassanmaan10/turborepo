/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/ui"],
  images: {
    domains: ["i.ytimg.com"],
  },
};

export default nextConfig;
