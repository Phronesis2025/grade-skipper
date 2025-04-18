"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      className="px-[25px] py-[10px] flex justify-between items-center w-full bg-white"
      style={{ width: "100%" }}
    >
      <div className="flex items-center font-bold text-[18px] text-[#4361ee]">
        <span className="mr-[10px]">🎓</span>
        GradeSkipper
      </div>
      <div className="flex items-center gap-[10px]">
        <span className="text-[14px] text-[#555]">Welcome, Amelia!</span>
        <Image
          src="/amelia.png"
          alt="Amelia's Profile"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </nav>
  );
}
