import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.deepseek.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { concept, cuisine, priceRange, audience, seasonal, dietary, sections } = await req.json();

    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `You are an expert culinary AI assistant specializing in restaurant menu design and development. Generate a complete, professional restaurant menu based on the user's inputs. Include: section headings with dish names, appetizing descriptions, suggested prices, dietary icons (V=vegetarian, VG=vegan, GF=gluten-free), and drink pairing suggestions. Format with markdown headers, bullet points, and elegant prose descriptions that would make guests eager to order.`,
        },
        {
          role: "user",
          content: `Create a complete restaurant menu with the following details:

- Restaurant Concept: ${concept}
- Cuisine Type: ${cuisine}
- Price Range: ${priceRange}
- Target Audience: ${audience}
- Seasonal Ingredients: ${seasonal}
- Dietary Options: ${dietary}
- Number of Menu Sections: ${sections}

Please provide a full menu with section headings, dish names, mouthwatering descriptions, prices, dietary icons, and drink pairing suggestions.`,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
