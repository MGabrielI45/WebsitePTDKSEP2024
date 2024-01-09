import { NextResponse } from "next/server";
import { db } from "@/libs/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, date, description } = body;
    const createdDay = await db.event.create({
      data: {
        title: title,
        date: new Date(date),
        description: description,
        day: {
          create: {},
        },
      },
    });
    console.log(createdDay);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const readDay = await db.event.findUnique({
      where: {
        day: {
          some: {},
        },
      },
      include: {
        event: true,
      },
    });
    console.log(readDay);
    return NextResponse.json(readDay);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  const body = await req.json();
  const { id, title, date, description } = body;
  try {
    const updatedDay = await db.event.findUnique({
      where: {
        id: id,
      },
      data: {
        title: title,
        date: new Date(date),
        description: description,
      },
    });
    console.log(updatedDay);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const deletedDay = await db.event.delete({
      where: {
        id: id,
      },
    });
    console.log(deletedDay);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
