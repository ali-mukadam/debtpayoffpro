import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable SWC-based minification for smaller JS bundles
  swcMinify: true,

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

    // Automatically extract and inline critical CSS
    optimizeCss: true,
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
