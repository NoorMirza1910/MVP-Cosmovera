"use server"

import { revalidatePath } from "next/cache"

// Assistant ID for the cosmetic product analyzer
const ASSISTANT_ID = "asst_dBMJV1xrKKiRcn8GQh5OMy7z"

export async function analyzeProduct(formData: FormData) {
  try {
    // Get the image file from the form data
    const imageFile = formData.get("image") as File

    if (!imageFile) {
      return {
        success: false,
        error: "No image provided",
      }
    }

    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is not configured")
      return {
        success: false,
        error: "API configuration error: OpenAI API key is not set",
      }
    }

    // Dynamically import OpenAI to ensure it's only loaded on the server at runtime
    const { default: OpenAI } = await import("openai")

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    console.log("Processing image...")
    
    // Convert the file to a buffer
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Create a base64 encoded image
    const base64Image = buffer.toString('base64')
    
    // Create the API request
    console.log("Sending request to OpenAI...")
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "This AI-powered compliance verification tool assists users in ensuring cosmetic products adhere to regulatory requirements, including the EU COSING database. The tool extracts and analyzes ingredient lists from artwork and products labels, cross-checks substances against regulatory databases and identified any harmful ingredients based on skin type of the user. \n\nIt generates a classification report based on ingredients and identifies the product type \n\nProvides recommendation of use of product based on skin type\n\nProvides rating to the product based on ingredients"
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this cosmetic product image and provide a detailed analysis following this EXACT format:\n\n# Product Analysis Report\n\n## 1. Product Classification\n- Product Type: [Specify the type]\n- Target Skin Type: [Specify target skin type]\n- Product Category: [Specify category]\n\n## 2. Ingredient Analysis\n- Identified Ingredients: [List all ingredients found]\n- EU COSING Compliance: [List compliant/non-compliant ingredients]\n- Restricted Substances: [List any restricted substances found]\n- Allergens: [List potential allergens]\n\n## 3. Safety Assessment\n- Regulatory Status: [Compliant/Non-compliant with EU regulations]\n- Health Risks: [List any identified risks]\n- Allergen Warnings: [Specific warnings]\n- Precautions: [Special usage precautions]\n\n## 4. Product Rating\n- Overall Safety: [X/5 stars]\n- Ingredient Quality: [X/5 stars]\n- Regulatory Compliance: [X/5 stars]\n\n## 5. Recommendations\n- Suitable Skin Types: [List compatible skin types]\n- Usage Guidelines: [Specific instructions]\n- Alternatives: [Similar safer products]\n- Considerations: [Special notes]"
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 2048,
      temperature: 1,
      top_p: 1
    })

    console.log("Response received from OpenAI")
    
    // Extract the analysis text from the response
    const textContent = response.choices[0].message.content || "No analysis provided"
    
    // Use a fixed format for the timestamp to avoid hydration issues
    const now = new Date()
    const timestamp = now.toISOString()
    
    // Return the analysis result with the structure expected by the component
    return {
      success: true,
      analysis: {
        analysis: textContent,
        timestamp: timestamp,
      },
    }
  } catch (error) {
    console.error("Error analyzing product:", error)
    // Log more details about the error
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred while analyzing the product",
    }
  }
}

