export const runtime = 'edge';

function cleanForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*[-*+]\s/gm, '')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, ' ')
    // Phonetic pronunciation: "Stru-X-ure" causes ElevenLabs to say stru · eks · ure
    .replace(/StruXure/gi, 'Stru-X-ure')
    .trim();
}

export async function POST(req: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  // Explicit env-var check with a clear error message in the response body
  if (!apiKey) {
    console.error('[TTS] ELEVENLABS_API_KEY is not set');
    return new Response(
      JSON.stringify({ error: 'ELEVENLABS_API_KEY environment variable is not configured' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const body = await req.json() as { text?: string };
  if (!body.text?.trim()) {
    return new Response(JSON.stringify({ error: 'No text provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const voiceId = process.env.ELEVENLABS_VOICE_ID ?? 'EXAVITQu4vr4xnSDxMaL'; // Sarah — ElevenLabs pre-made, free tier
  const clean   = cleanForSpeech(body.text).slice(0, 2500);

  console.log(`[TTS] Requesting voice="${voiceId}" length=${clean.length}`);

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
    const errText = await elevenResp.text();
    console.error('[TTS] ElevenLabs error:', elevenResp.status, errText);
    return new Response(
      JSON.stringify({ error: 'ElevenLabs API error', status: elevenResp.status, detail: errText }),
      { status: 502, headers: { 'Content-Type': 'application/json' } },
    );
  }

  console.log('[TTS] ElevenLabs responded OK, streaming audio/mpeg');

  return new Response(elevenResp.body, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'no-store',
      // Surface the voice used so it's visible in browser dev tools
      'X-Voice-Id': voiceId,
    },
  });
}
