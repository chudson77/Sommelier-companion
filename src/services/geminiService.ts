
import { GoogleGenAI, Type } from "@google/genai";
import { WineReview } from '../types';

// FIX: Switched to process.env.API_KEY as per the coding guidelines.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // FIX: Updated error message to reflect the correct environment variable.
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const wineReviewSchema = {
  type: Type.OBJECT,
  properties: {
    wineName: { type: Type.STRING, description: "The full name of the wine." },
    winery: { type: Type.STRING, description: "The name of the winery or producer." },
    region: { type: Type.STRING, description: "The region where the wine is from, e.g., 'Napa Valley, USA'." },
    year: { type: Type.STRING, description: "The vintage year of the wine. Use 'NV' for Non-Vintage." },
    tastingNotes: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "A list of key tasting notes, e.g., 'Black cherry', 'Vanilla', 'Tobacco'."
    },
    averagePrice: { type: Type.STRING, description: "The estimated average retail price range, e.g., '$45 - $60'." },
    wineScore: { type: Type.INTEGER, description: "A composite wine score out of 100, based on industry standards." },
    expertReview: { type: Type.STRING, description: "A summary of reviews from recognized industry sources. If the wine cannot be identified, this field should explain the issue." },
  },
  required: ["wineName", "winery", "region", "year", "tastingNotes", "averagePrice", "wineScore", "expertReview"],
};

export async function getWineReviewFromImage(base64Image: string, mimeType: string): Promise<WineReview> {
  const model = "gemini-2.5-flash";
  const prompt = `You are a world-class sommelier. Your task is to identify the wine from the provided image of a wine bottle or label and provide a comprehensive review in the specified JSON format. 
  
  Source your information from highly regarded, respected, and industry-recognized organizations or websites like Wine Spectator, Decanter, James Suckling, and Vivino. 
  
  Source prices from reputable outlets for selling wine such as major supermarkets and well-known wine merchants.
  
  If you cannot confidently identify the wine from the image, please return a JSON object with a clear message in the 'expertReview' field stating why identification was not possible (e.g., 'Image is too blurry', 'Label is not legible'), and provide reasonable default values for other fields.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: wineReviewSchema,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("The API returned an empty response. The wine might not be identifiable from the image.");
    }
    
    const parsedResponse = JSON.parse(jsonText);
    return parsedResponse as WineReview;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get wine review: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while analyzing the wine.");
  }
}
