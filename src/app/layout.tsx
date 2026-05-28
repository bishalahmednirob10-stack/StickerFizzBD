import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/cart-provider";
import { brand } from "@/lib/brand";
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
  metadataBase: new URL("https://stickerfizzbd.com"),
  title: `${brand.displayName} | Custom Stickers & Decals`,
  description: `${brand.description}. ${brand.tagline}. ${brand.quality}`,
  openGraph: {
    title: brand.displayName,
    description: `${brand.description}. ${brand.orderPrompt}.`,
    type: "website",
    images: [brand.logo],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fffaf6] text-[#161412]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
