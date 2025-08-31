import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {

    console.log("Send Mail API")
    const geekpieEmail = process.env.NODEMAILER_MAIL_SENDER
    const pass = process.env.ZOHO_APP_PASS_GEEKPIE_AI

    if (!geekpieEmail || !pass) {
        return NextResponse.json({
            error: "No SenderEmail or ZohoPass defined in the environment variables."
        }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.in',
        port: 465,
        secure: true,
        auth: {
            user: geekpieEmail,
            pass: pass,
        }
    });

    const { mailType, subject, firstName, lastName, email, mobile, service, customerName, meetingMode, meetingDateTime } = await req.json();
    let mailOptions = {}
    let message;

    if (mailType === "service") {

        const tokomMail = "tokom.nyori@gmail.com"

        mailOptions = {
            from: `"GeekPie Software Company" <${geekpieEmail}>`,
            to: tokomMail,
        };

        message = `
            Hello Tokom,<br/><br/>
            We have received a new service inquiry from a potential customer interested in GeekPie AI services.<br/><br/>
            <b>Customer Details:</b><br/>
            - <b>Name:</b> ${firstName} ${lastName}<br/>
            - <b>Email:</b> ${email}<br/>
            - <b>Mobile Number:</b> ${mobile}<br/>
            - <b>Service of Interest:</b> ${service}<br/><br/>
        `;
    } else if (mailType === "meeting") {
        // const { customerName, customerEmail, customerPurpose, meetingDateTime } = await req.json();
        mailOptions = {
            from: `"GeekPie Software Company" <${geekpieEmail}>`,
            to: email,
        };


        let detailsForMeetingMode;
        if (meetingMode === 'In-Person') {
            detailsForMeetingMode = `Our office address is: Gohpur Tinali near K3 Gas Service, Itanagar Capital Complex, Itanagar, Arunachal Pradesh - 791111, India.`;
        } else if (meetingMode === 'Video Call') {
            detailsForMeetingMode = `We will send you a video call link 3 hours before the scheduled date and time of the meeting.`;
        } else {
            detailsForMeetingMode = `We will call you at the scheduled time on the provided number.`;
        }

        message = `
            Dear ${customerName},<br/><br/>
            Thank you for scheduling a meeting with the GeekPie team. We are excited to discuss your needs and how we can assist you.<br/><br/>
            <b>Meeting Details:</b><br/>
            - <b>Name:</b> ${customerName}<br/>
            - <b>Email:</b> ${email}<br/>
            - <b>Mobile Number:</b> ${mobile}<br/>
            - <b>Service of Interest:</b> ${service}<br/>
            - <b>Meeting Mode:</b> ${meetingMode}<br/>
            - <b>Date and Time:</b> ${meetingDateTime}<br/><br/>
            ${detailsForMeetingMode}<br/><br/>
            If you need to make any changes to the date or time of the meeting, please feel free to reply to this email, and we will be happy to accommodate your request.<br/><br/>
            We look forward to speaking with you.
        `;
    }

    console.log("Transporter Reached......")
    try {
        const mail = await transporter.sendMail({
            ...mailOptions,
            subject: subject,
            html: `
                <div style="padding: 12px 16px; background-color: #ffffff; color: #000000; border-radius: 10px; font-size: 16px;">
                    <p style="margin: 0;">${message}</p>
                    <br/>
                    <p style="margin: 0;">Best regards,</p>
                    <p style="margin: 0; font-weight: bold;">GeekPie Software Company</p>
                    <p style="margin: 0;">You dream, we create!</p>
                </div>`
        });

        // console.log('NOODEEEMAILER-----------')
        // console.log(mail)

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