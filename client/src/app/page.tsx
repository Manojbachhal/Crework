"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./component/sidebar";
import BodyGreetings from "./component/bodyGreetings";
import Bodycard from "./component/bodycard";
import Bodysearch from "./component/bodysearch";
import Drawer from "./component/Drawer";
import TodoColumn from "./component/TodoColumn";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Todo } from "./interfaces";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/navigation";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const Home = () => {
  const router = useRouter();
  const [isDrawerOpen, setDrawer] = useState(false);
  const [userName, setUserName] = useState("");
  const [data, setData] = useState<Record<string, Todo[]>>({
    todo: [],
    inProgress: [],
    underReview: [],
    done: [],
  });

  const getData = async () => {
    try {
      const token = getCookie("token") as string;
      if (!token) {
        throw new Error("No token found");
      }

      const headersList = {
        Authorization: `Bearer ${token}`,
      };

      const reqOptions = {
        url: `${API_URL}/task/`,
        method: "GET",
        headers: headersList,
      };

      const response = await axios.request(reqOptions);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const toggleDrawer = () => {
    setDrawer((prev) => !prev);
    getData();
  };

  useEffect(() => {
    const user: any = getCookie("user");
    if (!user) {
      router.push("/login");
    }
    if (user) {
      setUserName(user);
    }
    getData();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const sourceColumn = Object.keys(data).find((key) =>
      data[key].some((item) => item._id === active.id)
    )!;
    const destinationColumn = over.id.includes("empty")
      ? over.id.split("-")[1]
      : Object.keys(data).find((key) => data[key].some((item) => item._id === over.id))!;

    if (sourceColumn && destinationColumn && sourceColumn !== destinationColumn) {
      const sourceItems = Array.from(data[sourceColumn]);
      const destinationItems = Array.from(data[destinationColumn]);
      const [movedItem] = sourceItems.splice(
        sourceItems.findIndex((item) => item._id === active.id),
        1
      );
      destinationItems.push(movedItem);

      setData((prevData) => ({
        ...prevData,
        [sourceColumn]: sourceItems,
        [destinationColumn]: destinationItems,
      }));

      // Make backend request to update the item's column
      try {
        const token = getCookie("token") as string;
        if (!token) {
          throw new Error("No token found");
        }

        const headersList = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // console.log(destinationColumn);
        const reqOptions = {
          url: `${API_URL}/task/update`,
          method: "POST",
          headers: headersList,
          data: {
            id: active.id,
            column: destinationColumn,
          },
        };

        await axios.request(reqOptions);

        getData();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else if (sourceColumn && sourceColumn === destinationColumn) {
      const items = Array.from(data[sourceColumn]);
      const oldIndex = items.findIndex((item) => item._id === active.id);
      const newIndex = items.findIndex((item) => item._id === over.id);
      items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);

      setData((prevData) => ({
        ...prevData,
        [sourceColumn]: items,
      }));
    }
  };

  return (
    <>
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <main className="flex h-full absolute" style={{ zIndex: "1" }}>
          <Sidebar toggleDrawer={toggleDrawer} userName={userName} />
          <div className="bg-[#F7F7F7] w-full h-screen py-[24px] px-[16px] overflow-y-scroll flex flex-col gap-[16px]">
            <div className="h-[253px] flex flex-col gap-[16px]">
              <BodyGreetings userName={userName} />
              <Bodycard />
              <Bodysearch toggleDrawer={toggleDrawer} />
            </div>

            <div className="bg-white flex gap-[8px]">
              {Object.entries(data).map(([columnKey, todos]) => (
                <TodoColumn
                  key={columnKey}
                  title={columnKey}
                  todos={todos}
                  setData={setData}
                  columnKey={columnKey}
                  toggleDrawer={toggleDrawer}
                />
              ))}
            </div>
          </div>
        </main>
      </DndContext>
    </>
  );
};

export default Home;
