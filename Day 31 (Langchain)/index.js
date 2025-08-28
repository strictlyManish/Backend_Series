import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";


dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

// model.invoke("who are you").then((res)=>{
//   console.log('AI -' ,res.content)
// });

const promptTemplate = PromptTemplate.fromTemplate(`
You are an expert assistant.
Answer the following question clearly and concisely.

Question: {question}
`);

promptTemplate
  .pipe(model)
  .invoke({ question: "express" })
  .then((res) => {
    console.log("AI:", res.content);
  });


