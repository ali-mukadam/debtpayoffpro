import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Free Credit Card Debt Payoff Calculator 2025 | DebtPayoffPro",
  description: "Free Credit-Card Debt Payoff Calculator. Compare Avalanche vs Snowball methods, Monthly payments and Interest Savings. Start your Debt Free journey today.",
  keywords: [
    "debt payoff calculator",
    "credit card calculator", 
    "debt avalanche calculator",
    "debt snowball calculator",
    "pay off debt faster",
    "debt elimination calculator",
    "credit card payoff calculator",
    "debt consolidation calculator",
    "personal loan calculator",
    "debt free calculator",
    "financial calculator",
    "debt payoff strategies",
    "avalanche method",
    "snowball method",
    "debt payoff plan",
    "interest calculator",
    "debt reduction calculator"
  ],
  authors: [{ name: "DebtPayoffPro Team" }],
  creator: "DebtPayoffPro",
  publisher: "DebtPayoffPro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.debtpayoffpro.com'),
  alternates: {
    canonical: 'https://www.debtpayoffpro.com',
  },
  openGraph: {
    title: "Free Credit Card Debt Payoff Calculator 2025 | DebtPayoffPro",
    description: "Free Credit-Card Debt Payoff Calculator. Compare Avalanche vs Snowball methods, Monthly payments and Interest Savings. Start your Debt Free journey today.",
    url: 'https://www.debtpayoffpro.com',
    siteName: 'DebtPayoffPro',
    images: [
      {
        url: '/OGimage.png',
        width: 1200,
        height: 630,
        alt: 'DebtPayoffPro - Free Debt Payoff Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'finance',
  classification: 'Financial Calculator',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Critical CSS for LCP optimization - UPDATED */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Ensure LCP element is visible immediately */
            .text-4xl, .text-5xl {
              opacity: 1 !important;
              visibility: visible !important;
              font-family: var(--font-inter), Arial, sans-serif !important;
              font-weight: 700;
              color: #00509E;
            }
            
            /* Critical above-the-fold styles */
            .hero-container {
              min-height: 100vh;
              background: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            .hero-title {
              font-size: 2.5rem;
              font-weight: bold;
              color: #00509E;
              line-height: 1.2;
              margin-bottom: 1rem;
              font-family: var(--font-inter), Arial, sans-serif;
              opacity: 1 !important;
            }
            
            .hero-subtitle {
              font-size: 1.25rem;
              color: #374151;
              margin-bottom: 2rem;
              font-family: var(--font-inter), Arial, sans-serif;
            }
            
            /* Prevent layout shifts and ensure LCP container is ready */
            .min-h-screen {
              min-height: 100vh;
              background: #F4F4F4;
              opacity: 1;
            }
            
            /* Critical container styles */
            .container {
              width: 100%;
              margin-left: auto;
              margin-right: auto;
              padding-left: 1rem;
              padding-right: 1rem;
              opacity: 1;
            }
            
            .main-container {
              min-height: 100vh;
              background: #ffffff;
              opacity: 1;
            }
            
            /* Critical text styles */
            .text-xl {
              font-size: 1.25rem;
              line-height: 1.75rem;
            }
            
            .text-gray-600 {
              color: #4b5563;
            }
            
            .mb-4 {
              margin-bottom: 1rem;
            }
            
            .mb-8 {
              margin-bottom: 2rem;
            }
            
            .max-w-3xl {
              max-width: 48rem;
            }
            
            .mx-auto {
              margin-left: auto;
              margin-right: auto;
            }
            
            .text-center {
              text-align: center;
            }
            
            .font-bold {
              font-weight: 700;
            }
            
            /* Media queries for responsive containers */
            @media (min-width: 640px) {
              .container {
                max-width: 640px;
              }
            }
            
            @media (min-width: 768px) {
              .container {
                max-width: 768px;
              }
            }
            
            @media (min-width: 1024px) {
              .container {
                max-width: 1024px;
              }
            }
            
            @media (min-width: 1280px) {
              .container {
                max-width: 1280px;
              }
            }
            
            @media (min-width: 1536px) {
              .container {
                max-width: 1536px;
              }
            }
          `
        }} />

        {/* Resource Preloading - OPTIMIZED */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}

        {/* Google Analytics - NOW LOADS AFTER CONTENT */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K51GGR26LE"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K51GGR26LE', {
              page_title: document.title,
              page_location: window.location.href
            });
          `}
        </Script>

        {/* Structured Data - Also moved to load after content */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "DebtPayoffPro Calculator",
                "description": "Free Credit Card Debt Payoff Calculator. Compare Avalanche vs Snowball methods, Monthly payments and Interest Savings. Start your Debt Free journey today.",
                "url": "https://www.debtpayoffpro.com",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web Browser",
                "browserRequirements": "Requires JavaScript",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "description": "Free to use"
                },
                "featureList": [
                  "Avalanche Method Calculator",
                  "Snowball Method Calculator",
                  "Interest Savings Calculator",
                  "Monthly Payment Calculator",
                  "Debt Comparison Tools",
                  "Payoff Timeline Visualization"
                ],
                "screenshot": "https://www.debtpayoffpro.com/OGimage.png",
                "author": {
                  "@type": "Organization",
                  "name": "DebtPayoffPro"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "DebtPayoffPro",
                  "url": "https://www.debtpayoffpro.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.debtpayoffpro.com/logo.png"
                  }
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "DebtPayoffPro",
                "url": "https://www.debtpayoffpro.com",
                "logo": "https://www.debtpayoffpro.com/logo.png",
                "description": "Free debt payoff calculator tools and financial planning resources",
                "foundingDate": "2025",
                "sameAs": [
                  "https://www.debtpayoffpro.com"
                ]
              }
            ])
          }}
        />
      </body>
    </html>
  );
}
