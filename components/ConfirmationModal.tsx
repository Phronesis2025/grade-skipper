"use client";

import { useEffect } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

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
        <div className="text-[18px] font-semibold text-[#333] mb-[10px] text-center">
          Are you sure?
        </div>
        <p className="text-[16px] text-[#555] mb-[20px] text-center">
          Do you want to return to the home page?
        </p>
        <div className="flex justify-center gap-[10px]">
          <button
            onClick={onClose}
            className="px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold bg-[#F5F5F5] text-[#555] hover:bg-[#EAEAEA] focus:outline-none focus:ring-0"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-[16px] py-[8px] rounded-[6px] text-[16px] font-semibold bg-[#4361ee] text-[white] hover:bg-[#3251dd] focus:outline-none focus:ring-0"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
