
import React from 'react';

export const WineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 22h8" />
    <path d="M12 15v7" />
    <path d="M12 15a5 5 0 0 0 5-5c0-2.76-2.24-5-5-5S7 7.24 7 10a5 5 0 0 0 5 5z" />
    <path d="M12 15V5" />
  </svg>
);
