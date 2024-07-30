import Image from "next/image";
import React from "react";
import questionmark from "@assets/questionmark.png";
interface props {
  userName: string;
}
function bodyGreetings({ userName }: props) {
  return (
    <div className="w-full h-[58px] flex justify-between items-center ">
      <p className="text-[48px]  font-[600]">Good morning, {userName}!</p>
      <div className="flex gap-[8px] w-[157px] h-[24px]">
        <p>Help & feedback</p>
        <Image alt="Help & feedback" src={questionmark} className="w-[24px] " />
      </div>
    </div>
  );
}

export default bodyGreetings;
