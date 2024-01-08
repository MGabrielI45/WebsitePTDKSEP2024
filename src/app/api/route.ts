import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const session = await getServerSession(authOptions);

    return NextResponse.json({ authenticated: !!session})
}