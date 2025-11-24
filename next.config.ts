// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,          // ← THIS IS THE ONLY LINE THAT MATTERS NOW
  },
}

module.exports = nextConfig