import { streamText, convertToCoreMessages } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { hardieTools } from '@/lib/tools';
import { HARDIE_SYSTEM_PROMPT } from '@/lib/system-prompt';

export const runtime = 'edge';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: HARDIE_SYSTEM_PROMPT,
    messages: convertToCoreMessages(messages),
    tools: hardieTools,
    maxSteps: 3,
    temperature: 0.7,
    maxTokens: 1024,
  });

  return result.toDataStreamResponse();
}
