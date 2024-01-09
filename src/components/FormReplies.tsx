"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";


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
          router.refresh();
        }

      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full">
      <button className="text-right text-blue-500" onClick={handleClick}>{activeElement ? "Reply" : "Close reply"}</button>
      <div className={`mt-4 w-full ${activeElement}`}>
        <label
          htmlFor="reply"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Add Reply
        </label>
        <input
          type="text"
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          name="comment"
          value={reply}
          onChange={handleReplyChange}
        />
        <button
          onClick={handleSubmitReply}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2 disabled:bg-gray-400"
        >
          Submit Reply
        </button>
      </div>
    </div>
  );
};

export default FormReply;
