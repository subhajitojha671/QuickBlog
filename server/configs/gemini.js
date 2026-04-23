import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateWithGemini = async (prompt) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API key missing in .env");
    }

    // ✅ Create instance INSIDE function (important)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview", // ✅ stable model
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();

  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};