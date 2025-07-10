export async function POST(req) {
  try {
    const data = await req.json();

    const googleSheetURL = 'https://script.google.com/macros/s/AKfycbxF8wAQYv6XGlslvpmJXVMra9hC3BTKDN81GohTAlof_m0Zsa58zMbyndCdKx7vfes4/exec';

    const response = await fetch(googleSheetURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Google Sheet');
    }

    const result = await response.json();

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
