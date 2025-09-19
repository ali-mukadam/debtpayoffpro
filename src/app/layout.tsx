import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
  metadataBase: new URL('https://debtpayoffpro.com'),
  alternates: {
    canonical: 'https://debtpayoffpro.com',
  },
  openGraph: {
    title: "Free Credit Card Debt Payoff Calculator 2025 | DebtPayoffPro",
    description: "Free Credit-Card Debt Payoff Calculator. Compare Avalanche vs Snowball methods, Monthly payments and Interest Savings. Start your Debt Free journey today.",
    url: 'https://debtpayoffpro.com',
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
      <body className={`${inter.variable} antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K51GGR26LE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K51GGR26LE');
          `}
        </Script>

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "DebtPayoffPro Calculator",
              "description": "Free Credit Card Debt Payoff Calculator. Compare Avalanche vs Snowball methods, Monthly payments and Interest Savings. Start your Debt Free journey today.",
              "url": "https://debtpayoffpro.com",
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
              "screenshot": "https://debtpayoffpro.com/OGimage.png",
              "author": {
                "@type": "Organization",
                "name": "DebtPayoffPro"
              },
              "publisher": {
                "@type": "Organization",
                "name": "DebtPayoffPro",
                "url": "https://debtpayoffpro.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://debtpayoffpro.com/logo.png"
                }
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DebtPayoffPro",
              "url": "https://debtpayoffpro.com",
              "logo": "https://debtpayoffpro.com/logo.png",
              "description": "Free debt payoff calculator tools and financial planning resources",
              "foundingDate": "2025",
              "sameAs": [
                "https://debtpayoffpro.com"
              ]
            }
          ])}
        </Script>

        {children}
      </body>
    </html>
  );
}
