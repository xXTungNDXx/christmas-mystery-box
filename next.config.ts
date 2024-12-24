/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true // Temporarily allow build with TS errors
  },
  eslint: {
    ignoreDuringBuilds: true // Temporarily ignore ESLint errors
  }
}

module.exports = nextConfig