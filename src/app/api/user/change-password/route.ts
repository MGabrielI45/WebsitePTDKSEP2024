import { NextResponse } from "next/server";
import { hash, compare } from "bcrypt";
import * as z from "zod";
import { getCurrentUser } from "@/libs/session";
import { db } from "@/libs/db";

const userSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
  newPassword: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function PATCH(req: Request) {
  const currentUser = await getCurrentUser();

  try {
    if (!currentUser?.email) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { email, password, newPassword } = userSchema.parse(body);

    // email exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (!existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email doesn't exists" },
        { status: 409 }
      );
    }
    const passwordMatch = await compare(password, existingUserByEmail.password);
    if(!passwordMatch) {
      return NextResponse.json(
        { user: null, message: "Password is incorrect" },
        { status: 410 }
      );
    }

    const hashedPassword = await hash(newPassword, 10);
    const newUser = await db.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Password changed successfully" },
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




