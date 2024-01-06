import client from "@/lisb/prismadb";
import { NextResponse } from "next/server";
// import {getCurrentUser} from "@/lib/session";

export async function GET(req) {
  // tunggu fitur login selesai untuk autentikasi
  // const user = await getCurrentUser();

  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title')

    const reminder = await client.reminder.findUnique({
      where: {
        title: title
    },
    });

    return NextResponse.json(
      {
        reminder,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when getting reminder" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  // tunggu fitur login selesai untuk autentikasi
  // const user = await getCurrentUser();

  const { data } = await req.json();

  try {

    // isi datanya 
    // data = {
    //     title: title, 
    //     descriptionLink: descriptionLink,
    //     deadlineDate: deadlineDate
    // }

    const reminder = await client.reminder.create({
      data: data
  })
    return NextResponse.json(
      {
        reminder,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when inserting new reminder" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  // tunggu fitur login selesai
  // const user = await getCurrentUser(); 

  try {
    const { title, data } = await req.json();

    const reminder = await await client.reminder.update({
      where: {
        title: title
    },
      data: data,
    });
    return NextResponse.json(
      {
        reminder,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when updating reminder" },
      { status: 500 }
    );
  }
}

// export async function DELETE(req) {
//   // tunggu fitur login selesai
//   // const user = await getCurrentUser();

//   try {
//     const { title } = await req.json();

//     const reminder = await client.reminder.delete({
//       where: {
//         title: title
//     },
//     });

//     return NextResponse.json(
//       {
//         reminder,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Something went wrong when deleting reminder" },
//       { status: 500 }
//     );
//   }
// }



