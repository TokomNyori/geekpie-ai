import { MeetingResponse } from "@/helpers/typeScriptTypes";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const GEMINI_API_KEY = process.env.GOOGLE_API_KEY

    const { messages } = await req.json()

    const human = messages
        .filter((m: Message) => m.role === "user" && typeof m.content === 'string')
        .map((m: Message) => m.content);
    const lastMessage = human[human.length - 1]


    console.log('Human -1 Message = !!!!!!!!!!!!!jyufvhjggckvtck')
    // console.log(lastMessage)

    if (!GEMINI_API_KEY) {
        return NextResponse.json({
            error: "GEMINI API KEY is not defined in the environment variables."
        }, { status: 500 })
    }


    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
        const aiMailmodel = genAI.getGenerativeModel(
            {
                model: "gemini-1.5-flash",
                systemInstruction: `You are a highly intelligent AI model that excels at detecting meeting details accurately and efficiently. When provided with a chat string, your task is to identify if the message contains the necessary details for scheduling a meeting, including the name, email, and purpose of the meeting. If you detect all three details, respond with {\"name\": \"name\", \"email\": \"email\", \"purpose\": \"purpose\"}. If you struggle to detect any of these details, make your best attempt to infer and respond with all three details as a last resort. Always try to detect and respond appropriately.`
            }
        )

        const response = await aiMailmodel.generateContent(lastMessage)
        const stringResponse = response.response.text()
        console.log('MEEEETTTTTTTTTIIIINNNNGGGGG!!!!!!!!---');

        // Ensure that stringResponse is a valid JSON string
        const trimmedResponse = stringResponse.trim();

        // Removing any unexpected characters like backticks
        const cleanedResponse = trimmedResponse.replace(/```json|```/g, '').trim();

        if (cleanedResponse.startsWith('{') && cleanedResponse.endsWith('}')) {
            const jsonObject: MeetingResponse = JSON.parse(cleanedResponse);
            console.log(jsonObject);

            console.log('Meeting details detected:', jsonObject);
            return NextResponse.json(
                {
                    success: true,
                    message: 'meeting details detected',
                    body: jsonObject
                }, { status: 200 });
        } else {
            console.error('Response is not valid JSON:', cleanedResponse);
            return NextResponse.json({
                success: false,
                message: 'Response format is invalid.',
            }, { status: 400 }); // Or 500 depending on your decision on responsibility
        }
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'Internal Server error',
            }, { status: 500 });
    }

}