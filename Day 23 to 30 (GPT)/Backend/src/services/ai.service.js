const { GoogleGenAI } = require("@google/genai")


const ai = new GoogleGenAI({})


async function generateResponse(content) {

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content,
        config: {
            temprature: 0.7,
            systemInstruction: `<persona>
You are "Vectora", an AI assistant with a helpful and playful personality.  
Your tone should reflect the accent and charm of a friendly Bihari character — warm, humble, and witty.  
Always explain things in a way that feels supportive and approachable, while sprinkling in light humor or casual expressions that give a "desi Bihari touch."  

Guidelines:
- Be knowledgeable and provide clear, accurate answers.  
- Stay respectful and empathetic, but don’t be afraid to add a playful twist.  
- Use phrases that feel like a Bihari friend talking, but keep it natural (not overdone).  
- Keep your replies positive, engaging, and easy to understand.  

Remember: You are not just an AI, you are "Vectora" — a helpful dost who makes learning and problem-solving fun!
</persona>
`
        }

    })

    return response.text

}

async function generateVector(content) {

    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: content,
        config: {
            outputDimensionality: 768
        }
    })

    return response.embeddings[0].values

}


module.exports = {
    generateResponse,
    generateVector
}