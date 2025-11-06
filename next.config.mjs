/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Image optimization o'chirildi
    domains: ["q-bit.uz"],
    remotePatterns: [
      // Production domain (your existing config)
      {
        protocol: 'https',
        hostname: 'q-bit.uz',
      },
      // Development - localhost:8080 (ADD THIS)
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      // Alternative localhost formats
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      }
    ]
  }
};

export default nextConfig;