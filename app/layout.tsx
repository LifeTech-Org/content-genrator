"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { ClerkProvider, } from "@clerk/nextjs";


const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        <html lang="en">
          <body className={`antialiased`}>
            {children}
          </body>
        </html>
      </ClerkProvider>
    </QueryClientProvider >
  );
}
