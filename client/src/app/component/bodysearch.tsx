import React from "react";
import Image from "next/image";
import searchicon from "@assets/searchicon.png";
import calender from "@assets/calender.png";
import automation from "@assets/automation.png";
import filter from "@assets/filter.png";
import shareIcon from "@assets/shareIcon.png";
import buttonIcon from "@assets/buttonIcon.png";
interface props {
  toggleDrawer: () => void;
}
function Bodysearch({ toggleDrawer }: props) {
  return (
    <div className="h-[40px] flex justify-between ">
      <div className="relative  h-[40px] w-[196px] rounded-[8px] border-[1px] p-[8px] bg-white">
        <input type="text" className="w-full h-full" />
        <button className="absolute inset-y-3 right-0 flex items-center px-4">
          <Image src={searchicon} alt="search" className="w-[24px] h-[24px]" />
        </button>
      </div>

      <div className="flex gap-[16px]">
        <div className="flex items-center p-[8px] rounded-[4px] gap-[14px] bg-[#F3F3F3]">
          <p className="text-[16px] font-[400] leading-[19.36px] text-[#797979]">Calendar view</p>
          <Image src={calender} className="w-[24px] h-[24px] " alt="calender view" />
        </div>

        <div className="flex items-center p-[8px] rounded-[4px] gap-[14px] bg-[#F3F3F3]">
          <p className="text-[16px] font-[400] leading-[19.36px] text-[#797979]">Automation</p>
          <Image src={automation} className="w-[24px] h-[24px] " alt="calender view" />
        </div>

        <div className="flex items-center p-[8px] rounded-[4px] gap-[14px] bg-[#F3F3F3]">
          <p className="text-[16px] font-[400] leading-[19.36px] text-[#797979]">Filter</p>
          <Image src={filter} className="w-[24px] h-[24px] " alt="calender view" />
        </div>

        <div className="flex items-center j p-[8px] rounded-[4px] gap-[14px] bg-[#F3F3F3]">
          <p className="text-[16px] font-[400] leading-[19.36px] text-[#797979]">Share</p>
          <Image src={shareIcon} className="w-[24px] h-[24px] " alt="calender view" />
        </div>

        <button
          className="w-[136px] h-[40px] rounded-[8px] border-[1px] p-[8px] gap-[8px] flex items-center text-[15px] text-white justify-center"
          style={{ background: "linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)" }}
          onClick={toggleDrawer}
        >
          Create new
          <Image alt="create new task" src={buttonIcon} className="h-[24px] w-[24px]" />
        </button>
      </div>
    </div>
  );
}

export default Bodysearch;
