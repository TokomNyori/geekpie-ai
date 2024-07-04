import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    console.log("REAched the backend!!!!!!")
    const geekpieEmail = process.env.NODEMAILER_MAIL_SENDER
    const pass = process.env.ZOHO_APP_PASS_GEEKPIE_AI

    if (!geekpieEmail || !pass) {
        return NextResponse.json({
            error: "No SenderEmail or ZohoPass defined in the environment variables."
        }, { status: 500 })
    }

    const { firstName, lastName, email, mobile, service } = await req.json();
    const tokomMail = "tokom.nyori@gmail.com"


    console.log("NAMES: ", firstName, lastName)


    const message = `
Hello Tokom,<br/><br/>
We have received a new service inquiry from a potential customer interested in GeekPie AI services.<br/><br/>
<b>Customer Details:</b><br/>
- <b>Name:</b> ${firstName} ${lastName}<br/>
- <b>Email:</b> ${email}<br/>
- <b>Mobile Number:</b> ${mobile}<br/>
- <b>Service of Interest:</b> ${service}<br/><br/>
    `;


    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.in',
        port: 465,
        secure: true,
        auth: {
            user: geekpieEmail,
            pass: pass,
        }
    })

    try {
        const mailOptions = {
            from: `"GeekPie Software Company" <${geekpieEmail}>`,
            to: tokomMail,
        };

        const mail = await transporter.sendMail({
            ...mailOptions,
            subject: "New Service Inquiry Notification for GeekPie AI",
            html: `
            <div style="padding: 12px 16px; background-color: #ffffff; color: #000000; border-radius: 10px; font-size: 16px;">
                <p style="margin: 0;">${message}</p>
                <br/>
                <p style="margin: 0;">Best regards,</p>
                <p style="margin: 0; font-weight: bold;">GeekPie Bot</p>
            </div>`
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Email sent successfully',
            }, { status: 200 });
    } catch (error: any) {
        console.error('Error occurred while sending email:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Email not sent',
                body: error.message,
            }, { status: 500 });
    }
} 