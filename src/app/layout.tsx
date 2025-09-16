import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Debt Payoff Calculator | Credit Card Calculator 2025",
  description: "Free debt payoff calculator with avalanche & snowball methods. Calculate credit card payoff strategies and save thousands in interest. Start your debt-free journey today!",
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
    title: "Free Debt Payoff Calculator | Credit Card Calculator 2025",
    description: "Free debt payoff calculator with avalanche & snowball methods. Calculate credit card payoff strategies and save thousands in interest. Start your debt-free journey today!",
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
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
