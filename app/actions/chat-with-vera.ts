"use server"

// Assistant ID provided by the user
const ASSISTANT_ID = "asst_xAsgBKSt2N9TgXszB2DbwpTV"

export async function chatWithVera(message: string, threadId?: string) {
  try {
    // Dynamically import OpenAI to ensure it's only loaded on the server at runtime
    const { default: OpenAI } = await import("openai")

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Create a thread if one doesn't exist
    const thread = threadId ? { id: threadId } : await openai.beta.threads.create()

    // Add the user message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
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
        error: `Chat response timed out or failed: ${runStatus.status}`,
        threadId: thread.id,
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
        threadId: thread.id,
      }
    }

    // Get the content from the assistant's message
    const responseContent = assistantMessages[0].content

    // Extract text content
    const textContent = responseContent
      .filter((content) => content.type === "text")
      .map((content) => (content as any).text.value)
      .join("\n")

    return {
      success: true,
      response: textContent,
      threadId: thread.id,
    }
  } catch (error) {
    console.error("Error chatting with Vera:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
      threadId: threadId,
    }
  }
}

