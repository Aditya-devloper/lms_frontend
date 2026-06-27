import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Toaster } from "sonner";
import Providers from "./providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leado — Never lose a lead to a forgotten follow-up",
  description:
    "Leado helps small sales teams track leads, set follow-up reminders, and close more deals — without the spreadsheet chaos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="ambient-glow" />
        <div className="noise-overlay" />
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
