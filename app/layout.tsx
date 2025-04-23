"use client";

import "./globals.css";
import "../styles/sticky-header.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  // Force scroll to top when pathname changes
  useEffect(() => {
    // Only scroll when the path actually changes (not on initial load)
    if (prevPathRef.current !== pathname) {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <title>Grade Skipper</title>
        <meta
          name="description"
          content="Educational platform to help students advance in their studies"
        />
        {/* Favicon configuration */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <div className="sticky-header">
          <Navbar />
        </div>
        <main className="p-[25px]">{children}</main>
      </body>
    </html>
  );
}
