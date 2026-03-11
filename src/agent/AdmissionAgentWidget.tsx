import { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, Send, Mic, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockBranches, mockPlacements, mockInfra } from './mockData';
import { getGroqResponse } from '@/lib/groq';
import { Message, Branch, Language } from './types';
import './AgentWidget.css';

// ─── Speech Recognition type stubs ─────────────────────────────────────────
interface SpeechRecognitionEvent extends Event {
  results: { [index: number]: { [index: number]: { transcript: string } } };
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function AdmissionAgentWidget() {
  const [language, setLanguage] = useState<Language>('en');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [predictedBranches, setPredictedBranches] = useState<Branch[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const langNames: Record<Language, string> = {
    en: 'English',
    te: 'తెలుగు (Telugu)',
    hi: 'हिन्दी (Hindi)',
  };

  // Auto-clear error after 5 s
  useEffect(() => {
    if (!errorMsg) return;
    const t = setTimeout(() => setErrorMsg(null), 5000);
    return () => clearTimeout(t);
  }, [errorMsg]);

  // ── TTS ────────────────────────────────────────────────────────────────────
  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!text || !isVoiceEnabled || !window.speechSynthesis) {
        onEnd?.();
        return;
      }
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const cleanText = text
        .replace(/###/g, '')
        .replace(/\*/g, '')
        .replace(/\[|\]/g, '')
        .replace(/\n/g, ' ');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const langCodes: Record<Language, string> = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' };
      const currentLangCode = langCodes[language];
      utterance.lang = currentLangCode;

      const voices = window.speechSynthesis.getVoices();
      let voice = voices.find(v => v.lang.startsWith(currentLangCode) && !v.name.includes('Online'));
      if (!voice) voice = voices.find(v => v.lang.startsWith(currentLangCode));
      if (voice) utterance.voice = voice;

      utterance.rate = language === 'en' ? 1.0 : 0.85;
      utterance.pitch = 1.0;
      utterance.onend = () => onEnd?.();
      utterance.onerror = e => {
        if ((e as any).error !== 'interrupted') {
          const fallback = new SpeechSynthesisUtterance(cleanText);
          fallback.lang = currentLangCode;
          if (onEnd) fallback.onend = () => onEnd();
          window.speechSynthesis.speak(fallback);
        } else {
          onEnd?.();
        }
      };

      window.speechSynthesis.speak(utterance);
    },
    [isVoiceEnabled, language],
  );

  // ── Greeting when language changes ─────────────────────────────────────────
  useEffect(() => {
    const greetings: Record<Language, string> = {
      en: "Hello! I'm your VITS Admission Agent. How can I help you today?",
      te: "నమస్కారం! నేను విస్ కాలేజీ అడ్మిషన్ అసిస్టెంట్‌ను. మీకు ఎలా సహాయపడగలను?",
      hi: "नमस्ते! मैं विट्स कॉलेज एडमिशन असिस्टेंट हूँ। मैं आपकी कैसे मदद कर सकता हूँ?",
    };
    const text = greetings[language];
    setMessages([{ id: '1', role: 'bot', content: text, timestamp: new Date() }]);
    if (messages.length > 1) speak(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Speech Recognition ─────────────────────────────────────────────────────
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' }[language];

    rec.onresult = (e: SpeechRecognitionEvent) => {
      const t = e.results[0][0].transcript;
      setInputValue(t);
      handleSendMessage(t);
    };
    rec.onerror = (e: any) => {
      setErrorMsg(
        e.error === 'not-allowed'
          ? 'Microphone access denied.'
          : `Voice error: ${e.error}`,
      );
      setIsListening(false);
    };
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // ── Toggle mic ─────────────────────────────────────────────────────────────
  const toggleListening = () => {
    if (!recognitionRef.current) {
      setErrorMsg('Voice input not supported. Please use Chrome or Edge.');
      return;
    }
    if (isListening) {
      try { recognitionRef.current.stop(); } catch (_) { /* noop */ }
      setIsListening(false);
    } else {
      setInputValue('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setErrorMsg(null);
      } catch (_) {
        setErrorMsg('Could not start microphone. Please try again.');
        setIsListening(false);
      }
    }
  };

  // ── Send message ────────────────────────────────────────────────────────────
  const handleSendMessage = async (textOverride?: string) => {
    const text = (textOverride ?? inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Rank prediction shortcut
    const rankMatch = text.match(/\b\d{1,7}\b/);
    const hasRankKw =
      /rank|ర్యాంక్|रैंक|my rank is/i.test(text);

    if (rankMatch && hasRankKw) {
      const rank = parseInt(rankMatch[0]);
      const possible = mockBranches
        .filter(b => rank <= b.cutoff_rank)
        .sort((a, b) => a.cutoff_rank - b.cutoff_rank);

      setPredictedBranches(possible);

      let resp = '';
      if (language === 'te') {
        resp = possible.length === mockBranches.length
          ? `మీ ర్యాంక్ ${rank} చాలా మంచిది! మీరు అన్ని బ్రాంచ్‌లలో సీటు పొందే అవకాశం ఉంది.`
          : possible.length > 0
          ? `మీ ర్యాంక్ ${rank} ప్రకారం ${possible.length} బ్రాంచ్‌లు: ${possible.map(b => b.name).join(', ')}.`
          : `క్షమించండి, ర్యాంక్ ${rank} తో సీటు రావడం కష్టం. మేనేజ్‌మెంట్ కోటా గురించి అడగండి.`;
      } else if (language === 'hi') {
        resp = possible.length === mockBranches.length
          ? `आपकी रैंक ${rank} बहुत अच्छी है! सभी शाखाओं में सीट मिलने की संभावना है।`
          : possible.length > 0
          ? `रैंक ${rank} के आधार पर ${possible.length} शाखाएं: ${possible.map(b => b.name).join(', ')}।`
          : `क्षमा करें, रैंक ${rank} से सीट मिलना मुश्किल है। मैनेजमेंट कोटा के लिए संपर्क करें।`;
      } else {
        resp = possible.length === mockBranches.length
          ? `Your rank ${rank} is excellent! You qualify for all branches. Select one below for details.`
          : possible.length > 0
          ? `Based on rank ${rank}, you may get into: ${possible.map(b => b.name).join(', ')}.`
          : `With rank ${rank}, a seat may be difficult. Please enquire about the Management Quota.`;
      }

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: 'bot', content: resp, timestamp: new Date() },
        ]);
        setIsLoading(false);
        speak(resp);
      }, 500);
      return;
    }

    // AI (Groq) response
    const history = messages.slice(-5).map(m => ({
      role: (m.role === 'bot' ? 'assistant' : 'user') as 'assistant' | 'user',
      content: m.content,
    }));
    history.push({ role: 'user', content: text });

    const systemPrompt = {
      role: 'system' as const,
      content: `You are a virtual admission counselor for VITS College.
STRICT LANGUAGE RULE: Reply ONLY in ${langNames[language]}.
COLLEGE DATA:
- Placements: Highest ${mockPlacements[0].highest_package}, Avg ${mockPlacements[0].average_package}.
- Infrastructure: ${mockInfra.map(i => i.category + ': ' + i.details).join(' ')}.
- Branches: ${mockBranches.map(b => b.name).join(', ')}.
Response style: Conversational, helpful, brief (suitable for read-aloud).`,
    };

    const aiResp = await getGroqResponse([systemPrompt, ...history], language);
    setMessages(prev => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: 'bot', content: aiResp, timestamp: new Date() },
    ]);
    setIsLoading(false);
    speak(aiResp, () => {
      if (isVoiceEnabled && isChatOpen) setTimeout(toggleListening, 500);
    });
  };

  // ── Branch detail card ──────────────────────────────────────────────────────
  const handleBranchSelect = (branch: Branch) => {
    let content = '';
    let speech = '';

    if (language === 'te') {
      content = `### ${branch.name}\n${branch.description}\n\n**కోఆర్డినేటర్:** ${branch.coordinator_name}\n**ఈమెయిల్:** ${branch.coordinator_email}\n**ఫోన్:** ${branch.coordinator_phone}`;
      speech = `${branch.name} కోఆర్డినేటర్ ${branch.coordinator_name}.`;
    } else if (language === 'hi') {
      content = `### ${branch.name}\n${branch.description}\n\n**समन्वयक:** ${branch.coordinator_name}\n**ईमेल:** ${branch.coordinator_email}\n**फोन:** ${branch.coordinator_phone}`;
      speech = `${branch.name} के समन्वयक ${branch.coordinator_name} हैं।`;
    } else {
      content = `### ${branch.name}\n${branch.description}\n\n**Coordinator:** ${branch.coordinator_name}\n**Email:** ${branch.coordinator_email}\n**Phone:** ${branch.coordinator_phone}`;
      speech = `The ${branch.name} coordinator is ${branch.coordinator_name}.`;
    }

    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), role: 'bot', content, timestamp: new Date() },
    ]);
    setPredictedBranches([]);
    speak(speech, () => {
      if (isVoiceEnabled && isChatOpen) setTimeout(toggleListening, 500);
    });
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="agent-widget-wrapper">
      {/* Floating Bubble */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="agent-floating-bubble"
          onClick={() => {
            setIsChatOpen(true);
            if (messages.length === 0) {
              const greeting =
                language === 'te'
                  ? 'నమస్కారం! నేను విస్ కాలేజీ అడ్మిషన్ అసిస్టెంట్‌ను.'
                  : language === 'hi'
                  ? 'नमस्ते! मैं विट्स कॉलेज एडमिशन असिस्टेंट हूँ।'
                  : "Hello! I'm your VITS Admission Agent. How can I help you?";
              setMessages([{ id: '1', role: 'bot', content: greeting, timestamp: new Date() }]);
              speak(greeting);
            }
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={30} />
          </div>
          <div className="agent-bubble-badge">
            <Sparkles size={11} />
          </div>
          <span className="agent-bubble-tooltip">Admission Agent</span>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="agent-widget-window"
          >
            {/* Header */}
            <div className="agent-widget-header">
              <div className="agent-header-info">
                <div className="agent-avatar-wrap">
                  <Bot size={20} />
                  <div className="agent-online-dot" />
                </div>
                <div>
                  <h4>VITS Admission Agent</h4>
                  <p>{langNames[language]} • Online</p>
                </div>
              </div>
              <div className="agent-header-actions">
                <select
                  className="agent-lang-select"
                  value={language}
                  onChange={e => setLanguage(e.target.value as Language)}
                >
                  <option value="en">English</option>
                  <option value="te">తెలుగు</option>
                  <option value="hi">हिन्दी</option>
                </select>
                <button className="agent-close-btn" onClick={() => setIsChatOpen(false)}>
                  &times;
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="agent-messages-area">
              {messages.map(m => (
                <div key={m.id} className={`agent-msg-row ${m.role}`}>
                  <div className="agent-msg-bubble">
                    {m.content.split('\n').map((line, i) => (
                      <p key={i}>
                        {line.startsWith('###') ? <strong>{line.replace('###', '').trim()}</strong> : line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {predictedBranches.length > 0 && (
                <div className="agent-branch-options">
                  {predictedBranches.map(b => (
                    <button key={b.id} className="agent-branch-btn" onClick={() => handleBranchSelect(b)}>
                      {b.name}
                    </button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className="agent-msg-row bot">
                  <div className="agent-msg-bubble">
                    <div className="agent-typing-dots">
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Error toast */}
            {errorMsg && <div className="agent-error-toast">{errorMsg}</div>}

            {/* Input */}
            <div className="agent-input-area">
              <button
                className={`agent-mic-btn${isListening ? ' listening' : ''}`}
                onClick={toggleListening}
                title={isListening ? 'Stop listening' : 'Voice input'}
              >
                <Mic size={20} />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder={
                  isListening
                    ? language === 'te'
                      ? 'వింటున్నాను...'
                      : 'Listening...'
                    : 'Ask me anything...'
                }
              />
              <button
                className="agent-send-btn"
                onClick={() => handleSendMessage()}
                disabled={isLoading}
                title="Send"
              >
                <Send size={18} />
              </button>
            </div>

            <div className="agent-widget-footer">AI Support · VITS Admissions</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
