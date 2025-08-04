/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'q-bit.uz',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
