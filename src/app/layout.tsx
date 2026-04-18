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
  metadataBase: new URL("https://contractchecked.com"),
  title: {
    default: "Contract Checked — AI Contract Analysis, Free & Instant",
    template: "%s | Contract Checked",
  },
  description:
    "Upload any contract — PDF, Word, or photo — and get instant AI-powered analysis. Risks, plain English summary, missing clauses, and recommendations. Free, no login required.",
  keywords: [
    "contract analysis", "AI contract review", "free contract analysis",
    "contract checker", "NDA analysis", "rental agreement review",
    "employment contract analysis", "legal document AI", "OCR contract photo",
    "contract comparison", "contract risk assessment",
  ],
  authors: [{ name: "Contract Checked" }],
  creator: "Contract Checked",
  publisher: "Contract Checked",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://contractchecked.com",
    siteName: "Contract Checked",
    title: "Contract Checked — Know What You Sign",
    description:
      "Free AI contract analysis. Upload PDF, Word, or a photo of any contract and get instant risk assessment, plain English summary, and recommendations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contract Checked — AI Contract Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contract Checked — Know What You Sign",
    description:
      "Free AI contract analysis. Upload any contract and get instant risk assessment and plain English summary.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://contractchecked.com",
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

