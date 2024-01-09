import {getCurrentUser} from "@/libs/session";
import {NextResponse} from "next/server";
import {db} from "@/libs/db";

export async function POST(req: Request){
  const user = await getCurrentUser();

  try {
    if(!user?.email){
      return NextResponse.json({message:"Not Authenticated!"}, {status: 401})
    }

    

    const {postId, text} = await req.json();
    
    
    const newPost = await db.comment.create({
      data: {
        postId, text, authorEmail: user.email
      }
    })

    

    return NextResponse.json({
      newPost
    }, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "Something went wrong"}, {status: 500}) 
  }
}