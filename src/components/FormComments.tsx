"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification, successNotification } from "@/app/(auth)/toast";
import { useRouter } from "next/navigation";

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
    <div className="sticky bottom-4 ">
      <div className="mt-4 grid grid-cols-12 gap-4 shadow-md bg-white">
        
        <input
          type="text"
          className="col-span-10 m-3 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          name="comment"
          value={comments}
          placeholder="Add Comment"
          onChange={handleCommentChange}
        />
        <button
          onClick={handleSubmitComment}
          className=" col-span-2 m-3 bg-blue-100 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded-lg mt-2 disabled:bg-gray-400"
        >
          Submit Comment
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FormComment;
