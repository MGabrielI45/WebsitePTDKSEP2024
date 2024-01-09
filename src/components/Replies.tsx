import React, { FC } from "react";
import { db } from "@/libs/db";
import { format } from "date-fns";
import Link from "next/link";

interface RepliesProps {
  commentId: string;
}

const Replies: FC<RepliesProps> = async ({ commentId }) => {
  const replies = await db.reply.findMany({
    where: {
      commentId,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      author: true,
    },
  });

  return (
    <>
      {replies.map((reply) => (
        <div key={reply.id} className="">
          <div className="text-gray-300 font-bold pl-14">|</div>
          <div className="flex justify-between border ml-5 rounded-md">
            <div className="p-3">
              <div className="flex gap-3 items-center">
                <Link href={`/Profile/${reply.author.id}`}>
                  <img
                    src={reply.author?.image}
                    className="object-cover w-10 h-10 rounded-full border-2 border-red-100  scale-105"
                  />
                </Link>
                <h3 className="font-bold text-blue-100">
                  <Link href={`/Profile/${reply.author.id}`}>
                    <span>{reply.author?.name}</span>
                  </Link>
                  <br />
                  <span className="text-sm text-gray-400 font-normal">
                    {format(reply.createdAt, "HH:mm MMMM d, yyyy")}
                  </span>
                </h3>
              </div>
              <p className="text-gray-600 mt-2">{reply.text}</p>
            </div>

            <div className="flex flex-col gap-3 pr-3 py-3">
              {/* <div>
                <svg
                  className="w-6 h-6 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </div>
              <div>
                <svg
                  className="w-6 h-6 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </>

    // {replies.map((reply) => (
    //   <li key={reply.id} className="mb-4 bg-slate-300 p-2">
    //     <div className="flex items-center mb-2">
    //       <div className="text-blue-500 font-bold mr-2">
    //         {reply.author?.name}
    //       </div>
    //       <div className="text-gray-500">
    //         {format(reply.createdAt, "MMMM d, yyyy")}
    //       </div>
    //     </div>
    //     <p>{reply.text}</p>
    //   </li>
    // ))}
  );
};

export default Replies;
