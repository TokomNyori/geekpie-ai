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
import { MailSender } from "@/helpers/helperFun";


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
            verbose: true,
        })

        const rephrasingModel = new ChatGoogleGenerativeAI({
            model: "gemini-1.5-flash",
            verbose: true,
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
                "You specialize in handling customer queries on GeekPie AI's portfolio website with precise and appropriate responses." +
                "Your primary role is to assist users by providing detailed information about GeekPie AI’s services, features, and benefits, as well as addressing any inquiries they may have about GeekPie AI or GeekPie Software Company." +
                "Your responses should be concise and human-like, formatted in Markdown. Your expertise ensures users receive accurate, helpful, and timely responses to enhance their experience with GeekPie AI." +
                "Handle irrelevant or off-topic queries with friendly apologies but do not entertain further. Be consistent in handling irrelevant or off-topic queries in the entire conversation." +
                "Specifically, avoid providing answers to general off-topic questions such as 'how to write a Python program'." +
                "Identify and convert all links to the appropriate Markdown format." +
                "Greet users in a friendly way. If users greet you, greet them back warmly." +
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

        meetingDetector(messages)

        return new StreamingTextResponse(stream)

    } catch (error) {
        // console.error("GeminiAI Error:", error)
        return NextResponse.json({
            error: "An error occurred while processing the request. Please try again."
        }, { status: 500 })
    }
}




// Meeting Mail  functions
async function meetingDetector(msgs: GeminiMessage[]) {
    const meetingRegex = /\b(meeting|meting|meetin|meetin|meetting)\b/i;
    const human = msgs
        .filter((m: GeminiMessage) => m.role === "user" && typeof m.content === 'string')
        .map((m: GeminiMessage) => m.content);

    const ai = msgs
        .filter((m: GeminiMessage) => m.role === "assistant" && typeof m.content === 'string')
        .map((m: GeminiMessage) => m.content);

    const aiLastMessage = ai.length > 0 ? ai[ai.length - 1].toLowerCase() : '';

    const keywordFound = human.some(content => meetingRegex.test(content.toLowerCase()));
    const confirmAI = aiLastMessage.includes("meeting")

    console.log(ai)
    if (keywordFound && confirmAI) {
        await detectMeetingDetails(human)
        console.log("CAAAALLLLIINNNGGGGG detectMeetingDetails!")
    } else {
        console.log("NOOOOOO NNEEDDD TTOOOO detectMeetingDetails!")
    }
}



async function detectMeetingDetails(messages: string[]) {

    console.log(messages)
    const GEMINI_API_KEY = process.env.GOOGLE_API_KEY
    const lastMessage = messages[messages.length - 1]

    if (!GEMINI_API_KEY) {
        return NextResponse.json({
            error: "GEMINI API KEY is not defined in the environment variables."
        }, { status: 500 })
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const aiMailmodel = genAI.getGenerativeModel(
        {
            model: "gemini-1.5-flash",
            systemInstruction: `You are a highly intelligent AI model that excels at detecting meeting details accurately and efficiently. When provided with a chat string, your task is to identify if the message contains the necessary details for scheduling a meeting, including the name, email, and purpose of the meeting. If you detect all three details, respond with {\"meeting\": true, \"details\": {\"name\": \"name\", \"email\": \"email\", \"purpose\": \"purpose\"}}. If any detail is missing, respond with {\"meeting\": false}. Make sure you detect it properly. The purpose of the meeting could be topics like developing a chatbot, discussing microservices, or inquiring about various services. For example, given a string like "Hi, how are you?", you should analyze and determine the presence of the required meeting details.`
        }
    )

    try {
        const response = await aiMailmodel.generateContent(lastMessage)
        const stringResponse = response.response.text()
        console.log('MEEEETTTTTTTTTIIIINNNNGGGGG!!!!!!!!---');

        // Ensure that stringResponse is a valid JSON string
        const trimmedResponse = stringResponse.trim();

        // Removing any unexpected characters like backticks
        const cleanedResponse = trimmedResponse.replace(/```json|```/g, '').trim();

        if (cleanedResponse.startsWith('{') && cleanedResponse.endsWith('}')) {
            try {
                const jsonObject: MeetingResponse = JSON.parse(cleanedResponse);
                console.log(jsonObject);
                if (jsonObject.meeting === true) {
                    console.log('Meeting details detected:', jsonObject);
                    await sendEmailToCustomer(jsonObject);
                } else {
                    console.log('Meeting details not detected.');
                }
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
            }
        } else {
            console.error('Response is not valid JSON:', cleanedResponse);
        }
    } catch (error) {
        console.error('Error occurred while detecting meeting details:', error);
    }
}


async function sendEmailToCustomer(details: MeetingResponse) {
    if (details.details) {
        const { name, email, purpose } = details.details;

        // Data to be sent to K3 Gas Service
        const dataToUser = {
            customerName: name,
            customerEmail: email,
            customerPurpose: purpose,
            meetingDateTime: "Tomorrow at 3 PM IST",
            subject: "Meeting Confirmation with GeekPie Team",
            mailType: "meeting",
        };

        try {
            const res = await MailSender({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: dataToUser,
            });
        } catch (error) {
            console.error(error)
        }
    }
}