export type GeminiMessage = {
    content: string;
    createdAt: Date;
    id: string;
    role: string;
}


export type MeetingDetails = {
    name: string;
    email: string;
    purpose: string;
}

export type MeetingResponse = {
    meeting: boolean;
    details?: MeetingDetails; // 'details' is optional
}