import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  compiler: {
    // Remove console.log statements in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Experimental features for better performance
  experimental: {
    // Optimize imports for these packages to reduce bundle size
    optimizePackageImports: [
      'recharts',
      'lucide-react'
    ],
  },
  
  // Build performance optimizations
  swcMinify: true,
  
  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable gzip compression
  compress: true,
};

export default nextConfig;