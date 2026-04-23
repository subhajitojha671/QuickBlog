import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateWithGemini = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview", // ✅ FIXED MODEL
    });

    const result = await model.generateContent(prompt);

    return result.response.text();

  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};