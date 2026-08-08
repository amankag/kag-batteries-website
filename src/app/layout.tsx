import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageContext";
import LanguagePopup from "./components/LanguagePopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kagbatteries.in"),
  title: {
    default: "KAG Batteries – LED Torch Manufacturer | Indore, MP",
    template: "%s | KAG Batteries",
  },
  description:
    "KAG Batteries — India's trusted LED torch manufacturer since 1997. 22 catalogue entries of rechargeable torches for dealers and distributors across Madhya Pradesh & Maharashtra. Factory-direct pricing.",
  keywords:
    "KAG Batteries, LED torch manufacturer Indore, rechargeable torch dealer, torch manufacturer MP, torch wholesaler Maharashtra, B2B torch supplier India",
  openGraph: {
    siteName: "KAG Batteries",
    type: "website",
    url: "https://www.kagbatteries.in",
    images: [{ url: "/hero-bg.jpg", width: 1920, height: 1080, alt: "KAG Batteries manufacturing facility" }],
  },
  alternates: { canonical: "https://www.kagbatteries.in" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoDevanagari.variable} antialiased`}>
        <LanguageProvider>
          <LanguagePopup />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
