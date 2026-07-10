export const config = { runtime: 'edge' };

// This function does ONE job: take a script + avatar + voice, and ask HeyGen
// to start rendering a video. It hands back a video_id immediately —
// rendering happens in the background on HeyGen's servers.

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
    const { script, avatarId, voiceId, orientation } = await req.json();

    if (!script || !avatarId || !voiceId) {
      return new Response(JSON.stringify({ error: 'Missing script, avatarId, or voiceId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Landscape for YouTube, portrait for Shorts/Reels, square for flexible posting
    const dimensions = {
      landscape: { width: 1920, height: 1080 },
      portrait: { width: 1080, height: 1920 },
      square: { width: 1080, height: 1080 },
    };
    const dimension = dimensions[orientation] || dimensions.landscape;

    const response = await fetch('https://api.heygen.com/v3/videos', {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.HEYGEN_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'avatar',
        avatar_id: avatarId,
        engine: { type: 'avatar_v' },
        script: script,
        voice_id: voiceId,
        dimension: dimension,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message || 'HeyGen rejected the request', details: data }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // HeyGen returns the video_id here — we pass it straight back to the browser
    return new Response(JSON.stringify({ videoId: data.data?.video_id || data.video_id }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Something went wrong sending this to HeyGen.', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
