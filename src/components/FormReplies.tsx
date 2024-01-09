"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification, successNotification } from "@/app/(auth)/toast";

import { useRouter } from "next/navigation";

import { FC } from "react";

interface FormReplyProps {
  commentId: string;
}

const FormReply: FC<FormReplyProps> = ({ commentId }) => {
  const router = useRouter();

  const [reply, setReply] = useState<string>("");
  const [activeElement, setActiveElement] = useState("hidden");

  const handleClick = () => {
    if (activeElement == "hidden") {
      setActiveElement("");
    } else {
      setActiveElement("hidden");
    }
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setReply(e.target.value);
  };

  const handleSubmitReply = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (reply.trim() !== "") {
      try {
        const response = await axios.post("/api/replies", {
          text: reply,
          commentId: commentId,
        });
        
        if (response.status === 200) {
          setReply("");
          setActiveElement("hidden");
          successNotification("Reply has been created!");
          router.refresh();
        }

      } catch (error) {
        errorNotification("Oops! Something went wrong!");
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full">
      <button className="text-right text-blue-100 font-semibold hover:transform hover:-translate-y-1 transition duration-300 ease-in-out" onClick={handleClick}>{activeElement ? "Reply" : "Close reply"}</button>
      <div className={` w-full ${activeElement} grid grid-cols-12 gap-4`}>
        <input
          type="text"
          className="col-span-10 w-full py-2 px-3 my-3 border border-gray-300 bg-gray-200 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          name="comment"
          placeholder="Add Reply"
          value={reply}
          onChange={handleReplyChange}
        />
        <button
          onClick={handleSubmitReply}
          className="col-span-2 bg-red-100 hover:bg-red-200 text-white font-bold py-2 px-4 rounded-md my-3 disabled:bg-gray-400"
        >
          Submit Reply
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default FormReply;
