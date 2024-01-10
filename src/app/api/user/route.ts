import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";
import { getCurrentUser } from "@/libs/session";
import { db } from "@/libs/db";

// validation
const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function GET(req) {
  const currentUser = await getCurrentUser();

  try {
    if (!currentUser?.email) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    const { password, ...res } = user;

    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when getting user" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  try {

    const body = await req.json();
    const { email, name, password } = userSchema.parse(body);

    // email exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
export async function PATCH(req) {
  const currentUser = await getCurrentUser();

  try {
    const { data } = await req.json();

    const { email, ...userData } = data;

    if (!currentUser?.email && currentUser?.email !== data.email) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }

    const user = await db.user.update({
      where: {
        email: data.email,
      },
      data: userData,
    });
    return NextResponse.json(
      {
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("wakwak", error);
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
