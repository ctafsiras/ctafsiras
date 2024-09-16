import type { Metadata } from "next";
import { Poppins as Font } from "next/font/google";
import "./globals.css";

const font = Font({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Chowdhury Tafsir Ahmed Siddiki",
  description: "Chowdhury Tafsir Ahmed Siddiki's Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`container mx-auto ${font.className} bg-gray-600`}>
        <main className="border-r-l border-red-500 bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  );
}
