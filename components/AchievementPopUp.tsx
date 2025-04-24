// components/AchievementPopUp.tsx
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AchievementPopUpProps {
  achievementName: string;
  onClose: () => void;
}

export function AchievementPopUp({
  achievementName,
  onClose,
}: AchievementPopUpProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 bg-white rounded-lg p-5 shadow-lg border-2 border-[#4361ee]"
      )}
    >
      <p className="text-[16px] text-[#333] font-semibold">
        Achievement Unlocked: {achievementName}!
      </p>
      {/* TBD: Add confetti animation here */}
    </div>
  );
}
