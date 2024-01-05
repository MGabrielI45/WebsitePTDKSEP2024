import { forgotPasswordEmail } from '../../emails/forgot-password';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const body = await req.json()
        const {username} = body
        const data = await resend.emails.send({
            from: 'Admin <onboarding@resend.dev>',
            to: 'timothyniels@gmail.com',
            subject: 'Forgot Password',
            react: forgotPasswordEmail({ 
                username: username
            })
        })

        return NextResponse.json({data})
    } 
    catch (error) {
        return NextResponse.json({error})
    }
};
