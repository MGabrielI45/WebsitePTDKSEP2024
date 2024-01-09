import {getCurrentUser} from "@/libs/session";
import {NextResponse} from "next/server";
import {db} from "@/libs/db";

export async function GET(req) {
  
  const currentUser = await getCurrentUser();

  try {
    if(!currentUser?.email){
      return NextResponse.json({message:"Not Authenticated!"}, {status: 401})
    }
    
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
      },
    });
    

    return NextResponse.json(
      { posts },
      { status: 200 }
    );
  } catch (error) {

    return NextResponse.json(
      { message: "Something went wrong when getting user" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request){
  const user = await getCurrentUser();

  try {
    if(!user?.email){
      return NextResponse.json({message:"Not Authenticated!"}, {status: 401})
    }

    const {title, content} = await req.json();
    
    const newPost = await db.post.create({
      data: {
        title, content, authorEmail: user.email
      }
    })

    return NextResponse.json({
      newPost
    }, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "Something went wrong"}, {status: 500}) 
  }
}