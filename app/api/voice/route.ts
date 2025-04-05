import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // ElevenLabs API key
    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'ElevenLabs API key is not configured' }, { status: 500 });
    }

    // Agent ID for Vera
    const agentId = process.env.ELEVENLABS_AGENT_ID || "8rDteNOETBub5RLKCMEN";
    
    // Call ElevenLabs Conversational AI API
    const response = await fetch(`https://api.elevenlabs.io/v1/conversation`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        agent_id: agentId,
        message: message,
        enable_audio: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: response.statusText }));
      console.error('ElevenLabs API error:', errorData);
      return NextResponse.json({ 
        error: `Failed to get response from ElevenLabs: ${errorData.detail || response.statusText}` 
      }, { status: response.status });
    }

    const data = await response.json();
    
    // Get the assistant's response and audio
    const assistantMessage = data.response || data.text || message;
    const audioUrl = data.audio_url;
    
    if (!audioUrl) {
      // Return text response even if audio is not available
      return NextResponse.json({
        text: assistantMessage,
        audio: null,
      });
    }
    
    // Fetch the audio data
    const audioResponse = await fetch(audioUrl);
    if (!audioResponse.ok) {
      // Return text response if audio fetch fails
      return NextResponse.json({
        text: assistantMessage,
        audio: null,
      });
    }
    
    const audioBuffer = await audioResponse.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');
    
    return NextResponse.json({
      text: assistantMessage,
      audio: audioBase64,
    });
  } catch (error) {
    console.error('Error in voice API route:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }, { status: 500 });
  }
} 