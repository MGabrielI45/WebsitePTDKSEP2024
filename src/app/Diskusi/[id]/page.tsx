import React from "react";
import Link from "next/link";

import Comments from "@/components/Comments";
import FormComment from "@/components/FormComments";
import { db } from "@/libs/db";

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
    <div className="max-w-4xl mx-auto py-8 min-h-[80vh]">
      <div className="flex items-center">
        <Link href="/Diskusi">
          <IoIosArrowBack className="text-[48px] rounded-lg text-black mr-2 hover:transform hover:bg-gray-300 hover:rounded-lg transition duration-300 ease-in-out" />
        </Link>
        <div className="">
          <h1 className="text-[48px] text-red-100 font-bold">{post?.title}</h1>
          <p className="font-semibold text-blue-100">
            Written by: {post?.author?.name}
          </p>
        </div>
      </div>
      <div className="mt-6 mb-4 text-[24px] font-semibold">{post?.content}</div>

      <Comments postId={params.id} />
      <FormComment postId={params.id} />
    </div>
  );
};

export default PostDetailPage;
