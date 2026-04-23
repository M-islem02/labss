// ═══════════════════════════════════════════════════════════════
//  Gemini Chatbot Function  ·  gemini-chat.js
//  Bilingual educational assistant for Algerian students (AR/FR)
// ═══════════════════════════════════════════════════════════════

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are an intelligent and friendly educational assistant for Algerian students (middle school and high school).
You help with physics, chemistry, biology, mathematics and science lab experiments.
You explain concepts clearly, step by step, using simple and accessible language appropriate for students aged 12–18.
You are encouraging, patient, and educational.

IMPORTANT LANGUAGE RULES:
- If the student writes in Arabic, respond ENTIRELY in Arabic (Modern Standard Arabic or Algerian dialect is fine).
- If the student writes in French, respond ENTIRELY in French.
- Never mix languages in the same response.
- Keep responses concise (max 3–4 short paragraphs).

TOPICS YOU COVER:
- Physics: mechanics (free fall, inclined plane, pendulum, projectile), electricity (circuits, Ohm's law), optics, waves
- Chemistry: reactions (Zn+HCl, limewater CO2 test), atomic structure, pH, oxidation-reduction
- Biology: osmosis, photosynthesis, cell biology, digestion
- Mathematics: algebra, equations, geometry, trigonometry
- Laboratory safety rules

Always relate answers to Algerian school curriculum when possible.`;

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify(body)
  };
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter(e => e && typeof e.role === 'string' && typeof e.text === 'string')
    .slice(-6)
    .map(e => ({
      role: e.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: e.text.trim().slice(0, 1500) }]
    }))
    .filter(e => e.parts[0].text);
}

function extractText(data) {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return '';
  return parts
    .map(p => (typeof p?.text === 'string' ? p.text : ''))
    .join('')
    .trim();
}

exports.handler = async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        Allow: 'POST, OPTIONS'
      }
    };
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return json(500, { error: 'Missing GEMINI_API_KEY environment variable.' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON payload.' });
  }

  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  if (!message) return json(400, { error: 'Message is required.' });

  const history = sanitizeHistory(payload.history);

  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    ...history,
    { role: 'user', parts: [{ text: message.slice(0, 3000) }] }
  ];

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.65,
          topP: 0.92,
          maxOutputTokens: 600
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = data?.error?.message || 'Gemini request failed.';
      return json(response.status, { error: msg });
    }

    const reply = extractText(data);
    if (!reply) return json(502, { error: 'Gemini returned an empty response.' });

    return json(200, { reply });
  } catch (error) {
    return json(500, { error: error instanceof Error ? error.message : 'Unexpected server error.' });
  }
};
