import React, { useRef } from "react";

const TrophyCase = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Sample trophy data (to be replaced with real data from Supabase/local storage)
  const trophies = [
    { id: 1, name: "6th Grade Math Trophy", unlocked: true },
    { id: 2, name: "6th Grade Reading Trophy", unlocked: true },
    { id: 3, name: "6th Grade Science Trophy", unlocked: false },
    { id: 4, name: "6th Grade History Trophy", unlocked: false },
    { id: 5, name: "6th Grade All-Star Trophy", unlocked: false },
  ];

  // Scroll the carousel left or right by one trophy width
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 200; // Approximate width of one trophy item (adjust based on actual size)
      const scrollPosition =
        direction === "left"
          ? carouselRef.current.scrollLeft - scrollAmount
          : carouselRef.current.scrollLeft + scrollAmount;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[white] rounded-[16px] p-[25px] mb-[30px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] relative">
      <h2 className="text-[20px] font-bold text-[#333] mb-[15px]">
        Trophy Case
      </h2>
      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-[15px] pb-[10px] scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {trophies.map((trophy) => (
          <div
            key={trophy.id}
            className="flex-none w-[25%] text-center max-[768px]:w-[50%] max-[640px]:w-[100%]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div
              className={`w-[80px] h-[80px] bg-[#E0E7FF] mx-auto mb-[10px] rounded-[8px] ${
                !trophy.unlocked ? "opacity-30 relative" : ""
              }`}
            >
              {!trophy.unlocked && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[20px]">
                  🔒
                </span>
              )}
            </div>
            <div className="text-[12px] text-[#333]">{trophy.name}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() => scrollCarousel("left")}
        className="absolute top-1/2 left-[10px] transform -translate-y-1/2 bg-[#4361ee] text-white border-none rounded-full w-[32px] h-[32px] flex items-center justify-center cursor-pointer hover:bg-[#1e40af] transition-colors"
        aria-label="Scroll left"
      >
        ←
      </button>
      <button
        onClick={() => scrollCarousel("right")}
        className="absolute top-1/2 right-[10px] transform -translate-y-1/2 bg-[#4361ee] text-white border-none rounded-full w-[32px] h-[32px] flex items-center justify-center cursor-pointer hover:bg-[#1e40af] transition-colors"
        aria-label="Scroll right"
      >
        →
      </button>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TrophyCase;
