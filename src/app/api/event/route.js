import { NextResponse } from "next/server";
import { db } from "@/libs/db";

export async function GET() {
  try {
    const reminders = await db.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      include: {
        tugas: true,
        day: true,
      },
      orderBy: {
        date: "asc",
      },
    });
    console.log(reminders);
    return NextResponse.json(reminders);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
