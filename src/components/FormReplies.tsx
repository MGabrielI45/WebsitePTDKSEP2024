"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification, successNotification } from "@/app/(auth)/toast";
import { IoChatbubble } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { useRouter } from "next/navigation";
import CommentLike from "@/components/CommentLikes";

import { FC } from "react";

interface FormReplyProps {
  comment: {
    commentLikes: {
      id: string;
      authorEmail: string | null;
      commentId: string | null;
      createdAt: Date;
    }[];
    author: {
      id: string;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
    } | null;
    replies:
      | {
          id: string;
          text: string | null;
          authorEmail: string | null;
          commentId: string | null;
          createdAt: Date;
        }[]
      | null;
  } & {
    id: string;
    text: string;
    authorEmail: string | null;
    postId: string | null;
    createdAt: Date;
  };
  userEmail: string;
  likes: number;
}

const FormReply: FC<FormReplyProps> = ({ comment, userEmail, likes }) => {
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
          commentId: comment.id,
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
      <div className="flex justify-start place-items-center">
        <button
          className={`
          hover:text-blue-100 hover:scale-105 transition:all duration-200 ease-in-out
            ${activeElement == "hidden" ? "text-black" : "text-blue-100"}
          `}
          onClick={handleClick}
        >
          <div className="flex place-items-center">
            <IoChatbubble />
            <p className="ml-2 text-center">{comment.replies.length}</p>
          </div>
        </button>
        <div className="ml-6">
          <CommentLike comment={comment} userEmail={userEmail} likes={likes} />
        </div>
      </div>
      <div className={` w-full ${activeElement} flex mb-3`}>
        <input
          type="text"
          className="bg-gray-200 rounded-md focus:outline-none w-full px-4 py-3"
          name="comment"
          placeholder="Add Reply"
          value={reply}
          onChange={handleReplyChange}
        />
        <button
          onClick={handleSubmitReply}
          className="bg-red-100 hover:bg-red-200 text-white font-bold px-4 py-3 ml-3 rounded-md disabled:bg-gray-400"
        >
          <IoSend />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FormReply;
