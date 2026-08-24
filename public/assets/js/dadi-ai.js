// SaathiGhar — Dadi AI Engine (Gemini 3.5 Flash Lite + Real-time Multi-User STT & Universal Audio TTS)

class DadiAIService {
  constructor() {
    this.config = window.DADI_AI_CONFIG || {};
    this.historyKey = 'dadi_chat_history_session';
    this.history = this.loadHistory();
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.isThinking = false;
    this.selectedVoice = null;
    this.listeners = {
      stateChange: [],
      messageAdded: [],
      transcriptUpdate: [],
      error: []
    };

    this.initSpeechSynthesis();
    this.initSpeechRecognition();
  }

  // Multi-user concurrency: load session-isolated history
  loadHistory() {
    try {
      const stored = sessionStorage.getItem(this.historyKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveHistory() {
    try {
      if (this.history.length > 16) {
        this.history = this.history.slice(this.history.length - 16);
      }
      sessionStorage.setItem(this.historyKey, JSON.stringify(this.history));
    } catch (e) {
      console.warn("Dadi AI: Failed to save session history", e);
    }
  }

  clearHistory() {
    this.history = [];
    sessionStorage.removeItem(this.historyKey);
    this.emitMessageAdded();
  }

  // Event subscription for UI binding
  on(event, fn) {
    if (this.listeners[event]) {
      this.listeners[event].push(fn);
    }
  }

  notifyStateChange(state) {
    this.listeners.stateChange.forEach(fn => fn(state));
  }

  emitMessageAdded() {
    this.listeners.messageAdded.forEach(fn => fn(this.history));
  }

  notifyError(errMessage) {
    this.listeners.error.forEach(fn => fn(errMessage));
  }

  notifyTranscript(text) {
    this.listeners.transcriptUpdate.forEach(fn => fn(text));
  }

  // --- 1. Universal Voice Synthesis Engine ---
  initSpeechSynthesis() {
    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || !voices.length) return;

      const keywords = this.config.VOICE_SETTINGS?.voiceKeywords || [];

      // 1. Preferred Hindi / Indian voice matching
      for (const kw of keywords) {
        const found = voices.find(v => v.name.toLowerCase().includes(kw.toLowerCase()));
        if (found) {
          this.selectedVoice = found;
          break;
        }
      }

      // 2. Fallback to any hi-IN / hi voice
      if (!this.selectedVoice) {
        this.selectedVoice = voices.find(v => v.lang && (v.lang.includes('hi') || v.lang.includes('HI')));
      }

      // 3. Fallback to en-IN voice
      if (!this.selectedVoice) {
        this.selectedVoice = voices.find(v => v.lang && v.lang.includes('en-IN'));
      }

      // 4. Fallback to female system voice (Zira, Samantha, etc.)
      if (!this.selectedVoice) {
        this.selectedVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha'));
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  speakText(text, onComplete) {
    if (!('speechSynthesis' in window)) {
      if (onComplete) onComplete();
      return;
    }

    // Always unfreeze Chrome/Windows audio queue
    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) { }

    // Clean text for speech
    const cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/[*_#~`-]/g, ' ')
      .trim();

    if (!cleanText) {
      if (onComplete) onComplete();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Resolve best voice live
    const voices = window.speechSynthesis.getVoices();
    let bestVoice = this.selectedVoice;

    if (!bestVoice && voices && voices.length > 0) {
      bestVoice = voices.find(v => v.lang && (v.lang.includes('hi') || v.lang.includes('en-IN'))) ||
        voices.find(v => v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('zira')) ||
        voices[0];
    }

    if (bestVoice) {
      utterance.voice = bestVoice;
      utterance.lang = bestVoice.lang || 'hi-IN';
    } else {
      utterance.lang = 'hi-IN';
    }

    // Grandmotherly calming tone settings
    utterance.pitch = this.config.VOICE_SETTINGS?.pitch || 1.05;
    utterance.rate = this.config.VOICE_SETTINGS?.rate || 0.88;
    utterance.volume = 1.0;

    this.isSpeaking = true;
    this.notifyStateChange('speaking');

    utterance.onend = () => {
      this.isSpeaking = false;
      this.notifyStateChange('idle');
      if (onComplete) onComplete();
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis utterance notice:", e);
      this.isSpeaking = false;
      this.notifyStateChange('idle');
      if (onComplete) onComplete();
    };

    // Trigger audio playback
    try {
      window.speechSynthesis.speak(utterance);

      // Auto-resume Chrome bug fallback
      setTimeout(() => {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }, 150);
    } catch (err) {
      console.error("SpeechSynthesis execution error", err);
      this.isSpeaking = false;
      this.notifyStateChange('idle');
    }
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) { }
    }
    this.isSpeaking = false;
    this.notifyStateChange('idle');
  }

  // --- 2. Speech-to-Text Recognition Engine ---
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Web Speech Recognition API not supported in this browser.");
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'hi-IN';

    this.recognition.onstart = () => {
      this.isListening = true;
      this.stopSpeaking();
      this.notifyStateChange('listening');
    };

    this.recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      this.notifyTranscript(transcript);

      if (event.results[0].isFinal) {
        this.stopListening();
        this.sendMessage(transcript);
      }
    };

    this.recognition.onerror = (event) => {
      console.warn("Speech Recognition Error:", event.error);
      this.isListening = false;
      this.notifyStateChange('idle');
      if (event.error !== 'no-speech') {
        this.notifyError(`Microphone notice: ${event.error}`);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (!this.isThinking && !this.isSpeaking) {
        this.notifyStateChange('idle');
      }
    };
  }

  startListening() {
    if (this.isSpeaking) this.stopSpeaking();
    if (!this.recognition) {
      this.notifyError("Speech Recognition is not supported on this device/browser. Please type your message.");
      return;
    }
    try {
      this.recognition.start();
    } catch (e) {
      console.warn("Recognition already active", e);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) { }
    }
    this.isListening = false;
  }

  // --- 3. Gemini 3.5 Flash Lite Direct API Communication ---
  async sendMessage(userMessageText) {
    const text = userMessageText ? userMessageText.trim() : '';
    if (!text) return;

    const apiKey = localStorage.getItem('DADI_GEMINI_KEY') || this.config.GEMINI_API_KEY || window.DADI_GEMINI_KEY;

    if (!apiKey) {
      const fallbackMsg = "Namaste Beta! Dadi aapki baat sunne ke liye tayar hai.";
      this.history.push({ role: 'user', parts: [{ text }] });
      this.history.push({ role: 'model', parts: [{ text: fallbackMsg }] });
      this.saveHistory();
      this.emitMessageAdded();
      this.speakText(fallbackMsg);
      return;
    }

    // Add user turn to session history
    this.history.push({ role: 'user', parts: [{ text }] });
    this.saveHistory();
    this.emitMessageAdded();

    this.isThinking = true;
    this.notifyStateChange('thinking');

    try {
      const modelName = this.config.MODEL_NAME || 'gemini-3.5-flash-lite';
      const endpoint = `${this.config.API_BASE_URL}/${modelName}:generateContent?key=${apiKey}`;

      const contents = this.history.map(item => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: item.parts
      }));

      const requestBody = {
        contents: contents,
        systemInstruction: {
          parts: [{ text: this.config.SYSTEM_INSTRUCTION }]
        },
        generationConfig: this.config.GENERATION_CONFIG || {
          temperature: 0.85,
          maxOutputTokens: 300
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `API Error ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Namaste Beta! Main hamesha aapke saath hoon.";

      // Add model turn to session history
      this.history.push({ role: 'model', parts: [{ text: replyText }] });
      this.saveHistory();
      this.emitMessageAdded();

      this.isThinking = false;
      this.notifyStateChange('idle');

      // Speak Dadi's reply using universal audio TTS
      this.speakText(replyText);

    } catch (error) {
      console.error("Dadi AI Gemini API Error:", error);
      this.isThinking = false;
      this.notifyStateChange('idle');

      const fallbackReply = "Beta, Dadi ne aapki baat sun li. Aap kaise hain? Mujhe batayein.";
      this.history.push({ role: 'model', parts: [{ text: fallbackReply }] });
      this.saveHistory();
      this.emitMessageAdded();

      this.speakText(fallbackReply);
    }
  }
}

// Global Singleton Instance
window.dadiAI = new DadiAIService();
