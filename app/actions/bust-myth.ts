"use server"

// Assistant ID provided by the user
const ASSISTANT_ID = "asst_xAsgBKSt2N9TgXszB2DbwpTV"

export async function bustMyth(query: string) {
  try {
    // Dynamically import OpenAI to ensure it's only loaded on the server at runtime
    const { default: OpenAI } = await import("openai")

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Create a thread
    const thread = await openai.beta.threads.create()

    // Add the user message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `Analyze this beauty myth or question: "${query}". Please provide a structured response with these sections: 1. MYTH: Restate the myth or question clearly, 2. TRUTH: Provide a clear TRUE or FALSE or PARTIALLY TRUE verdict, 3. EXPLANATION: Give a scientific, evidence-based explanation in 2-3 sentences.`,
    })

    // Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
    })

    // Poll for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)

    // Wait for the run to complete (with timeout)
    let attempts = 0
    const maxAttempts = 30 // 30 * 1 second = 30 seconds max wait time

    while (runStatus.status !== "completed" && runStatus.status !== "failed" && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
      attempts++
    }

    if (runStatus.status !== "completed") {
      return {
        success: false,
        error: `Analysis timed out or failed: ${runStatus.status}`,
      }
    }

    // Get the messages from the thread
    const messages = await openai.beta.threads.messages.list(thread.id)

    // Find the assistant's response (the last message from the assistant)
    const assistantMessages = messages.data
      .filter((message) => message.role === "assistant")
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    if (assistantMessages.length === 0) {
      return {
        success: false,
        error: "No response from assistant",
      }
    }

    // Get the content from the assistant's message
    const responseContent = assistantMessages[0].content

    // Extract text content
    const textContent = responseContent
      .filter((content) => content.type === "text")
      .map((content) => (content as any).text.value)
      .join("\n")

    // Parse the response to extract the structured data
    const mythMatch = textContent.match(/MYTH:(.+?)(?=TRUTH:|$)/s)
    const truthMatch = textContent.match(/TRUTH:(.+?)(?=EXPLANATION:|$)/s)
    const explanationMatch = textContent.match(/EXPLANATION:(.+?)(?=$)/s)

    const result = {
      myth: mythMatch ? mythMatch[1].trim() : query,
      truth: truthMatch ? truthMatch[1].trim() : "ANALYSIS ERROR",
      explanation: explanationMatch ? explanationMatch[1].trim() : "Sorry, we couldn't analyze this myth properly.",
    }

    return {
      success: true,
      result,
      rawResponse: textContent,
    }
  } catch (error) {
    console.error("Error busting myth:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

