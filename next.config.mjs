/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
        port: '8080',
        pathname: '/uploads/**',
      },
      // Alternative localhost formats
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8080',
        pathname: '/uploads/**',
      }
    ]
  }
};

export default nextConfig;