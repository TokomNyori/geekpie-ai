import { GeminiMessage, MailSenderParams, MeetingResponse } from "./typeScriptTypes";
import { Message } from "ai/react";

export async function mailSender({ method, headers, body }: MailSenderParams) {
    console.log("REAched mailSender!!!!!!")
    const res = await fetch("/api/sendmail", {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    })

    if (!res.ok) {
        const errorData = await res.json();
        console.log("Error occurred while sending email:", errorData)
        throw new Error(errorData.message)
    }

    return res.json()
}


export async function detectMeetingDetails({ method, headers, body }: MailSenderParams) {
    console.log("REACHED detectMeetingDetails!")

    const res = await fetch("/api/detect-meeting-details", {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    })

    if (!res.ok) {
        const errorData = await res.json();
        // console.log(errorData)
        throw new Error(errorData.message)
    }

    return res.json()
}


export const scrollToSection = (sectionId: string): void => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};



// Meeting Mail  functions
export async function meetingDetector(msgs: Message[]) {
    const meetingRegex = /\b(meeting|meting|meetin|meetin|meetting)\b/i;
    const human = msgs
        .filter((m: Message) => m.role === "user" && typeof m.content === 'string')
        .map((m: Message) => m.content);

    const ai = msgs
        .filter((m: Message) => m.role === "assistant" && typeof m.content === 'string')
        .map((m: Message) => m.content);

    const aiLastMessage = ai.length > 0 ? ai[ai.length - 1].toLowerCase() : '';

    const keywordFound = human.some(content => meetingRegex.test(content.toLowerCase()));
    const confirmAI = aiLastMessage.includes("^^");

    // console.log(aiLastMessage)
    if (confirmAI) {
        console.log("True: keywordFound && confirmAI!")
        return true
    } else {
        console.log("False: keywordFound && confirmAI!")
        return false
    }
}
