import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuroraBackground from "./components/AuroraBackground";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Truvala — Buy with Clarity, Not Just Hope",
  description:
    "An AI real estate startup making home buying clearer, smarter, and more transparent for buyers and real estate professionals.",
  keywords: ["home buying", "real estate", "AI", "browser extension", "zillow", "redfin"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        <AuroraBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
