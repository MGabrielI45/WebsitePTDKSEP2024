"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification, successNotification } from "@/app/(auth)/toast";
import { useRouter } from "next/navigation";
import { IoSend } from "react-icons/io5";

import { FC } from "react";

interface FormCommentProps {
  postId: string;
}

const FormComment: FC<FormCommentProps> = ({ postId }) => {
  const router = useRouter();

  const [comments, setComments] = useState<string>("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setComments(e.target.value);
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (comments.trim() !== "") {
      try {
        const response = await axios.post("/api/comments", {
          text: comments,
          postId: postId,
        });

        if (response.status === 200) {
          setComments("");
          successNotification("Comment has been created!");
          router.refresh();
        }
      } catch (error) {
        errorNotification("Oops! Something went wrong!");
        console.error(error);
      }
    }
  };

  return (
    <div className="sticky bottom-8 w-full">
      <div className="mt-4 flex bg-[#DCDCDC] rounded-lg shadow-lg">
        <input
          type="text"
          className="my-3 ml-3 w-full py-3 px-4 bg-[#DCDCDC] focus:outline-none"
          name="comment"
          value={comments}
          placeholder="Add Comment"
          onChange={handleCommentChange}
        />
        <button
          onClick={handleSubmitComment}
          className="my-3 mr-3 p-4 bg-red-100 hover:bg-red-200 text-white rounded-lg disabled:bg-gray-400"
        >
          <IoSend />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FormComment;
