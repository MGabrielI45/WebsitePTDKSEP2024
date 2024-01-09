import React from "react";
import Link from "next/link";

import Comments from "@/components/Comments";
import FormComment from "@/components/FormComments";
import { db } from "@/libs/db";
import { format } from "date-fns";

import { FC } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/libs/session";
import { IoIosArrowBack } from "react-icons/io";

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

const PostDetailPage: FC<PostDetailPageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const post = await db.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });

  return (
    <div className="max-w-4xl mx-auto pb-8 min-h-[80vh]">
      <div className="flex items-center relative">
        <Link href="/Diskusi">
          <IoIosArrowBack className="text-[48px] rounded-lg text-black mr-2 hover:transform hover:bg-gray-300 hover:rounded-lg transition duration-300 ease-in-out absolute top-[34px] left-[-50px]" />
        </Link>
        <div className="mx-3">
          <h1 className="text-[48px] text-red-100 font-bold mt-5">{post?.title}</h1>
          <div className="flex gap-3 items-center ">
            <Link href={`/Profile/${post.author.id}`}>
              <img
                src={post.author?.image}
                className="object-cover w-8 h-8 rounded-full border-2 border-red-100 scale-105 hover:brightness-75"
              />
            </Link>

            <h3 className="font-bold text-blue-100 text-sm">
              <Link href={`/Profile/${post.author.id}`}>
                <span className="hover:text-blue-200" >{post.author?.name}</span>
              </Link>
              <br />
              <span className="text-xs text-gray-400 font-normal">
                {format(post.createdAt, "HH:mm MMMM d, yyyy")}
              </span>
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-6 mb-4 mx-3 text-[24px] font-semibold">{post?.content}</div>

      <Comments postId={params.id} />
      <FormComment postId={params.id} />
    </div>
  );
};

export default PostDetailPage;
