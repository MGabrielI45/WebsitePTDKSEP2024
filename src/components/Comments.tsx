import React, { FC } from "react";
import { db } from "@/libs/db";
import { format } from "date-fns";
import Replies from "@/components/Replies";
import FormReply from "@/components/FormReplies";
import { getCurrentUser } from "@/libs/session";
import Link from "next/link";

interface CommentsProps {
  postId: string;
}

const Comments: FC<CommentsProps> = async ({ postId }) => {
  const user = await getCurrentUser();
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: true,
      commentLikes: true,
      replies: true,
    },
  });

  comments
    .sort((a, b) => {
      return a.commentLikes.length - b.commentLikes.length;
    })
    .reverse();

  return (
    <>
      <h3 className="font-semibold p-3">Comments</h3>
      <div className="flex flex-col gap-5 m-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex w-full justify-between my-2">
            <div className=" w-full">
              <div className="grid grid-cols-12 shadow-lg rounded-lg bg-white pt-3">
                <div className="px-3 col-span-10">
                  <div className="flex gap-3 items-center">
                    <Link href={`/Profile/${comment.author.id}`}>
                      <img
                        src={comment.author?.image}
                        className="object-cover w-10 h-10 rounded-full border-2 border-red-100 scale-105 hover:brightness-80"
                      />
                    </Link>

                    <h3 className="font-bold text-blue-100">
                      <Link href={`/Profile/${comment.author.id}`}>
                        <span className="hover:text-blue-200">
                          {comment.author?.name}
                        </span>
                      </Link>
                      <br />
                      <span className="text-sm text-gray-400 font-normal">
                        {format(comment.createdAt, "HH:mm MMMM d, yyyy")}
                      </span>
                    </h3>
                  </div>
                  <p className="text-black font-semibold mt-2">
                    {comment.text}
                  </p>
                </div>
                <div className="col-span-12 px-3 flex items-start">
                  <FormReply
                    comment={comment}
                    userEmail={user?.email}
                    likes={comment.commentLikes.length}
                  />
                </div>
              </div>
              <div className="col-span-12 pl-8">
                <Replies commentId={comment.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
