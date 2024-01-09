import React, { FC } from "react";
import {db} from "@/libs/db";
import { format } from "date-fns";
import Replies from "@/components/Replies";
import FormReply from "@/components/FormReplies";
import CommentLike from "@/components/CommentLikes";
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
    },
  });

  const commentCounts = await db.comment.count({
    where: {postId}
  })

  console.log("OAWKOAWKWOAKWOAOWAK", commentCounts)

  

  return (
    <>
      <h3 className="font-semibold p-1">Discussion</h3>
      <div className="flex flex-col gap-5 m-3 ">
        {comments.map((comment) => (
          
          <div
            key={comment.id}
            className="flex w-full justify-between border rounded-md pt-5"
          >
            
           
            <div className=" w-full">
              <div className="grid grid-cols-12 border ml-5 mr-5  rounded-md">
                <div className="p-3 col-span-10">
                  <div className="flex gap-3 items-center">
                  <Link href={`/Profile/${comment.author.id}`}>
                    <img
                      src={comment.author?.image}
                      className="object-cover w-10 h-10 rounded-full border-2 border-red-100 scale-105"
                    />
                    </Link>
                    
                    <h3 className="font-bold text-blue-100">
                    <Link href={`/Profile/${comment.author.id}`}>
                      <span>
                      {comment.author?.name}
                      </span>
                      </Link>
                      <br />
                      <span  className="text-sm text-gray-400 font-normal">
                        {format(comment.createdAt, "HH:mm MMMM d, yyyy")}
                      </span>
                    </h3>
                    
                  </div>
                  <p className="text-gray-600 mt-2">{comment.text}</p>
                </div>

                <div className="flex flex-col items-end col-span-2 justify-start">
                  <CommentLike comment={comment} userEmail={user?.email} likes={0}/>
                </div>
                <div className="col-span-12 p-3">
                  <FormReply commentId={comment.id} />
                </div>
              </div>
              <div className="col-span-12 p-5 pt-0">
                <Replies commentId={comment.id} />
              </div>
            </div>
          </div>

          // <li key={comment.id} className="mb-4 bg-slate-300 p-2">
          //   <div className="flex items-center mb-2">
          //     <div className="text-blue-500 font-bold mr-2">
          //       {comment.author?.name}
          //     </div>
          //     <div className="text-gray-500">{format(comment.createdAt, 'MMMM d, yyyy')}</div>
          //   </div>
          //   <p>{comment.text}</p>
          // </li>
        ))}
      </div>
    </>
  );
};

export default Comments;