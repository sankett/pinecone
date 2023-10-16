import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";

function initPineconeClient() {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || "",
    environment: process.env.PINECODE_ENV || "",
  });
   
  return pinecone;
}


export async function POST(request: Request) {
    
    const requestBody = await request.json();
    const query = requestBody.query;
    const pineconeClient = initPineconeClient();
    const pineconeIndex = pineconeClient.Index("lcindex");
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
        batchSize: 2048, // Default value if omitted is 512. Max is 2048
        });

    const vectorStore = await PineconeStore.fromExistingIndex(
        embeddings,
        { pineconeIndex }
      );

      const model = new OpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY
      });
      const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
        k: 1,
        returnSourceDocuments: true,
      });
      const response = await chain.call({ query: query });
      return Response.json({ result :response.text })

    
}