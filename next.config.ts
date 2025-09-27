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
  
  // Remove the "X-Powered-By" header for tiny savings
  poweredByHeader: false,

  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable gzip compression
  compress: true,
};

export default nextConfig;
