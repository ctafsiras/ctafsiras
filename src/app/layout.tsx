import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chowdhury Tafsir Ahmed Siddiki",
  description: "Chowdhury Tafsir Ahmed Siddiki's Portfolio Website",
  other: {
    "openai-domain-verification": "dv-TybiqYm0NMVbpGPIOR2z5bx1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
