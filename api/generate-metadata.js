export const config = { runtime: 'edge' };

// Takes the script you just turned into a video, and asks Claude to write
// the YouTube title options, description, and thumbnail text — so the only
// thing left for you to do is copy, paste, and design the thumbnail image.

const CONTENT_PROMPT = `You are writing YouTube metadata for The Monifa Method — a faceless digital education channel. The voice is: Marie Forleo warmth meets James Clear precision. Punchy. "Here's what I've noticed" energy. Short sentences. No hype, no manufactured urgency, no corporate jargon. British English spelling.

Given the video script below, produce exactly this, with clear section headers so it's easy to copy each part separately:

TITLE OPTIONS
Three YouTube titles, each under 65 characters. Specific and curiosity-driven, never clickbait. Should make the exact right person stop scrolling.

DESCRIPTION
A YouTube description of 3-4 short paragraphs. Open with a 1-2 sentence hook that mirrors the video's core insight. Do not summarise the whole video — invite people to watch it. End naturally, no forced call-to-action.

THUMBNAIL TEXT
Three short thumbnail text options (max 6 words each). These need to work as bold on-screen text, not full sentences — punchy fragments that create curiosity.

PINNED COMMENT
One short pinned comment (2-3 sentences) that reinforces the channel's faceless AI-delivered model, in the established voice.`;

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { script } = await req.json();

    if (!script) {
      return new Response(JSON.stringify({ error: 'Missing script' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: CONTENT_PROMPT,
        messages: [{ role: 'user', content: `Here is the script:\n\n${script}` }],
      }),
    });

    const data = await response.json();
    const reply = data?.content?.[0]?.text || 'Could not generate content this time — try again.';

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Something went wrong.', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
