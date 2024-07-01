import { google } from '@ai-sdk/google';
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function POST(req: NextRequest) {
    try {
        const { messages, data } = await req.json();
        const content = messages.map((cont: any) => (
            cont.content
        ))
        const prompt: string = data?.prompt

        console.log(prompt ? "Yessss" : "Nooooooo");
        const GEMINI_API_KEY = process.env.GOOGLE_API_KEY

        if (!GEMINI_API_KEY) {
            return NextResponse.json({
                error: "GEMINI API KEY is not defined in the environment variables."
            }, { status: 500 })
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
        const model = genAI.getGenerativeModel(
            {
                model: "gemini-1.5-flash",
                systemInstruction: "You are GeekPie Bot, a customer service chatbot for GeekPie AI, a premier offering from GeekPie Software Company. GeekPie AI specializes in developing highly customized customer service chatbots tailored to the unique needs of businesses. Your primary role is to assist users by providing detailed information about GeekPie AI’s services, features, and benefits, as well as addressing any inquiries they may have about GeekPie Software Company. Your responses should be concise and human-like. Your expertise ensures users receive accurate, helpful, and timely responses to enhance their experience with GeekPie AI."
            }
        )

        const streamResponse = await model.generateContentStream(prompt ? prompt : content)

        const stream = GoogleGenerativeAIStream(streamResponse)
        return new StreamingTextResponse(stream)

    } catch (error) {
        console.error("GeminiAI Error:", error)
        return NextResponse.json({
            error: "An error occurred while processing the request. Please try again."
        }, { status: 500 })
    }
}