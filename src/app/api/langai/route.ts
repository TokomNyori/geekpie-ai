import { google } from '@ai-sdk/google';
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAIStream, LangChainStream, StreamingTextResponse } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, PromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts"
import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
import { createRetrievalChain } from "langchain/chains/retrieval"
import { getVectorStrore } from '@/libs/astradb';
import { GeminiMessage } from '@/helpers/typeScriptTypes';
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever"


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

        console.log(messages)

        const { stream, handlers } = LangChainStream();

        const model = new ChatGoogleGenerativeAI({
            model: "gemini-1.5-flash",
            streaming: true,
            callbacks: [handlers],
            verbose: true
        })

        const rephrasingModel = new ChatGoogleGenerativeAI({
            model: "gemini-1.5-flash",
            verbose: true
        })

        const retriever = (await getVectorStrore()).asRetriever();

        const rephrasePrompt = ChatPromptTemplate.fromMessages([
            new MessagesPlaceholder("chat_history"),
            ["user", "{input}"],
            [
                "user",
                "Based on the prior conversation, create a search query to find information relevant to the current question." +
                "Don't leave out any relevant keywords. Only return the query and no other text." +
                "Handle irrelevant or off-topic queries with polite apologies but do not entertain further."
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
                "You specialize in handling customer queries on GeekPie AI's portfolio website with precise and appropriate responses." +
                "Your primary role is to assist users by providing detailed information about GeekPie AI’s services, features, and benefits, as well as addressing any inquiries they may have about GeekPie AI or GeekPie Software Company." +
                "Your responses should be concise and human-like, formatted in Markdown. Your expertise ensures users receive accurate, helpful, and timely responses to enhance their experience with GeekPie AI." +
                "Handle irrelevant or off-topic queries with polite apologies but do not entertain further." +
                "Identify and convert all links to the appropriate Markdown format." +
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
        console.error("GeminiAI Error:", error)
        return NextResponse.json({
            error: "An error occurred while processing the request. Please try again."
        }, { status: 500 })
    }
}