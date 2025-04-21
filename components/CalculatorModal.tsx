"use client";

import { useState, useEffect } from "react";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalculatorModal({
  isOpen,
  onClose,
}: CalculatorModalProps) {
  console.log("CalculatorModal: isOpen=", isOpen);

  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [secondOperand, setSecondOperand] = useState<number | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // Reset calculator when modal opens
  useEffect(() => {
    if (isOpen) {
      setDisplay("0");
      setFirstOperand(null);
      setOperator(null);
      setSecondOperand(null);
      setWaitingForSecondOperand(false);
    }
  }, [isOpen]);

  // Handle digit or decimal input
  const handleNumber = (value: string) => {
    if (waitingForSecondOperand) {
      setDisplay(value);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? value : display + value);
    }
  };

  // Handle operator input
  const handleOperator = (op: string) => {
    const inputValue = parseFloat(display);
    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }
    setOperator(op);
    setWaitingForSecondOperand(true);
  };

  // Perform calculation
  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b !== 0 ? a / b : NaN;
      default:
        return b;
    }
  };

  // Handle equals
  const handleEquals = () => {
    if (firstOperand !== null && operator && !waitingForSecondOperand) {
      const inputValue = parseFloat(display);
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(isNaN(result) ? "Error" : String(result));
      setFirstOperand(result);
      setOperator(null);
      setSecondOperand(null);
      setWaitingForSecondOperand(false);
    }
  };

  // Handle clear
  const handleClear = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setSecondOperand(null);
    setWaitingForSecondOperand(false);
  };

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      console.log("Overlay clicked, closing modal");
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
                console.log("Close button clicked");
                onClose();
              }}
              className="text-[#555] hover:text-[#4361ee] text-[14px] font-semibold focus:outline-none focus:ring-0 active:outline-none active:ring-0"
            >
              Close
            </button>
          </div>

          {/* Calculator display */}
          <div className="bg-[#F5F5F5] rounded-[6px] p-[10px] mb-[15px] text-right">
            <div className="text-[24px] text-[#555] font-semibold">
              {display}
            </div>
          </div>

          {/* Calculator buttons */}
          <div className="grid grid-cols-4 gap-[8px]">
            {[
              "7",
              "8",
              "9",
              "/",
              "4",
              "5",
              "6",
              "*",
              "1",
              "2",
              "3",
              "-",
              "0",
              ".",
              "=",
              "+",
            ].map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  console.log(`Button clicked: ${btn}`);
                  if (btn.match(/[0-9.]/)) {
                    handleNumber(btn);
                  } else if (btn === "=") {
                    handleEquals();
                  } else {
                    handleOperator(btn);
                  }
                }}
                className={`p-[10px] rounded-[6px] text-[16px] font-semibold min-w-[48px] min-h-[48px] focus:outline-none focus:ring-0 active:outline-none active:ring-0 ${
                  btn === "="
                    ? "bg-[#4361ee] text-white hover:bg-[#3251dd]"
                    : btn.match(/[0-9.]/)
                    ? "bg-[#F5F5F5] text-[#555] hover:bg-[#EAEAEA]"
                    : "bg-[#E0E7FF] text-[#4361ee] hover:bg-[#C7D2FE]"
                }`}
              >
                {btn}
              </button>
            ))}
            <button
              onClick={() => {
                console.log("Clear button clicked");
                handleClear();
              }}
              className="col-span-4 p-[10px] rounded-[6px] text-[16px] font-semibold bg-[#dc2626] text-white hover:bg-[#b91c1c] focus:outline-none focus:ring-0 active:outline-none active:ring-0 mt-[8px]"
            >
              C
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
