// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";
// import { ChatCompletionMessageParam } from "ai/prompts";

// const client = new OpenAI();



// export async function POST(req: NextRequest) {
//     try {
//         const { messages } = await req.json();
//         const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
//         const keyyy = process.env.OPENAI_API_KEY
//         console.log("API KEY:", keyyy)

//         const systemMessage: ChatCompletionMessageParam = {
//             role: "system",
//             content: "You are a customer service chatbot for GeekPie AI, a service offered by GeekPie Software company. GeekPie AI specializes in creating highly customized customer service chatbots for businesses. Your role is to assist users by providing information about GeekPie AI's services, features, and benefits, and to help answer any questions they may have about GeekPie Software company."
//         };

//         const response = await client.chat.completions.create({
//             model: "gpt-5-nano-2025-08-07",
//             stream: true,
//             messages: [
//                 systemMessage,
//                 ...messages
//             ]
//         })

//         const stream = OpenAIStream(response)
//         return new StreamingTextResponse(stream)

//     } catch (error) {
//         console.error("OpenAI Error:", error)
//         return NextResponse.json({
//             error: "An error occurred while processing the request. Please try again."
//         }, { status: 500 })
//     }
// }