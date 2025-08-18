const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function Genraret_ai(content) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:content,
  });
  return response.text
}

module.exports = Genraret_ai;