export const config = { runtime: 'edge' };

// This function does the second job: check whether a video is ready yet.
// The frontend calls this every few seconds until status = "completed".

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return new Response(JSON.stringify({ error: 'Missing videoId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  try {
    const response = await fetch(`https://api.heygen.com/v3/videos/${videoId}`, {
      headers: { 'X-Api-Key': process.env.HEYGEN_API_KEY },
    });

    const data = await response.json();
    const status = data.data?.status || data.status;
    const videoUrl = data.data?.video_url || data.video_url;
    const failureMessage = data.data?.failure_message || null;

    return new Response(JSON.stringify({ status, videoUrl, failureMessage }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Could not check status.', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
