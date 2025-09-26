import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true, // Added preload for font
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
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
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
            
            /* Ensure font variable is available immediately */
            :root {
              --font-inter: ${inter.style.fontFamily};
            }
          `
        }} />

        {/* Resource Preloading - OPTIMIZED */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Removed manual font preload - next/font handles this automatically with preload: true */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Preload critical CSS chunks */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* Google Analytics - DEFERRED */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K51GGR26LE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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

        {/* Structured Data - DEFERRED */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
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

        {children}
      </body>
    </html>
  );
}