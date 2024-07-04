import { MailSenderParams } from "./typeScriptTypes";

export async function MailSender({ method, headers, body }: MailSenderParams) {
    console.log("REAched mailSender!!!!!!")
    const { mailType } = body;
    let res;
    if (mailType === 'meeting') {
        res = await fetch("http://localhost:3000/api/sendmail", {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        })
    } else {
        res = await fetch("/api/sendmail", {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        })
    }

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