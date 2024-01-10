"use client";

import React, { useState } from "react";

// import { useRouter } from "next/navigation";
import axios from "axios";
import { FC } from "react";
import { FaHeart } from "react-icons/fa";

interface CommentLikeProps {
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

const CommentLike: FC<CommentLikeProps> = ({ comment, userEmail, likes }) => {
  // const router = useRouter();

  const handleSubmitLike = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
      setIsLiked(!isLiked);
      setWaiting(true);
      const response = await axios.post("/api/comment-likes", {
        commentId: comment.id,
      });
      if (response.status === 200) {
        // router.refresh();
        setWaiting(false);
      }
    } catch (error) {
      setWaiting(false);
      console.error(error);
    }
  };

  const [isLiked, setIsLiked] = useState(
    comment.commentLikes.find((c) => c.authorEmail === userEmail) ? true : false
  );
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [waiting, setWaiting] = useState(false);

  return (
    <button
      onClick={!waiting ? handleSubmitLike : () => {}}
      className={`
      fill-black transition:all duration-200 ease-in-out pr-3 py-3
      flex place-items-center 
      hover:scale-105 hover:text-red-100 hover:fill-red-100 
      ${isLiked ? "text-red-100 fill-red-100" : ""} `}
    >
      <FaHeart />
      <p className="ml-2 text-center">{currentLikes}</p>
      <div></div>
    </button>
  );
};

export default CommentLike;
