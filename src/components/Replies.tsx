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
          <div className="flex justify-between border ml-5 rounded-lg shadow-lg">
            <div className="p-3">
              <div className="flex gap-3 items-center">
                <Link href={`/Profile/${reply.author.id}`}>
                  <img
                    src={reply.author?.image}
                    className="object-cover w-10 h-10 rounded-full border-2 border-red-100  scale-105 hover:brightness-75"
                  />
                </Link>
                <h3 className="font-bold text-blue-100">
                  <Link href={`/Profile/${reply.author.id}`}>
                    <span className="hover:text-blue-200">{reply.author?.name}</span>
                  </Link>
                  <br />
                  <span className="text-sm text-gray-400 font-normal">
                    {format(reply.createdAt, "HH:mm MMMM d, yyyy")}
                  </span>
                </h3>
              </div>
              <p className="text-gray-600 font-semibold mt-2">{reply.text}</p>
            </div>

           
          </div>
        </div>
      ))}
    </>

  
  );
};

export default Replies;
