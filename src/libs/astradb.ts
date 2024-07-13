import { DataAPIClient, Collection } from "@datastax/astra-db-ts/";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const endpoint = process.env.ASTRA_DB_ENDPOINT || ""
const collection = process.env.ASTRA_DB_COLLECTION || ""
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || ""

if (!endpoint || !token || !collection) {
    throw new Error("Please set AstraDB ENVs.")
}

//embedding-001
export const getVectorStrore = async () => {
    return AstraDBVectorStore.fromExistingIndex(
        new GoogleGenerativeAIEmbeddings({
            modelName: "text-embedding-004",
        }),
        {
            token,
            endpoint,
            collection,
            collectionOptions: {
                vector: {
                    dimension: 768,
                    metric: "cosine"
                }
            }
        }
    )
}

const client = new DataAPIClient(token);
const db = client.db(endpoint);

export async function getEmbeddingsCollection() {
    // return new AstraDb(token, endpoint).collection(collection)
    return db.collection(collection);
}