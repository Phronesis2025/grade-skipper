import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Grade Skipper",
  description: "Educational platform to help students advance in their studies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="w-full">
          <Navbar />
        </header>
        <main className="p-[25px]">{children}</main>
      </body>
    </html>
  );
}
