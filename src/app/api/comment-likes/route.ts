import { getCurrentUser } from "@/libs/session";
import { NextResponse } from "next/server";
import {db} from "@/libs/db";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  try {


    const { commentId } = await req.json();

    if (!user?.email) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }


    const existingLike = await db.commentLike.findFirst({
      where: {
        authorEmail: user.email,
        commentId: commentId,
      },
    });

    
    

    if (!existingLike) {
      // If the user hasn't liked the comment, proceed to update the likes


      // Record the user's like in the CommentLike table
      const res = await db.commentLike.create({
        data: {
          authorEmail: user?.email,
          commentId,
        },
      });

      return NextResponse.json(
        {
          res,
        },
        { status: 200 }
      );
    } else {
      
      // Also, remove the user's like record from the CommentLike table
      const res = await db.commentLike.delete({
        where: {
          id: existingLike.id,
        },
      });

      return NextResponse.json(
        {
          res,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error },
      { status: 500 }
    );
  }
}
