export const runtime = 'edge';

// Strip markdown syntax before sending to TTS so the voice doesn't
// read out asterisks, hashes, or backticks.
function cleanForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '')    // code blocks
    .replace(/`[^`]+`/g, '')           // inline code
    .replace(/#{1,6}\s/g, '')          // headings
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1') // bold/italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/^\s*[-*+]\s/gm, '')      // list bullets
    .replace(/\n{2,}/g, '. ')          // paragraph breaks → pause
    .replace(/\n/g, ' ')
    .trim();
}

export async function POST(req: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return new Response('ElevenLabs API key not configured', { status: 503 });
  }

  const { text } = await req.json() as { text: string };
  if (!text?.trim()) {
    return new Response('No text provided', { status: 400 });
  }

  const voiceId =
    process.env.ELEVENLABS_VOICE_ID ?? 'EXAVITQu4vr4xnSDxMaL'; // default: Sarah

  const clean = cleanForSpeech(text).slice(0, 2500); // ElevenLabs practical limit

  const elevenResp = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text: clean,
        model_id: 'eleven_turbo_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.3,
          use_speaker_boost: true,
        },
      }),
    },
  );

  if (!elevenResp.ok) {
    const err = await elevenResp.text();
    console.error('ElevenLabs error:', err);
    return new Response('TTS generation failed', { status: 502 });
  }

  return new Response(elevenResp.body, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'no-store',
    },
  });
}
