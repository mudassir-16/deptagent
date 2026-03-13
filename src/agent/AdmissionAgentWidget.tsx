import { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, Send, Mic, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockBranches, mockPlacements, mockInfra, departmentInfo, facultyList, clubs, mouPartners, departmentHighlights } from './mockData';
import { getGroqResponse, groq } from '@/lib/groq';
import { Message, Branch, Language } from './types';
import './AgentWidget.css';

import { createPortal } from 'react-dom';

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

// ── Greetings ──────────────────────────────────────────────────────────────
const GREETINGS: Record<Language, string> = {
  en: "Hello! I'm the AI Counselor for the IT Department - Vignan Institute of Technology and Science. How can I assist you today?",
  te: "నమస్కారం! నేను IT డిపార్ట్‌మెంట్ - విజ్ఞాన్ ఇన్స్టిట్యూట్ ఆఫ్ టెక్నాలజీ అండ్ సైన్స్ కౌన్సెలర్‌ను. మీకు ఎలా సహాయపడగలను?",
};

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
  const lastSpokenGreetingRef = useRef<string>('');
  const handleSendMessageRef = useRef<any>(null);
  const lastBotMsgRef = useRef<string>('');
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const langNames: Record<Language, string> = {
    en: 'English',
    te: 'తెలుగు (Telugu)',
  };

  // ── Auto-clear error ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!errorMsg) return;
    const t = setTimeout(() => setErrorMsg(null), 5000);
    return () => clearTimeout(t);
  }, [errorMsg]);

  // ── Load voices into ref (voiceschanged fires async in Chrome) ──────────────
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const load = () => {
      const v = synth.getVoices();
      if (v.length > 0) {
        voicesRef.current = v;
        console.log('[TTS] voices loaded:', v.length, '|', v[0]?.name);
      }
    };
    load(); // works immediately in Firefox/Safari
    synth.addEventListener('voiceschanged', load);
    
    // Unlock Speech API on first user interaction (Chrome requirement)
    const unlock = () => {
      const u = new SpeechSynthesisUtterance('');
      u.volume = 0;
      window.speechSynthesis.speak(u);
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      console.log('[TTS] Audio context unlocked');
    };
    window.addEventListener('click', unlock);
    window.addEventListener('touchstart', unlock);
    
    return () => {
      synth.removeEventListener('voiceschanged', load);
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, []);


  // ── TTS: Robust chunked implementation for Chrome ──────────
  const currentChunksRef = useRef<string[]>([]);
  const currentOnEndRef = useRef<(() => void) | undefined>();
  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      const synth = window.speechSynthesis;
      if (!synth || !text) { onEnd?.(); return; }

      // Reset state
      if (keepAliveRef.current) { clearInterval(keepAliveRef.current); keepAliveRef.current = null; }
      synth.cancel();
      currentChunksRef.current = [];
      currentOnEndRef.current = onEnd;

      const clean = text.replace(/[#*[\]]/g, '').replace(/\n/g, ' ').trim();
      if (!clean) { onEnd?.(); return; }

      // CRITICAL FIX: Chrome/Edge fail silently or crash on long text or pure-punctuation. 
      // Match standard punctuation and Commas (,)
      // This regex ensures each chunk starts with a letter/word, followed by optional punctuation.
      const chunks = clean.match(/[^.!?,\n]+[.!?,\n]*/g) || [clean];
      
      // Extra safety: Filter out any chunks that don't contain at least one valid word character
      currentChunksRef.current = chunks
        .map(c => c.trim())
        .filter(c => c.length > 0 && /[^\s.!?,\n]/.test(c));

      let voices = voicesRef.current;
      if (voices.length === 0) voices = synth.getVoices();

      const pickVoice = () => {
        const targetLang = language === 'te' ? 'te-IN' : 'en-US';
        if (voices.length === 0) return { voice: undefined, targetLang };

        const langPrefix = targetLang.split('-')[0].toLowerCase();

        let voice;
        if (language === 'te') {
          // Robust Telugu search
          voice = voices.find(v => v.lang.toLowerCase().startsWith('te') && v.name.includes('Google')) ||
                  voices.find(v => v.lang.toLowerCase().startsWith('te') && v.localService) ||
                  voices.find(v => v.lang.toLowerCase().startsWith('te')) ||
                  voices.find(v => v.name.toLowerCase().includes('telugu') || v.name.toLowerCase().includes('తెలుగు'));
        } else {
          // English search
          voice = voices.find(v => v.lang.toLowerCase() === 'en-us' && v.localService) ||
                  voices.find(v => v.lang.toLowerCase().startsWith('en-'));
        }

        console.log(`[TTS] Selected voice for ${language}:`, voice ? voice.name : 'System Default Fallback');

        // Fallback: If we don't have a specific voice, and it's English, pick the first one.
        // If it's NOT English, we return undefined so the browser's native engine tries to auto-detect and speak it.
        if (!voice && language === 'en') {
          voice = voices[0];
        }

        return { voice: voice || undefined, targetLang };
      };
      const voiceSelection = pickVoice();

      const speakNextChunk = () => {
        if (currentChunksRef.current.length === 0) {
          console.log('[TTS] ✓ all chunks done');
          if (keepAliveRef.current) { clearInterval(keepAliveRef.current); keepAliveRef.current = null; }
          currentOnEndRef.current?.();
          return;
        }

        const chunk = currentChunksRef.current.shift()!;
        const utt = new SpeechSynthesisUtterance(chunk);
        
        if (voiceSelection.voice) { utt.voice = voiceSelection.voice; }
        // EXPLICITLY set the lang to force the browser engine to interpret foreign scripts correctly
        utt.lang = voiceSelection.targetLang;
        
        utt.rate = 1.0; utt.pitch = 1.0; utt.volume = 1.0;

        utt.onstart = () => {
          console.log('[TTS] ▶ playing chunk:', chunk.substring(0, 20) + '...');
          // Keep sending resume to wake Chrome up
          if (!keepAliveRef.current) {
            keepAliveRef.current = setInterval(() => { synth.resume(); }, 5000);
          }
        };

        utt.onend = () => {
          speakNextChunk(); // Chain the next chunk immediately
        };

        utt.onerror = (e: any) => {
          console.warn('[TTS] ✗ error on chunk:', e.error);
          if (e.error === 'interrupted') return; // Cancelled
          speakNextChunk(); // Skip bad chunk and continue
        };

        // Wake Chrome up immediately before speaking
        synth.resume();
        synth.speak(utt);
      };

      // Firefox/Safari work fine synchronously. Chrome usually needs a tiny delay after cancel.
      if (synth.speaking || synth.pending) {
        setTimeout(speakNextChunk, 100);
      } else {
        speakNextChunk();
      }
    },
    [language],
  );

  // ── Greeting on open / language change ────────────────────────────────────
  useEffect(() => {
    const text = GREETINGS[language];

    setMessages(prev => {
      const newGreeting: Message = { id: '1', role: 'bot', content: text, timestamp: new Date() };
      if (prev.length === 0) return [newGreeting];
      if (prev[0].id === '1') return [newGreeting, ...prev.slice(1)];
      return [newGreeting, ...prev];
    });

    if (!isChatOpen) {
      lastSpokenGreetingRef.current = '';
      return;
    }

    if (lastSpokenGreetingRef.current === text) return;

    const timer = setTimeout(() => {
      lastSpokenGreetingRef.current = text;
      speak(text);
    }, 100);
    return () => clearTimeout(timer);
  }, [language, isChatOpen, speak]);

  // ── Scroll to bottom ────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Speech Recognition (STT) ────────────────────────────────────────────────
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = { en: 'en-IN', te: 'te-IN' }[language];

    rec.onresult = (e: SpeechRecognitionEvent) => {
      const t = e.results[0][0].transcript;
      console.log('Voice recognized:', t);
      setInputValue(t);
      if (handleSendMessageRef.current) handleSendMessageRef.current(t);
    };
    rec.onerror = (e: any) => {
      setErrorMsg(e.error === 'not-allowed' ? 'Microphone access denied.' : `Voice error: ${e.error}`);
      setIsListening(false);
    };
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // ── Toggle mic ──────────────────────────────────────────────────────────────
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
  const handleSendMessage = useCallback(async (textOverride?: string) => {
    const text = (textOverride ?? inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const history = messages.slice(-5).map(m => ({
      role: (m.role === 'bot' ? 'assistant' : 'user') as 'assistant' | 'user',
      content: m.content,
    }));
    history.push({ role: 'user', content: text });

    const systemPrompt = {
      role: 'system' as const,
      content: `You are the official AI Counselor for the DEPARTMENT OF INFORMATION TECHNOLOGY at Vignan Institute of Technology and Science (VITS), Hyderabad.

STRICT TOPIC RULE: You ONLY answer questions about the IT Department of VITS. If a user asks about any other department (CSE, ECE, Civil, Mechanical, EEE etc.), any general college info, EAMCET ranks, cutoffs, or anything unrelated to IT Department — politely say: "I can only help with questions about the IT Department. Please contact the college office for other queries."

STRICT LANGUAGE RULE: Reply ONLY in ${langNames[language]}.
Keep responses brief and conversational (suitable for voice read-aloud).

=== ABOUT THE IT DEPARTMENT ===
- Full name: Department of Information Technology, Vignan Institute of Technology and Science
- Established: ${departmentInfo.established} | Intake: ${departmentInfo.intake} students per year
- Location: ${departmentInfo.address}
- Contact: Phone ${departmentInfo.phone} | Email: ${departmentInfo.email}
- Office: ${departmentInfo.officeRoom} | Timings: ${departmentInfo.officeHours}

=== IT DEPARTMENT PLACEMENTS ===
Year-wise placement data:
- 2022-23: 47 out of 50 students placed | 77 offers | Highest: 11 LPA | Recruiters: Informatica, Eunimart, ADP, GlobalLogic
- 2023-24: 37 out of 49 students placed | 54 offers | Highest: 6 LPA | Recruiters: TCS, Infosys, Cognizant
- 2024-25: 20 out of 46 students placed | 31 offers | Highest: 10 LPA | Recruiters: Rinex, GlobalLogic, Infosys, Cognizant
- 2025-26 (ongoing): 9 placed so far | Highest: 13.83 LPA | Recruiters: InsightSoftware, Ndmatrix, Infosys
Best placement year: 2022-23 with 94% placement rate

=== IT DEPARTMENT FACULTY (${facultyList.length} members) ===
${facultyList.map(f => `- ${f.name} | ${f.position} | ${f.qualification} | ${f.experience} experience | Specialization: ${f.specialization}`).join('\n')}

=== IT DEPARTMENT STUDENT CLUBS ===
${clubs.map(c => `- ${c.name} (Est. ${c.established}): ${c.focus} | ${c.members} members | Meets: ${c.schedule}`).join('\n')}
- NG-DSDC Cell: Student-led software development cell. Built the department website, alumni portal (VAAIT), and blood bank system (Pranadhara).

=== IT DEPARTMENT MoUs WITH INDUSTRY ===
${mouPartners.map(m => `${m.organization} (${m.year})`).join(', ')}

=== RESEARCH & ACHIEVEMENTS ===
- Faculty have 100+ publications in Scopus/SCI journals
- Key research areas: Machine Learning, AI, Data Science, Cloud Computing, Cyber Security, Blockchain, Big Data
- Students have won hackathons and secured internships at DRDO, InsightSoftware (50K/month), Swecha-IIIT Hyderabad, and more

For anything not covered here, direct the user to call ${departmentInfo.phone} or email ${departmentInfo.email}.`,
    };

    const aiResp = await getGroqResponse([systemPrompt, ...history], language);
    lastBotMsgRef.current = aiResp;
    setMessages(prev => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: 'bot', content: aiResp, timestamp: new Date() },
    ]);
    setIsLoading(false);
    speak(aiResp, () => {
      if (isVoiceEnabled && isChatOpen) {
        setTimeout(() => { if (isChatOpen) toggleListening(); }, 500);
      }
    });
  }, [isLoading, language, messages, langNames, isChatOpen, isVoiceEnabled, speak]);

  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  }, [handleSendMessage]);

  // ── Branch detail card ──────────────────────────────────────────────────────
  const handleBranchSelect = (branch: Branch) => {
    let content = '';
    let speech = '';

    if (language === 'te') {
      content = `### ${branch.name}\n${branch.description}\n\n**కోఆర్డినేటర్:** ${branch.coordinator_name}\n**ఈమెయిల్:** ${branch.coordinator_email}\n**ఫోన్:** ${branch.coordinator_phone}`;
      speech = `${branch.name} కోఆర్డినేటర్ ${branch.coordinator_name}.`;
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
  const widgetContent = (
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
            const greeting = GREETINGS[language];
            lastSpokenGreetingRef.current = greeting;
            lastBotMsgRef.current = greeting;
            setIsChatOpen(true);
            // Speak directly in onClick — preserves Chrome user-gesture activation
            speak(greeting);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={30} />
          </div>
          <div className="agent-bubble-badge">
            <Sparkles size={11} />
          </div>
          <span className="agent-bubble-tooltip">IT Dept Counselor</span>
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
                  <div className={`agent-online-dot ${!groq ? 'offline' : ''}`} />
                </div>
                <div>
                  <h4>IT Department – Vignan Institute of Technology and Science</h4>
                  <p>{langNames[language]} • {groq ? 'Online' : 'Offline Mode'}</p>
                </div>
              </div>
              <div className="agent-header-actions">
                {/* 🔊 Replay button — direct user gesture, guaranteed to speak */}
                <button
                  className="agent-close-btn"
                  title="Replay last message"
                  style={{ fontSize: '16px' }}
                  onClick={() => {
                    const msg = lastBotMsgRef.current || GREETINGS[language];
                    speak(msg);
                  }}
                >🔊</button>
                <select
                  className="agent-lang-select"
                  value={language}
                  onChange={e => setLanguage(e.target.value as Language)}
                >
                  <option value="en">English</option>
                  <option value="te">తెలుగు</option>
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
                    ? language === 'te' ? 'వింటున్నాను...' : 'Listening...'
                    : language === 'te' ? 'మీ ప్రశ్న అడగండి...' : 'Ask about IT Department, faculty, placements...'
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

            <div className="agent-widget-footer">AI Counselor · IT Department – Vignan Institute of Technology and Science</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return createPortal(widgetContent, document.body);
}
