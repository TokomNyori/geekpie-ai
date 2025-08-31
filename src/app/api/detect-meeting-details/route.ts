import { MeetingResponse } from "@/helpers/typeScriptTypes";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "ai";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI();

export async function POST(req: NextRequest) {
    const GEMINI_API_KEY = process.env.GOOGLE_API_KEY
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY

    const { messages } = await req.json()

    const human = messages
        .filter((m: Message) => m.role === "user" && typeof m.content === 'string')
        .map((m: Message) => m.content);
    const lastMessage = human[human.length - 1]


    console.log('Human -1 Message = !!!!!!!!!!!!!jyufvhjggckvtck')

    if (!OPENAI_API_KEY) {
        return NextResponse.json({
            error: "OPENAI API KEY is not defined in the environment variables."
        }, { status: 500 })
    }

    try {
        const response = await client.responses.create({
            model: "gpt-5",
            reasoning: { effort: "medium" },
            instructions:
                "You are a highly intelligent AI model that excels at detecting meeting details accurately and efficiently. When provided with a chat string, your task is to identify if the message contains the necessary details for scheduling a meeting, including the name, email, and purpose of the meeting. If you detect all three details, respond with {\"name\": \"name\", \"email\": \"email\", \"purpose\": \"purpose\"}. If you struggle to detect any of these details, make your best attempt to infer and respond with all three details as a last resort. Always try to detect and respond appropriately.",
            input: lastMessage,
        });

        const raw = response.output_text; // already valid JSON per schema
        const body = JSON.parse(raw) as MeetingResponse;

        return NextResponse.json(
            { success: true, message: "meeting details detected", body },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'Internal Server error',
            }, { status: 500 });
    }

}