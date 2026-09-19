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
    default: "Free Contract Checker — AI Contract Analysis & Review",
    template: "%s | Contract Checked",
  },
  description:
    "Free contract checker for renters, freelancers, and anyone signing a contract. Upload any contract — lease, freelance agreement, NDA — and get instant AI analysis. No signup required.",
  keywords: [
    "contract checker", "free contract analysis", "contract review",
    "AI contract review", "lease checker", "rental agreement analysis",
    "freelance contract review", "contract analyzer", "Ontario lease review",
    "agreement of purchase and sale review", "free contract checker",
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
    title: "Free Contract Checker — Understand Your Contract Before You Sign",
    description:
      "Free contract analysis for Canadian renters, freelancers, and anyone signing a contract. Upload any lease, agreement, or contract for instant plain-English review.",
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
    title: "Free Contract Checker — Understand Your Contract Before You Sign",
    description:
      "Free contract analysis for renters, freelancers, and anyone signing a contract. Upload any lease or agreement for instant plain-English review.",
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

