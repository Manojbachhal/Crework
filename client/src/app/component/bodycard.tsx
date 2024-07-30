import React from "react";
import Image from "next/image";
import opinion from "@assets/opinion.png";
import sharelink from "@assets/sharelink.png";
import posts from "@assets/posts.png";
function bodycard() {
  return (
    // cards after converting px into % for responsiveness
    <div className="h-[123px] rounded-[8px] border-[1px] gap-[10px] flex ">
      {/* first card */}
      <div className="flex items-center p-[16px] rounded-[8px] border-[1px] bg-white">
        <div className="w-[77px] h-[61px]">
          <Image src={opinion} className="" alt="introducing tags" />
        </div>
        <div className="h-[74px] w-[75%] grid gap-[4px]">
          <p className="text-[#757575] text-[16px] font-[600] leading-[19.36px]">
            Introducing tags
          </p>
          <p className="text-[#868686] text-[14px] font-[400] leading-[16.94px]">
            Easily categorize and find your notes by adding tags. Keep your workspace clutter-free
            and efficient.
          </p>
        </div>
      </div>

      {/* secound card */}
      <div className="flex items-center p-[16px] rounded-[8px] border-[1px] bg-white">
        <div className="w-[76px] h-[50px]">
          <Image src={sharelink} className="h-full w-full" alt="introducing tags" />
        </div>
        <div className="h-[74px] w-[75%] grid gap-[4px]">
          <p className="text-[#757575] text-[16px] font-[600] leading-[19.36px]">
            Share Notes Instantly
          </p>
          <p className="text-[#868686] text-[14px] font-[400] leading-[16.94px]">
            Effortlessly share your notes with others via email or link. Enhance collaboration with
            quick sharing options.
          </p>
        </div>
      </div>

      {/* third card*/}
      <div className="flex  items-center p-[16px] rounded-[8px] border-[1px] bg-white">
        <div className="w-[76px] h-[70px]">
          <Image src={posts} className="h-full w-full" alt="introducing tags" />
        </div>
        <div className="h-[74px] w-[75%] grid gap-[4px]">
          <p className="text-[#757575] text-[16px] font-[600] leading-[19.36px]">Access Anywhere</p>
          <p className="text-[#868686] text-[14px] font-[400] leading-[16.94px]">
            Sync your notes across all devices. Stay productive whether you&apos;re on your phone,
            tablet, or computer.
          </p>
        </div>
      </div>
    </div>
  );
}

export default bodycard;
