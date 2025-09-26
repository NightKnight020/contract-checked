import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contract Checked - AI Contract Analysis & Free Templates",
  description: "Upload any contract and get instant AI-powered analysis. Free legal templates for rental agreements, service contracts, and more. Make informed decisions with smart contract insights.",
  keywords: "contract analysis, AI legal review, free contract templates, rental agreements, service contracts, legal documents",
  authors: [{ name: "Contract Checked" }],
  openGraph: {
    title: "Contract Checked - AI Contract Analysis",
    description: "Understand your contracts in minutes with AI-powered analysis and free legal templates.",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
