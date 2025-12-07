/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fixmastertw.com',
      }
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig