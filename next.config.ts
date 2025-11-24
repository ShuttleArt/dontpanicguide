// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',           // ← forces normal HTML <img> behavior on Vercel
  images: {
    unoptimized: true             // ← disables Next.js Image completely
  }
}

module.exports = nextConfig