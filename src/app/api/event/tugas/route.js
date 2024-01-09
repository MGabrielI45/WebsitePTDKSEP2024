import { NextResponse } from "next/server";
import { db } from "@/libs/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, date, description } = body;
    const createdTugas = await db.event.create({
      data: {
        title: title,
        date: new Date(date),
        description: description,
        tugas: {
          create: {
            createdAt: new Date(),
          },
        },
      },
    });
    console.log(createdTugas);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const readTugas = await db.tugas.findMany({
      include: {
        event: true,
      },
    });
    console.log(readTugas);
    return NextResponse.json(readTugas);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  const body = await req.json();
  const { id, title, date, description, grade } = body;
  try {
    const updatedTugas = await db.event.findUnique({
      where: {
        id: id,
      },
      data: {
        title: title,
        date: new Date(date),
        description: description,
        tugas: {
          grade: grade,
        },
      },
    });
    console.log(updatedTugas);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const deletedTugas = await db.event.delete({
      where: {
        id: id,
      },
    });
    console.log(deletedTugas);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
