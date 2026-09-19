import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.contractchecked.com"),
  title: {
    default: "Contract Checked — Free Contract Analysis (No Login)",
    template: "%s | Contract Checked",
  },
  description:
    "Upload a lease, freelance contract, Ontario APS, or any agreement. Free Smart Analysis in plain English — risks, gaps, and Q&A. No login. Not legal advice.",
  keywords: [
    "contract analysis", "AI contract review", "free contract analysis",
    "contract checker", "NDA analysis", "rental agreement review",
    "employment contract analysis", "legal document AI", "OCR contract photo",
    "contract comparison", "contract risk assessment", "Canadian contract analysis",
    "Ontario lease review", "freelance contract checker",
  ],
  authors: [{ name: "Contract Checked" }],
  creator: "Contract Checked",
  publisher: "Contract Checked",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.contractchecked.com",
    siteName: "Contract Checked",
    title: "Contract Checked — Free Contract Analysis (No Login)",
    description:
      "Upload a lease, freelance contract, Ontario APS, or any agreement. Free Smart Analysis in plain English — risks, gaps, and Q&A. No login. Not legal advice.",
    images: [
      {
        url: "https://www.contractchecked.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contract Checked — Free Contract Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contract Checked — Free Contract Analysis (No Login)",
    description:
      "Upload a lease, freelance contract, Ontario APS, or any agreement. Free Smart Analysis in plain English — risks, gaps, and Q&A.",
    images: ["https://www.contractchecked.com/og-image.png"],
  },
  alternates: {
    canonical: "https://www.contractchecked.com",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NLDX2FS7ZH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NLDX2FS7ZH');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

