import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./contexts/AppContext";

const inter = Inter({ subsets: ["latin"] });

// ✅ Only keep allowed fields here
export const metadata: Metadata = {
  title: "ThinkIAS - UPSC Preparation Platform",
  description:
    "AI-powered UPSC preparation platform with notes, practice tests, current affairs, and study planning tools.",
  manifest: "/manifest.json",
};

// ✅ Move themeColor and viewport to their own exports
export const themeColor = "#2563eb";
export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico:wght@400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
