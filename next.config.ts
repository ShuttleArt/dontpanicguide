// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // SpaceX official Flickr (rockets, assets, etc.)
      {
        protocol: 'https',
        hostname: 'live.staticflickr.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'farm66.staticflickr.com',
        port: '',
        pathname: '/**',
      },
      // Grok-generated images (assets page, satellites, etc.)
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      // Fallback / older sources (just in case)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig