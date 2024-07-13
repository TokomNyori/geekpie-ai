import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
// Configure dotenv above all
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocumentInterface } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getEmbeddingsCollection, getVectorStrore } from "../src/libs/astradb";

async function generateEmbeddings() {

    const vectorStore = await getVectorStrore();

    (await getEmbeddingsCollection()).deleteMany({})

    const loader = new DirectoryLoader(
        "src/components/training/",
        {
            ".tsx": (path) => new TextLoader(path)
        },
        true
    )
    //.replace(/^\s*[\r\n]+/gm, "")
    const docs = (await loader.load())
        .map((doc): DocumentInterface => {
            const url = doc.metadata.source
                .replace(/\\/g, "/")
                .split("/src/components")[1]
            // .split("/page")[0] || "/"

            const trimmedPageContent = doc.pageContent
                .replace(/^import.*$/gm, "")
                .replace(/ className=(["']).*?\1| className={.*?}/g, "")
                .replace(/^\s*[\r]/gm, "")
                .trim()
            return {
                pageContent: trimmedPageContent,
                metadata: { url }
            }
        })
    // .filter(doc => doc.metadata.source.endsWith("svg-components"))


    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");
    const splittedDocs = await splitter.splitDocuments(docs);

    console.log(splittedDocs)

    await vectorStore.addDocuments(splittedDocs);
}

generateEmbeddings()