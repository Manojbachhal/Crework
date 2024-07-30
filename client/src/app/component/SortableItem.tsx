import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import vector from "@assets/vector.png";
import { Todo } from "../interfaces";

interface SortableItemProps {
  id: string;
  todo: Todo;
}

export const SortableItem = ({ id, todo }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="h-[231px] grid gap-[16px] border-[1px] rounded-[8px] border-[#DEDEDE] p-[14px]"
    >
      <div className="h-[171px] grid gap-[13px]">
        <div className="grid gap-[12px]">
          <p className="text-[16px] font-[400] leading-[19.36px] text-[#606060]">{todo.title}</p>
          <p className="text-[14px] font-[400] text-[#797979] leading-[16.94px]">
            {todo.description}
          </p>
        </div>
        <button
          className={`text-[12px] h-[27px] w-[55px] font-[400] leading-[14.52px] text-white rounded-[8px] px-[8px] py-[6px] ${
            todo.priority === "Urgent"
              ? "bg-[#FF6B6B]"
              : todo.priority === "Medium"
              ? "bg-[#FFA235]"
              : todo.priority === "Low"
              ? "bg-[#0ECC5A]"
              : ""
          }`}
        >
          {todo.priority}
        </button>
        <div className="h-[17px] flex items-center gap-[8px]">
          <Image src={vector} className="w-[24px] h-[24px]" alt="time" />
          <p className="text-[14px] leading-[16.94px] font-[600] text-[#606060]">{todo.deadline}</p>
        </div>
      </div>
      <div>
        <p className="text-[14px] font-[500] leading-[16.54px] text-[#797979]">{todo.createdAt}</p>
      </div>
    </div>
  );
};
