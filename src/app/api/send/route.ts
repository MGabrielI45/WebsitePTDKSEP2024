import { forgotPasswordEmail } from '@/app/emails/forgot-password';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import client from "@/libs/prismadb";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    

    try {
        const body = await req.json()
        const {username} = body

        const user = await client.user.findUnique({
            where: {
              username: username,
            },
        });

       

        const data = await resend.emails.send({
            from: 'Admin <onboarding@resend.dev>',
            to: 'timothyniels@gmail.com',
            subject: 'Forgot Password',
            react: forgotPasswordEmail({ 
                email: user.email,
                username: user.username,
                id: user.id,
            })
        })

        console.log(data)
        return NextResponse.json({data})
    } 
    catch (error) {
        return NextResponse.json({error})
    }
};
