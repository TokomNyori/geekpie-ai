import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import Header from "@/components/major/Header";
import Footer from "@/components/major/Footer";

const dmsans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: "GeekPie AI",
  description: "AI-Powered Chatbots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
      </head>
      <body className={`${GeistSans.className} bg-[#070815] text-white`}>
        <Header />
        <main className="w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
