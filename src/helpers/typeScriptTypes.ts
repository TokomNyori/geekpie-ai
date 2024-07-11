export type GeminiMessage = {
  content: string;
  createdAt: Date;
  id: string;
  role: string;
}


export type MeetingDetails = {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  mode: string;
  service: string;
  meetingTime: string;
}

export type MeetingResponse = {
  meeting: boolean;
  details?: MeetingDetails; // 'details' is optional
}


type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // Add other HTTP methods as needed

interface Headers {
  [key: string]: string;
}

export interface MailSenderParams {
  method: RequestMethod;
  headers: Headers;
  body: any; // You can make this more specific based on the structure of your request body
}