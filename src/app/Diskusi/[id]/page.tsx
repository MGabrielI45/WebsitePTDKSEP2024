import React from "react";

import Comments from "@/components/Comments";
import FormComment from "@/components/FormComments";
import {db} from "@/libs/db";

import { FC } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from '@/libs/session'

interface PostDetailPageProps {
  params: {
    id: string
  }
}

const PostDetailPage: FC<PostDetailPageProps> = async ({params}) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/sign-in')
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
      <h1 className="text-3xl font-bold">Discussion</h1>
      <p>Written by: {post?.author?.name}</p>
      <div className="mt-4">
        {post?.content}
      </div>

      <Comments  postId={params.id}/>
      <FormComment postId={params.id} />
    </div>
  );
};

export default PostDetailPage;
