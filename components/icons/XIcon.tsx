import React from "react";

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#991b1b" /* Red color */
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="20"
    height="20"
    {...props}
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
