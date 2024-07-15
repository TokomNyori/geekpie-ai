import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAIStream, LangChainStream, StreamingTextResponse } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, PromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts"
import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
import { createRetrievalChain } from "langchain/chains/retrieval"
import { getVectorStrore } from '@/libs/astradb';
import { GeminiMessage, MeetingResponse } from '@/helpers/typeScriptTypes';
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";


export async function POST(req: NextRequest) {
    try {
        const { messages, data } = await req.json();

        const chatHistory = messages
            .slice(0, -1)
            .map((m: GeminiMessage) =>
                m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
            );

        const lastMessage = messages[messages.length - 1].content
        //const clientPrompt: string = data?.prompt

        // Complete the redis setup here...

        const { stream, handlers } = LangChainStream();

        const model = new ChatGoogleGenerativeAI({
            model: "gemini-1.5-flash",
            streaming: true,
            callbacks: [handlers],
        })

        const rephrasingModel = new ChatGoogleGenerativeAI({
            model: "gemini-1.5-flash",
        })

        const retriever = (await getVectorStrore()).asRetriever();

        const rephrasePrompt = ChatPromptTemplate.fromMessages([
            new MessagesPlaceholder("chat_history"),
            ["user", "{input}"],
            [
                "user",
                "Based on the prior conversation, create a search query to find information relevant to the current question." +
                "Don't leave out any relevant keywords. Only return the query and no other text."
            ]
        ])

        const historyAwareRetrieverChain = await createHistoryAwareRetriever({
            llm: rephrasingModel,
            retriever,
            rephrasePrompt,
        })

        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                "You are GeekPie Bot, a customer service chatbot for GeekPie AI, a premier offering from GeekPie Software Company." +
                "You specialize in handling customer queries on GeekPie AI's landing page with precise and appropriate responses." +
                "Your primary role is to assist users by providing detailed information about GeekPie AI’s services, features, and benefits, as well as addressing any inquiries they may have about GeekPie AI or GeekPie Software Company." +
                "Your responses should be concise and human-like, formatted in Markdown. Your expertise ensures users receive accurate, helpful, and timely responses to enhance their experience with GeekPie AI." +
                "Handle irrelevant or off-topic queries with friendly apologies but do not entertain further. Be consistent in handling irrelevant or off-topic queries in the entire conversation." +
                "Specifically, do not entertain general off-topic questions such as 'How do I write a Python program?', 'Teach me Java', 'Suggest me books', etc with friendly apologies. Instead, respond with friendly apologies." +
                "Identify and convert all links to the appropriate Markdown format." +
                "Greet users in a friendly way. If users greet you, greet them back warmly." +
                "Always include the symbol '^^' at the end of your response only when the user asks you to schedule or arrange a meeting. This symbol '^^' acts as a trigger to open the dialog box for entering meeting details. Do not use this symbol after the user has submitted the meeting details." +
                "You have the ability to open the dialog box by using the symbol '^^' at the end of your response for users to enter their meeting details." +
                "After scheduling the meeting, do not schedule the meeting again but instead reply to the user, 'The meeting has already been scheduled. If you need to reschedule the meeting, you can reply to the confirmation email with your request.'" +
                "Answer the user's questions based on the below context.\n\n" +
                "Context:\n{context}"
            ],
            new MessagesPlaceholder("chat_history"),
            ["user", "{input}"]
        ])

        const combineDocsChain = await createStuffDocumentsChain({
            llm: model,
            prompt,
            documentSeparator: "\n----------\n"
        })

        const retrivalChain = await createRetrievalChain({
            combineDocsChain,
            retriever: historyAwareRetrieverChain,
        })

        retrivalChain.invoke({
            input: lastMessage,
            chat_history: chatHistory
        })

        return new StreamingTextResponse(stream)

    } catch (error) {
        // console.error("GeminiAI Error:", error)
        return NextResponse.json({
            error: "An error occurred while processing the request. Please try again."
        }, { status: 500 })
    }
}