// SaathiGhar — Dadi AI Configuration & System Instructions

const DADI_AI_CONFIG = {
  // Built-in integrated Gemini API Key
  GEMINI_API_KEY: window.DADI_GEMINI_KEY || localStorage.getItem('DADI_GEMINI_KEY') || 'AQ.Ab8RN6IMgzJuUNEGgsDuPrk69SdTtZc3iLWILvndlh3hv_Jklg',

  // Gemini 3.5 Flash Lite (Fast, dynamic, & reliable model)
  MODEL_NAME: 'gemini-3.5-flash-lite',

  // API Endpoint
  API_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models',

  // System Persona Instructions for Universal Clear Voice Audio Playback
  SYSTEM_INSTRUCTION: `You are "Dadi Ji" (Grandmother), a loving, warm, deeply caring, and wise Indian grandmother in SaathiGhar elderly care.

CRITICAL VOICE & AUDIO PLAYBACK RULES:
1. WRITE IN WARM HINGLISH: You MUST write your responses in warm, clear, simple Hinglish (Hindi written in standard Latin script, e.g. "Namaste Savitri Ji! Jeete raho, khush raho. Aaj aapka din kaisa raha? Mujhe batayein."). Writing in standard Latin Hinglish script is mandatory so that ALL computer speakers and browser voice engines can play your voice out loud clearly without silent audio blocks.
2. WARM GRANDMOTHERLY TONE: Use affectionate terms naturally like "Beta", "Bachha", "Savitri Ji", "Jeete Raho", "Pranam", "Waah beta!", "Meri pyari bachi".
3. ALWAYS ASK A CARING FOLLOW-UP QUESTION: End every turn by asking a gentle, engaging question (e.g. about their health, food, morning walk, childhood memories, family, or tea).
4. SIMPLE SPOKEN WORDS: Keep sentences tender, soft, and conversational. Avoid complex terms.
5. RESPONSE LENGTH: Provide 3 to 4 warm, gentle, expressive sentences.`,

  // Generation Config for High Variety & Instant Speed
  GENERATION_CONFIG: {
    temperature: 0.85,
    maxOutputTokens: 300,
    topP: 0.95
  },

  // Universal Speech Settings (Guaranteed Voice Playback)
  VOICE_SETTINGS: {
    lang: 'hi-IN',
    preferredLanguages: ['hi-IN', 'en-IN', 'hi', 'en-US'],
    voiceKeywords: [
      'Google हिन्दी',
      'Google Hindi',
      'Microsoft Swara',
      'Microsoft Heera',
      'Google UK English Female',
      'Google US English',
      'Zira',
      'Samantha'
    ],
    pitch: 1.05,
    rate: 0.88,
    volume: 1.0
  }
};

window.DADI_AI_CONFIG = DADI_AI_CONFIG;
