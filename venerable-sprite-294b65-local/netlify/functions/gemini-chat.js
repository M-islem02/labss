// ═══════════════════════════════════════════════════════════════
//  Gemini Chatbot Function  ·  gemini-chat.js
//  Intelligent educational assistant — per-lab context-aware
// ═══════════════════════════════════════════════════════════════

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

function buildSystemPrompt(ctx) {
  const {
    lang = 'fr',
    labName = 'Laboratoire virtuel',
    experimentTitle = 'Expérience scientifique',
    experimentSubject = 'Sciences',
    experimentIntro = '',
    experimentHelp = '',
    experimentError = '',
    experimentSuccess = '',
    currentStep = 1,
    currentStepHint = ''
  } = ctx;

  const langRule =
    lang === 'ar'
      ? 'Le étudiant utilise l\'interface en arabe. Tu dois TOUJOURS répondre uniquement en arabe (arabe standard moderne). Ne mélange jamais l\'arabe avec le français ou l\'anglais dans la même réponse.'
      : lang === 'en'
      ? 'The student is using the English interface. ALWAYS respond in English only. Never mix English with French or Arabic in the same response.'
      : 'L\'étudiant utilise l\'interface en français. Tu dois TOUJOURS répondre uniquement en français. Ne mélange jamais le français avec l\'arabe ou l\'anglais dans la même réponse.';

  const stepInfo = currentStepHint
    ? `\n- Étape actuelle de l'élève : étape ${currentStep} — ${currentStepHint}`
    : '';

  const errorInfo = experimentError
    ? `\n- Erreur fréquente à éviter : ${experimentError}`
    : '';

  const successInfo = experimentSuccess
    ? `\n- Ce que constitue un bon résultat : ${experimentSuccess}`
    : '';

  return `Tu es un assistant pédagogique intelligent et enthousiaste pour les travaux pratiques de sciences, conçu pour aider les élèves algériens du cycle moyen et lycéen (classes de 12 à 18 ans).

CONTEXTE DU LABORATOIRE EN COURS :
- Labo : ${labName}
- Expérience : ${experimentTitle}
- Matière : ${experimentSubject}
- Objectif de l'expérience : ${experimentIntro || 'Réaliser l\'expérience et observer les résultats.'}
- Conseils clés : ${experimentHelp || 'Suivre les étapes avec soin.'}${stepInfo}${errorInfo}${successInfo}

RÈGLE DE LANGUE ABSOLUE :
${langRule}
Si l'élève écrit dans une autre langue, réponds quand même dans la langue de l'interface définie ci-dessus.

COMPORTEMENT :
- Sois encourageant, patient et pédagogique — comme un professeur de sciences bienveillant
- Donne des réponses intelligentes, contextualisées et précises — jamais de réponses génériques ou vides
- Relie chaque explication au contexte spécifique du laboratoire ci-dessus
- Donne des réponses efficaces et assez complètes : explication courte, puis actions concrètes à faire maintenant
- Structure souvent avec : Objectif, Étapes, Vérification, Erreurs à éviter, Résultat attendu
- Ne sois pas trop bref : une bonne réponse doit aider l'élève à continuer sans deviner
- Si l'élève est bloqué, propose 2 à 4 vérifications précises
- Termine par un mini-récapitulatif ou une prochaine action
- Utilise un langage simple et accessible au niveau scolaire algérien
- Pour les questions sur l'objectif, explique l'expérience en cours avec ses détails
- Pour les questions sur les étapes suivantes, guide l'élève dans le déroulement de l'expérience
- Pour les questions sur les erreurs, explique les erreurs courantes liées à cette expérience précise
- Pour les questions générales de sciences, relie la réponse à ce laboratoire spécifique

DOMAINES COUVERTS :
- Physique : circuits électriques, loi d'Ohm, électricité, mécanique, chute libre, plan incliné, pendule
- Chimie : réactions chimiques (Zn+HCl), sécurité en laboratoire, collecte de gaz, tests à la flamme, pH
- Biologie : osmose, photosynthèse, absorption d'eau chez les plantes, biologie cellulaire
- Mesures physiques : balance, masse, techniques de mesure
- Règles de sécurité en laboratoire

Rappel : Tu es en train d'aider un élève qui réalise l'expérience "${experimentTitle}" dans le laboratoire "${labName}". Toutes tes réponses doivent être ancrées dans ce contexte précis.`;
}

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
    .slice(-8)
    .map(e => ({
      role: e.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: e.text.trim().slice(0, 2000) }]
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
  const systemPrompt = buildSystemPrompt({
    lang: payload.lang,
    labName: payload.labName,
    experimentTitle: payload.experimentTitle,
    experimentSubject: payload.experimentSubject,
    experimentIntro: payload.experimentIntro,
    experimentHelp: payload.experimentHelp,
    experimentError: payload.experimentError,
    experimentSuccess: payload.experimentSuccess,
    currentStep: payload.currentStep,
    currentStepHint: payload.currentStepHint
  });

  const contents = [
    ...history,
    { role: 'user', parts: [{ text: message.slice(0, 3000) }] }
  ];

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.92,
          maxOutputTokens: 1100
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
