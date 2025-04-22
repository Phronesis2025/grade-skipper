"use client";

import { useState, useEffect } from "react";

export default function LoadingAnimation() {
  const loadingMessages = [
    "Loading Knowledge",
    "Preparing Quiz",
    "Getting Ready",
    "Almost There",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [loadingMessages.length]);

  return (
    <div className="loading-container">
      <div className="book-loader">
        <div className="book"></div>
        <div className="page"></div>
        <div className="pencil"></div>
      </div>
      <div className="loading-text" aria-live="polite">
        {loadingMessages[messageIndex]}
        <span className="dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>

      <style jsx>{`
        .loading-container {
          text-align: center;
        }

        .book-loader {
          position: relative;
          width: 120px;
          height: 80px;
          margin: 0 auto 20px;
        }

        .book {
          position: absolute;
          width: 80px;
          height: 60px;
          border-radius: 3px;
          top: 10px;
          left: 20px;
          transform-origin: 0% 50%;
          background: #4361ee; /* Match app's primary color */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          animation: book-bounce 1.5s ease infinite;
        }

        .book:before {
          content: "";
          position: absolute;
          width: 15px;
          height: 100%;
          background: #3251dd; /* Slightly darker shade of primary color */
          right: 0;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
        }

        .page {
          position: absolute;
          top: 10px;
          right: -5px;
          width: 40px;
          height: 60px;
          background: rgb(225, 223, 223);
          border-radius: 2px;
          transform-origin: 0% 50%;
          animation: page-flip 1.5s ease infinite;
        }

        .pencil {
          position: absolute;
          top: 30px;
          left: 100px;
          width: 6px;
          height: 40px;
          background: #ffc107;
          border-radius: 3px 3px 0 0;
          transform-origin: 50% 100%;
          animation: pencil-writing 1.5s ease infinite;
        }

        .pencil:before {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          border-bottom: 8px solid #e91e63;
          bottom: 100%;
        }

        .pencil:after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          border-top: 4px solid #333;
          top: 100%;
        }

        .loading-text {
          color: #4a4a4a;
          font-size: 18px;
          margin-top: 20px;
          font-family: "Arial", sans-serif;
        }

        .dots span {
          display: inline-block;
          opacity: 0;
          animation: dot-fade 1.5s infinite;
        }

        .dots span:nth-child(2) {
          animation-delay: 0.5s;
        }

        .dots span:nth-child(3) {
          animation-delay: 1s;
        }

        @keyframes book-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes page-flip {
          0%,
          100% {
            transform: rotateY(0);
          }
          50% {
            transform: rotateY(-35deg);
          }
        }

        @keyframes pencil-writing {
          0%,
          100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }

        @keyframes dot-fade {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .book,
          .page,
          .pencil,
          .dots span {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
