"use client";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

// We can't export metadata with "use client", so we handle it differently

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
        {/* Force CSS for sticky navbar */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .sticky-header {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: white;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            width: 100%;
          }
          .sticky-header nav {
            width: 100%;
          }
        `,
          }}
        />
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
