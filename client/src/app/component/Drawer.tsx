"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import cross from "@assets/cross.png";
import expend from "@assets/expend.png";
import star from "@assets/star.png";
import shareIcon from "@assets/shareIcon.png";
import loading from "@assets/loading.png";
import priority from "@assets/priorty.png";
import calen from "@assets/calen.png";
import pencil from "@assets/pencil.png";
import plus from "@assets/plus.png";
import axios from "axios";
import { getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface props {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

function Drawer({ isDrawerOpen, toggleDrawer }: props) {
  const [newTodo, setNewTodo] = useState({
    title: "",
    status: "",
    priority: "",
    deadline: "",
    description: "",
  });
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let token = getCookie("token");

    let headersList = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify(newTodo);

    let reqOptions = {
      url: `${API_URL}/task/`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    // console.log(response.data);
    toggleDrawer();

    // console.log("New Todo:", newTodo);
  };

  return (
    <div
      className={`h-screen w-[670px] pt-[24px] bg-white right-0 absolute ${
        isDrawerOpen ? "" : "hidden"
      }`}
      style={{ zIndex: "10" }}
    >
      <div className="flex flex-col gap-[27px] px-[27px]">
        <div className="w-full h-[40px] flex justify-between">
          <div className="flex h-[40px] w-[64px] justify-between">
            <Image
              alt="cross"
              src={cross}
              className="h-[24px] w-[24px] cursor-pointer"
              onClick={toggleDrawer}
            />
            <Image alt="expend" src={expend} className="h-[24px] w-[24px]" />
          </div>

          <div className="w-[230px] h-[40px] flex gap-[16px]">
            <div className="flex items-center p-[8px] rounded-[4px] gap-[14px] bg-[#F3F3F3]">
              <p className="text-[16px] font-[400] leading-[19.36px] text-[#797979]">Share</p>
              <Image src={shareIcon} className="w-[24px] h-[24px]" alt="share" />
            </div>
            <div className="flex items-center w-[116px] p-[8px] rounded-[4px] gap-[14px] bg-[#F3F3F3]">
              <p className="text-[16px] font-[400] leading-[19.36px] text-[#797979]">Favorite</p>
              <Image src={star} className="w-[24px] h-[24px]" alt="favorite" />
            </div>
          </div>
        </div>

        {/* Form to Add New Todo */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[32px]">
          <input
            type="text"
            name="title"
            value={newTodo.title}
            onChange={handleChange}
            placeholder="Title"
            className="text-[48px] font-[600] leading-[57.6px] text-left text-[#CCCCCC] mb-[16px]"
            required
          />

          <div className="flex gap-[60px]">
            <div className="w-[136px] flex flex-col gap-[36px] h-[192px]">
              <div className="text-[16px] h-[24px] w-[97px] text-left flex flex-row gap-[24px]">
                <Image alt="status" src={loading} className="w-[24px] h-[24px]" />
                <p className="h-[24px] font-[400] leading-[19.36px] text-[#666666]">Status</p>
              </div>

              <div className="text-[16px] h-[24px] w-[97px] text-left flex flex-row gap-[24px]">
                <Image alt="priority" src={priority} className="w-[24px] h-[24px]" />
                <p className="h-[24px] font-[400] leading-[19.36px] text-[#666666]">Priority</p>
              </div>

              <div className="text-[16px] h-[24px] w-[97px] text-left flex flex-row gap-[24px]">
                <Image alt="deadline" src={calen} className="w-[24px] h-[24px]" />
                <p className="h-[24px] font-[400] leading-[19.36px] text-[#666666]">Deadline</p>
              </div>

              <div className="text-[16px] h-[24px] w-[97px] text-left flex flex-row gap-[24px]">
                <Image alt="description" src={pencil} className="w-[24px] h-[24px]" />
                <p className="h-[24px] font-[400] leading-[19.36px] text-[#666666]">Description</p>
              </div>
            </div>

            <div className="flex flex-col gap-[36px]">
              <select
                name="status"
                value={newTodo.status}
                onChange={handleChange}
                required
                className="h-[24px] text-[16px] leading-[24px] font-[400]"
              >
                <option value="">Not Selected</option>
                <option value="todo">To do</option>
                <option value="inprogress">In progress</option>
                <option value="underReview">Under review</option>
              </select>
              <select
                name="priority"
                value={newTodo.priority}
                onChange={handleChange}
                required
                className="h-[24px] text-[16px] leading-[24px] font-[400]"
              >
                <option value="">Not Selected</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="Urgent">Urgent</option>
              </select>
              <input
                type="date"
                name="deadline"
                min={today}
                value={newTodo.deadline}
                onChange={handleChange}
              />
              <textarea
                name="description"
                value={newTodo.description}
                onChange={handleChange}
                required
                placeholder="Enter Description"
                className="text-[16px] h-[50px] font-[400] resize-none"
              ></textarea>
            </div>
          </div>
          <div className="w-[208px] h-[24px] flex gap-[23px]">
            <Image src={plus} alt="add" className="w-[24px] h-[24px]" />
            <p className="h-[16px] leading-[19.36px] font-[400] ">Add custom property</p>
          </div>
          <hr />
          <p className="h-[16px] leading-[19.36px] font-[400] text-[ #C0BDBD]">
            Start writing, or drag your own files here.
          </p>
          <button type="submit" className="h-[40px] w-[140px] bg-blue-500 text-white rounded-[8px]">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
}

export default Drawer;
