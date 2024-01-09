import { ForgotPasswordEmail } from "@/app/emails/ForgotPassword";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import client from "@/libs/prismadb";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    // Find corresponding valid email
    const user = await client.user.findUnique({
      where: {
        email: email,
        accounts: {
          none: {},
        },
      },
    });

    // If invalid email
    if (user == null) {
      return NextResponse.json(
        { message: "User does not exist or is registered via google" },
        { status: 499 }
      );
    }

    // Fetch Email API
    const data = await resend.emails.send({
      from: "Admin <onboarding@resend.dev>",
      to: user.email,
      subject: "Forgot Password",
      react: ForgotPasswordEmail({
        email: user.email,
        name: user.name,
        id: user.id,
      }),
    });
    console.log(data.data);

    // If email not sent, but request was successful
    if (data.data == null) {
      return NextResponse.json({ message: "Email not sent" }, { status: 499 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
