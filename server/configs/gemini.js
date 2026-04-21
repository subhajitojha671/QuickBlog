import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview" // ✅ FIXED
});

const main = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export default main;