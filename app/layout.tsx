import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, } from "@clerk/nextjs";
import Header from "./components/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Content Generator",
  description: "AI-powered content generation tool",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          <Header />
          <main className="pt-20">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
