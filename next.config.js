/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      MONGODB_URI: process.env.MONGODB_URI, // Exposes to client-side
    },
    // Other Next.js config options can go here
  }
  
  module.exports = nextConfig