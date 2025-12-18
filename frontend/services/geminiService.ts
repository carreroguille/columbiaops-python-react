import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedSpec } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProjectSpec = async (idea: string): Promise<GeneratedSpec> => {
  const modelId = "gemini-3-flash-preview"; 

  const prompt = `
    You are a senior software architect. 
    Analyze the following project idea: "${idea}".
    Create a technical specification for a new project repository.
    The output must be a structured JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projectName: { type: Type.STRING },
            description: { type: Type.STRING },
            techStack: {
              type: Type.OBJECT,
              properties: {
                frontend: { type: Type.STRING },
                backend: { type: Type.STRING },
                database: { type: Type.STRING },
                deployment: { type: Type.STRING },
              },
            },
            features: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            setupCommands: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedSpec;
    }
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};