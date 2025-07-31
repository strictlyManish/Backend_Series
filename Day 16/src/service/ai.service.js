const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey:""
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "who is chief minister of india bihar",
  });
  console.log(response.text);
}

main();