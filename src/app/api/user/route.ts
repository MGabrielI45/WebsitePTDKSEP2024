import client from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import * as z from 'zod';
import {db} from "@/libs/db";

// validation
const userSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    })



// import {getCurrentUser} from "@/lib/session";

export async function GET(req) {
  // tunggu fitur login selesai untuk autentikasi
  // const user = await getCurrentUser();

  try {

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    


    const user = await client.user.findUnique({
      where: {
        email: email,
      },
    });

    return NextResponse.json(
      {
        user,
      },
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
  try {
      const body = await req.json();
      const { email, name, password } = userSchema.parse(body);

      // email exists
      const existingUserByEmail = await db.user.findUnique({
          where: {email: email}
      });
      if(existingUserByEmail) {
          return NextResponse.json({user: null, message: "User with this email already exists"}, {status : 409})
      }

      const hashedPassword = await hash(password, 10);
      const newUser = await db.user.create({
          data: {
              email,
              name,
              password: hashedPassword
          }
      });
      const { password: newUserPassword, ...rest } = newUser;

      return NextResponse.json({ user: rest, message: "User created successfully"}, { status: 201 });
  } catch(error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ message:  error.message }, { status: 500 });
      }
      return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
}
export async function PATCH(req) {
  // tunggu fitur login selesai
  // const user = await getCurrentUser(); 

  try {
    const { email, profilePicture } = await req.json(); // Sementara nerima profile picture doang, tunggu fitur lain selesai

    const user = await client.user.update({
      where: {
        email: email,
      },
      data : {
        profilePicture: profilePicture
      }
    });
    return NextResponse.json(
      {
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// export async function DELETE(req) {
//   const user = await getCurrentUser();

//   try {
//     const { email } = await req.json();

//     const user = await client.user.delete({
//       where: {
//         email: email,
//       },
//     });

//     return NextResponse.json(
//       {
//         user,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }