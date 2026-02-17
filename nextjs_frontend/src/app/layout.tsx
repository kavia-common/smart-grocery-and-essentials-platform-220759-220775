import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Grocery & Essentials",
  description: "Retro-themed storefront for groceries, gadgets, and essentials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
