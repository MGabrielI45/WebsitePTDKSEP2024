import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
// import {getCurrentUser} from "@/lib/session";

export async function GET(req) {
  // tunggu fitur login selesai untuk autentikasi
  // const user = await getCurrentUser();

  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
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

export async function POST(req) {
  // tunggu fitur login selesai untuk autentikasi
  // const user = await getCurrentUser();
  try {

    //  isi datanya
    //  data = {
    // username: username,
    // email: email,
    // hashedpassword: hashedpassword,
    // name: name,
    // birthTimePlace: birthTimePlace,
    // faculty: faculty,
    // absentNumber: absentNumber,
    // phoneNumber: phoneNumber,
    // emergencyNumber: emergencyNumber,
    // lineId: lineId,
    // instagram: instagram,
    // profilePicture: profilePicture
    // }

    const user = await prisma.user.create({
      data: data,
    });

    return NextResponse.json(
      {
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when inserting new user" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  // tunggu fitur login selesai
  // const user = await getCurrentUser(); 

  try {
    const { email } = await req.json();

    const user = await await prisma.user.update({
      where: {
        email: email,
      },
      data: data,
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

//     const user = await prisma.user.delete({
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