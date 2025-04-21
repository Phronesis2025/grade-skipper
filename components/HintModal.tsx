"use client";

import { useEffect } from "react";

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hint: string;
}

export default function HintModal({ isOpen, onClose, hint }: HintModalProps) {
  console.log("HintModal: isOpen=", isOpen, "hint=", hint);

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      console.log("Hint overlay clicked, closing modal");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50"
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="bg-[white] rounded-[12px] p-[20px] shadow-xl w-[350px] max-sm:w-[90%] border-2 border-[#4361ee]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-[8px] p-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          {/* Close button */}
          <div className="flex justify-end mb-[10px]">
            <button
              onClick={() => {
                console.log("Hint close button clicked");
                onClose();
              }}
              className="text-[#555] hover:text-[#4361ee] text-[14px] font-semibold focus:outline-none focus:ring-0 active:outline-none active:ring-0"
            >
              Close
            </button>
          </div>

          {/* Hint title */}
          <div className="text-[18px] font-semibold text-[#333] mb-[10px] text-center">
            Hint
          </div>

          {/* Hint content */}
          <div className="bg-[#F5F5F5] rounded-[6px] p-[12px] text-[16px] text-[#555] min-h-[80px] flex items-center justify-center">
            {hint || "No hint available for this question."}
          </div>
        </div>
      </div>
    </div>
  );
}
