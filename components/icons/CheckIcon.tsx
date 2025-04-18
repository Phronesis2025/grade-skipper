import React from "react";

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#14532d" /* Green color */
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="20"
    height="20"
    {...props}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
