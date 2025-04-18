"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type CustomLinkProps = React.ComponentProps<typeof Link>;

export default function CustomLink({
  href,
  children,
  ...props
}: CustomLinkProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, href]);

  // Force immediate scroll to top on click
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Execute any existing onClick handler
    if (typeof props.onClick === "function") {
      props.onClick(e);
    }

    // Only scroll immediately if not prevented
    if (!e.defaultPrevented) {
      // Use instant scroll instead of smooth for more reliable behavior
      window.scrollTo(0, 0);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
