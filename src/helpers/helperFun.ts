import { MailSenderParams } from "./typeScriptTypes";

export async function MailSender({ method, headers, body }: MailSenderParams) {
    console.log("REAched mailSender!!!!!!")
    const res = await fetch("/api/sendmail", {
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