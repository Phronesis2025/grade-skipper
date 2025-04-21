"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import CustomLink from "@/components/CustomLink";
import { subjects } from "@/lib/subjects";

export default function SubjectPage() {
  // Get the subject ID from the route parameter
  const params = useParams();
  const subjectId = params.id as string;
  // State for tracking selected grade
  const [selectedGrade, setSelectedGrade] = useState<string | null>("6");

  // Find the matching subject by ID
  const subject = subjects.find((s) => s.id === subjectId);

  // Set the title from the found subject, or use a fallback
  const title = subject ? subject.name : "Subject Not Found";

  // Handle radio button change
  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGrade(e.target.value);
  };

  // UseEffect to disable scrollbar on mount and re-enable on unmount
  useEffect(() => {
    // Only apply on desktop
    const isDesktop = window.innerWidth >= 640;

    if (isDesktop) {
      // Store original body style
      const originalStyle = window.getComputedStyle(document.body).overflow;

      // Disable scrollbar on mount
      document.body.style.overflow = "hidden";
      document.body.classList.add("no-scroll-desktop");

      // Re-enable scrollbar on unmount
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.classList.remove("no-scroll-desktop");
      };
    }
  }, []);

  return (
    <>
      {/* "Back to Home" button */}
      <div className="flex justify-end px-[25px] pt-[5px] max-sm:justify-center">
        <CustomLink
          href="/"
          className="bg-[#4361ee] !text-[white] px-[12px] py-[6px] rounded-[6px] text-[14px] font-semibold no-underline"
        >
          Back to Home
        </CustomLink>
      </div>

      {/* Main container */}
      <div
        className="bg-[#F0F1F2] no-scrollbar-page scrollbar-width-none"
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        <div className="bg-[#F0F1F2] max-w-[400px] mx-auto p-[10px]">
          {/* Main content card */}
          <div className="bg-[white] rounded-[10px] p-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-center">
            <h1 className="text-[24px] font-bold text-[#333] mb-[5px]">
              {title}
            </h1>
            <p className="text-[16px] text-[#555] mb-[10px]">
              Please select a grade level to start the quiz
            </p>

            {/* Grade selection radio buttons */}
            <div className="flex flex-col gap-[8px] mb-[15px] mx-auto">
              {/* 6th Grade - Enabled */}
              <div
                className={`bg-[#F5F5F5] p-[6px] rounded-[6px] flex items-center cursor-pointer max-sm:min-h-[48px] ${
                  selectedGrade === "6" ? "bg-[#E0E7FF]" : ""
                }`}
              >
                <input
                  type="radio"
                  id="grade-6"
                  name="grade"
                  value="6"
                  checked={selectedGrade === "6"}
                  onChange={handleGradeChange}
                  className="mr-[10px]"
                />
                <label
                  htmlFor="grade-6"
                  className="text-[16px] text-[#333] cursor-pointer"
                >
                  6th Grade
                </label>
              </div>

              {/* 7th Grade - Disabled with tooltip */}
              <div className="group relative">
                <div className="bg-[#F5F5F5] p-[6px] rounded-[6px] flex items-center opacity-50 cursor-not-allowed max-sm:min-h-[48px]">
                  <input
                    type="radio"
                    id="grade-7"
                    name="grade"
                    value="7"
                    disabled
                    className="mr-[10px]"
                  />
                  <label
                    htmlFor="grade-7"
                    className="text-[16px] text-[#333] relative"
                  >
                    7th Grade
                    <span className="hidden absolute left-full top-1/2 -translate-y-1/2 ml-[10px] bg-[#666] !text-[white] text-[12px] px-[10px] py-[5px] rounded-[4px] whitespace-nowrap z-10 group-hover:block">
                      Master 6th grade to unlock
                    </span>
                  </label>
                </div>
              </div>

              {/* 8th Grade - Disabled with tooltip */}
              <div className="group relative">
                <div className="bg-[#F5F5F5] p-[6px] rounded-[6px] flex items-center opacity-50 cursor-not-allowed max-sm:min-h-[48px]">
                  <input
                    type="radio"
                    id="grade-8"
                    name="grade"
                    value="8"
                    disabled
                    className="mr-[10px]"
                  />
                  <label
                    htmlFor="grade-8"
                    className="text-[16px] text-[#333] relative"
                  >
                    8th Grade
                    <span className="hidden absolute left-full top-1/2 -translate-y-1/2 ml-[10px] bg-[#666] !text-[white] text-[12px] px-[10px] py-[5px] rounded-[4px] whitespace-nowrap z-10 group-hover:block">
                      Master 7th grade to unlock
                    </span>
                  </label>
                </div>
              </div>

              {/* 9th Grade - Disabled with tooltip */}
              <div className="group relative">
                <div className="bg-[#F5F5F5] p-[6px] rounded-[6px] flex items-center opacity-50 cursor-not-allowed max-sm:min-h-[48px]">
                  <input
                    type="radio"
                    id="grade-9"
                    name="grade"
                    value="9"
                    disabled
                    className="mr-[10px]"
                  />
                  <label
                    htmlFor="grade-9"
                    className="text-[16px] text-[#333] relative"
                  >
                    9th Grade
                    <span className="hidden absolute left-full top-1/2 -translate-y-1/2 ml-[10px] bg-[#666] !text-[white] text-[12px] px-[10px] py-[5px] rounded-[4px] whitespace-nowrap z-10 group-hover:block">
                      Master 8th grade to unlock
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Start Quiz Button */}
            <div className="mt-[15px]">
              <CustomLink
                href={
                  selectedGrade
                    ? `/subject/${subjectId}/quiz/${selectedGrade}`
                    : "#"
                }
                className={`bg-[#4361ee] !text-[white] px-[14px] py-[6px] rounded-[6px] text-[16px] font-semibold inline-block ${
                  !selectedGrade
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#3251dd] transition-colors"
                }`}
                {...(!selectedGrade && {
                  "aria-disabled": true,
                  onClick: (e: React.MouseEvent) => e.preventDefault(),
                })}
              >
                Start Quiz
              </CustomLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
