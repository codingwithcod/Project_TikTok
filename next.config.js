/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript : {
    ignoreBuildErrors : true
  },
  reactStrictMode: false,
  images : {
    domains : ['theabhipatel.vercel.app', 'lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig
