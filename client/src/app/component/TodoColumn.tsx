import React, { useRef } from "react";
import Image from "next/image";
import TodoImage from "@assets/todo.png";
import plusIcon from "@assets/plusIcon.png";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { SortableItem } from "./SortableItem";
import { Todo } from "../interfaces";

interface TodoColumnProps {
  title: string;
  todos: Todo[];
  setData: React.Dispatch<React.SetStateAction<Record<string, Todo[]>>>;
  columnKey: string;
  toggleDrawer: () => void;
}

export default function TodoColumn({ title, todos, columnKey, toggleDrawer }: TodoColumnProps) {
  // Use useRef to generate a stable emptyColumnId
  const emptyColumnIdRef = useRef(`empty-${columnKey}-${Date.now()}`);

  // Setup droppable for the empty column
  const { setNodeRef, isOver } = useDroppable({
    id: emptyColumnIdRef.current,
  });

  return (
    <div className="w-[25%] flex flex-col gap-[16px] p-[8px]">
      <div className="h-[24px] font-[400] flex justify-between items-center">
        <p className="text-[20px]">{title}</p>
        <Image alt="togo" src={TodoImage} />
      </div>
      <SortableContext
        items={todos.length > 0 ? todos.map((todo) => todo._id) : [emptyColumnIdRef.current]}
        strategy={verticalListSortingStrategy}
      >
        {todos.length > 0 ? (
          todos.map((todo) => <SortableItem key={todo._id} id={todo._id} todo={todo} />)
        ) : (
          <div className={`empty-column-placeholder h-22`} ref={setNodeRef}></div>
        )}
      </SortableContext>
      <button
        className="h-[40px] flex items-center justify-between p-[8px] text-white rounded-[8px] w-full text-[16px]"
        style={{ background: "linear-gradient(180deg, #3A3A3A 0%, #202020 100%)" }}
        onClick={toggleDrawer}
      >
        Add new
        <Image alt="add new" src={plusIcon} />
      </button>
    </div>
  );
}
