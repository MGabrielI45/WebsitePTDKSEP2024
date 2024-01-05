import { forgotPasswordEmail } from '../../emails/forgot-password';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.re_8WYU3XNW_LHKi5WmuhpFFxFvS58AR4SUL);

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
