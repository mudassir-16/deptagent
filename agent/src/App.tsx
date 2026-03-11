import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageSquare, BookOpen, GraduationCap, Building2, TrendingUp, Send, User, Bot, Sparkles, Mic, MicOff, Volume2, VolumeX, Languages } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { mockBranches, mockPlacements, mockInfra } from './mockData'
import { getGroqResponse } from './lib/groq'
import { Message, Branch, Language } from './types'
import './App.css'

// Speech Recognition Type Definition
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [isChatOpen, setIsChatOpen] = useState(false) // Toggle inside Widget
  const [isWidgetOpen, setIsWidgetOpen] = useState(false) // Main bubble toggle
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [predictedBranches, setPredictedBranches] = useState<Branch[]>([])
  const [isListening, setIsListening] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Language display names
  const langNames = {
    en: 'English',
    te: 'తెలుగు (Telugu)',
    hi: 'हिन्दी (Hindi)'
  }

  // Effect to automatically clear error message after 5 seconds
  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMsg])

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      if (availableVoices.length > 0) {
        setVoices(availableVoices)
      }
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  // Text to Speech Function with Language Support
  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!text || !isVoiceEnabled || !window.speechSynthesis) {
        if (onEnd) onEnd()
        return
    }

    // Always cancel previous speech to avoid queueing
    window.speechSynthesis.cancel()
    
    // Safety resume
    window.speechSynthesis.resume()
    
    const cleanText = text.replace(/###/g, '').replace(/\*/g, '').replace(/\[|\]/g, '').replace(/\n/g, ' ')
    const utterance = new SpeechSynthesisUtterance(cleanText)
    
    const langCodes: Record<Language, string> = {
      en: 'en-IN',
      te: 'te-IN',
      hi: 'hi-IN'
    }
    
    const currentLangCode = langCodes[language]
    utterance.lang = currentLangCode
    
    // Get fresh voices
    const availableVoices = window.speechSynthesis.getVoices()
    
    // FORCE LOCAL VOICE FIRST (Online voices like Microsoft Aarti/Natural often fail)
    let selectedVoice = availableVoices.find(v => 
      v.lang.startsWith(currentLangCode) && !v.name.includes('Online')
    )

    // Fallback to ANY voice for that language
    if (!selectedVoice) {
      selectedVoice = availableVoices.find(v => v.lang.startsWith(currentLangCode))
    }

    if (selectedVoice) {
      console.log(`[TTS] Using voice: ${selectedVoice.name}`)
      utterance.voice = selectedVoice
    } else {
      console.warn(`[TTS] No specific voice for ${currentLangCode}. Using browser default.`)
    }
    
    utterance.rate = language === 'en' ? 1.0 : 0.85 
    utterance.pitch = 1.0

    utterance.onstart = () => console.log("[TTS] Audio Started...")
    
    utterance.onend = () => {
      console.log("[TTS] Audio Finished.")
      if (onEnd) onEnd()
    }

    utterance.onerror = (e) => {
      console.error("[TTS] Critical Error:", e.error)
      // FINAL BULLETPROOF FALLBACK: Null out voice and try one last time
      if (e.error !== 'interrupted') {
        const fallback = new SpeechSynthesisUtterance(cleanText)
        fallback.lang = currentLangCode
        if (onEnd) fallback.onend = () => onEnd()
        window.speechSynthesis.speak(fallback)
      } else if (onEnd) {
        onEnd()
      }
    }
    
    window.speechSynthesis.speak(utterance)
  }, [isVoiceEnabled, language])

  // Initial greeting based on language
  useEffect(() => {
    const greetings = {
      en: "Hello! I'm your voice-enabled virtual admission counselor. How can I help you today?",
      te: "నమస్కారం! నేను మీ విర్చువల్ అడ్మిషన్ కౌన్సెలర్‌ను. మీకు ఎలా సహాయపడగలను?",
      hi: "नमस्ते! मैं आपका वर्चुअल एडमिशन काउंसलर हूँ। मैं आपकी कैसे मदद कर सकता हूँ?"
    }
    
    const text = greetings[language]
    setMessages([{
      id: '1',
      role: 'bot',
      content: text,
      timestamp: new Date()
    }])

    // Only speak greeting if it's not the very first load to avoid browser block
    // Or if the user just switched language manually
    if (messages.length > 1) {
        speak(text)
    }
  }, [language])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      
      const langCodes = {
        en: 'en-IN',
        te: 'te-IN',
        hi: 'hi-IN'
      }
      recognition.lang = langCodes[language]

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript
        setInputValue(transcript)
        handleSendMessage(transcript)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        if (event.error === 'not-allowed') {
          setErrorMsg("Microphone access denied. Please enable it in browser settings.")
        } else if (event.error === 'network') {
          setErrorMsg("Network error. Please check your internet connection.")
        } else {
          setErrorMsg(`Voice input error: ${event.error}`)
        }
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    } else {
      console.warn('SpeechRecognition not supported in this browser.')
    }
  }, [language])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setErrorMsg("Voice input is not supported in this browser. Please try Chrome or Edge.")
      return
    }

    if (isListening) {
      try {
        recognitionRef.current.stop()
      } catch (e) {
        console.error("Stop error:", e)
      }
      setIsListening(false)
    } else {
      setInputValue('')
      try {
        recognitionRef.current.start()
        setIsListening(true)
        setErrorMsg(null)
      } catch (e) {
        console.error("Start error:", e)
        setErrorMsg("Could not start microphone. Please try again.")
        setIsListening(false)
      }
    }
  }

  const handleSendMessage = async (textOverride?: string) => {
    const text = textOverride || inputValue
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Check for rank prediction intent
    // Support 1 to 7 digits for rank
    const rankMatch = text.match(/\b\d{1,7}\b/)
    const hasRankKeyword = text.toLowerCase().includes('rank') || 
                          text.toLowerCase().includes('ర్యాంక్') || 
                          text.toLowerCase().includes('रैंक') ||
                          text.toLowerCase().includes('my rank is')
                          
    if (rankMatch && hasRankKeyword) {
      const rank = parseInt(rankMatch[0])
      const possible = mockBranches.filter(b => rank <= b.cutoff_rank)
      
      // Sort possible branches by cutoff rank to show "best fit" first or alphabetically
      possible.sort((a, b) => a.cutoff_rank - b.cutoff_rank)
      
      setPredictedBranches(possible)
      
      let responseContent = ""
      if (language === 'te') {
        if (possible.length === mockBranches.length) {
          responseContent = `మీ ర్యాంక్ ${rank} చాలా మంచిది! మీరు అన్ని బ్రాంచ్‌లలో (CSE, AIML మొదలైనవి) సీటు పొందే అవకాశం ఉంది. వివరాల కోసం క్రింది బ్రాంచ్‌లలో ఒకదాన్ని ఎంచుకోండి.`
        } else if (possible.length > 0) {
          responseContent = `మీ ర్యాంక్ ${rank} ప్రకారం, మీరు ఈ క్రింది ${possible.length} బ్రాంచ్‌లలో అడ్మిషన్ పొందే అవకాశం ఉంది: ${possible.map(b => b.name).join(', ')}.`
        } else {
          responseContent = `క్షమించండి, మీ ర్యాంక్ ${rank} ప్రకారం మా కాలేజీలో సీటు రావడం కొంచెం కష్టం (గత సంవత్సరం కటాఫ్ దాటింది). మీరు మేనేజ్‌మెంట్ కోటా గురించి అడగవచ్చు.`
        }
      } else if (language === 'hi') {
        if (possible.length === mockBranches.length) {
          responseContent = `आपकी रैंक ${rank} बहुत अच्छी है! आपको सभी शाखाओं में सीट मिलने की पूरी संभावना है। जानकारी के लिए नीचे दी गई किसी भी शाखा को चुनें।`
        } else if (possible.length > 0) {
          responseContent = `आपकी रैंक ${rank} के आधार पर, आपको इन ${possible.length} शाखाओं में प्रवेश मिल सकता है: ${possible.map(b => b.name).join(', ')}।`
        } else {
          responseContent = `क्षमा करें, आपकी रैंक ${rank} के आधार पर सीट मिलना मुश्किल है। आप मैनेजमेंट कोटा के लिए संपर्क कर सकते हैं।`
        }
      } else {
        if (possible.length === mockBranches.length) {
          responseContent = `Your rank ${rank} is excellent! You qualify for all branches including CSE and AI&ML. Select a branch below for more details.`
        } else if (possible.length > 0) {
          responseContent = `Based on your rank ${rank}, you have a chance of getting admission in ${possible.length} branches: ${possible.map(b => b.name).join(', ')}.`
        } else {
          responseContent = `I'm sorry, with a rank of ${rank}, it might be difficult to get a seat based on last year's cutoffs. You can enquire about the Management Quota.`
        }
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: responseContent,
        timestamp: new Date()
      }
      
      setTimeout(() => {
        setMessages(prev => [...prev, botResponse])
        setIsLoading(false)
        speak(responseContent)
      }, 500)
      return
    }

    // AI response
    const groqHistory = messages.slice(-5).map(m => ({ 
      role: (m.role === 'bot' ? 'assistant' : 'user') as 'assistant' | 'user', 
      content: m.content 
    }))
    groqHistory.push({ role: 'user', content: text })

    const systemPrompt = {
      role: 'system' as const,
      content: `You are a virtual admission counselor for VITS College. 
      STRICT LANGUAGE RULE: You MUST speak ONLY in ${langNames[language]}. 
      - Current Language Setting: ${language.toUpperCase()} (${langNames[language]})
      - If the setting is TE, reply ONLY in Telugu script.
      - If the setting is HI, reply ONLY in Hindi script.
      - NEVER reply in English if the setting is TE or HI.

      COLLEGE DATA:
      - Placements: Highest ${mockPlacements[0].highest_package}, Avg ${mockPlacements[0].average_package}.
      - Infrastructure: ${mockInfra.map(i => i.category + ': ' + i.details).join(' ')}.
      - Branches: ${mockBranches.map(b => b.name).join(', ')}.
      
      Response style: Naturally conversational, helpful, and brief (perfect for being read aloud).`
    }

    const aiResponse = await getGroqResponse([systemPrompt, ...groqHistory], language)
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      content: aiResponse,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, botMessage])
    setIsLoading(false)
    
    // Speak and then automatically resume listening
    speak(aiResponse, () => {
      if (isVoiceEnabled && isChatOpen) {
        // Safe timeout to prevent immediate trigger after speaking
        setTimeout(() => toggleListening(), 500)
      }
    })
  }

  const handleBranchSelect = (branch: Branch) => {
    let content = ""
    let speech = ""

    if (language === 'te') {
      content = `### ${branch.name}\n${branch.description}\n\n**కోఆర్డినేటర్:** ${branch.coordinator_name}\n**ఈమెయిల్:** ${branch.coordinator_email}\n**ఫోన్:** ${branch.coordinator_phone}`
      speech = `${branch.name} కోఆర్డినేటర్ ${branch.coordinator_name}. మీరు వారిని ${branch.coordinator_email} లో సంప్రదించవచ్చు.`
    } else if (language === 'hi') {
      content = `### ${branch.name}\n${branch.description}\n\n**समन्वयक (Coordinator):** ${branch.coordinator_name}\n**ईमेल:** ${branch.coordinator_email}\n**फोन:** ${branch.coordinator_phone}`
      speech = `${branch.name} के समन्वयक ${branch.coordinator_name} हैं। आप उनसे ${branch.coordinator_email} पर संपर्क कर सकते हैं।`
    } else {
      content = `### ${branch.name}\n${branch.description}\n\n**Coordinator:** ${branch.coordinator_name}\n**Email:** ${branch.coordinator_email}\n**Phone:** ${branch.coordinator_phone}`
      speech = `The ${branch.name} coordinator is ${branch.coordinator_name}.`
    }

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'bot',
      content: content,
      timestamp: new Date()
    }])
    setPredictedBranches([])
    
    // Resume listening after explaining the branch
    speak(speech, () => {
      if (isVoiceEnabled && isChatOpen) {
        setTimeout(() => toggleListening(), 500)
      }
    })
  }

  return (
    <div className="agent-widget-wrapper">
      {/* Floating Chat Bubble Button */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsChatOpen(true);
            if (messages.length === 0) {
              const greeting = language === 'te' 
                ? "నమస్కారం! నేను విస్ కాలేజీ అడ్మిషన్ అసిస్టెంట్‌ను. మీకు ఎలా సహాయపడగలను?" 
                : language === 'hi' 
                ? "नमस्ते! मैं विट्स कॉलेज एडमिशन असिस्टेंट हूँ। मैं आपकी कैसे मदद कर सकता हूँ?" 
                : "Hello! I'm your VITS Admission Agent. How can I help you today?";
              setMessages([{ id: '1', role: 'bot', content: greeting, timestamp: new Date() }]);
              speak(greeting);
            }
          }}
          className="floating-bubble glass"
        >
          <div className="bubble-icon">
            <Bot size={32} />
          </div>
          <div className="bubble-badge">
            <Sparkles size={12} />
          </div>
          <span className="bubble-tooltip">Admission Agent</span>
        </motion.button>
      )}

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="widget-window glass"
          >
            <div className="widget-header">
              <div className="header-info">
                <div className="agent-avatar">
                  <Bot size={20} />
                  <div className="online-indicator"></div>
                </div>
                <div>
                  <h4>VITS Admission Agent</h4>
                  <p>{langNames[language]} • Online</p>
                </div>
              </div>
              <div className="header-actions">
                <select 
                  className="lang-select-mini"
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value as Language)}
                >
                  <option value="te">తెలుగు</option>
                  <option value="hi">हिन्दी</option>
                  <option value="en">English</option>
                </select>
                <button className="close-btn" onClick={() => setIsChatOpen(false)}>&times;</button>
              </div>
            </div>

            <div className="widget-messages">
              {messages.map((m) => (
                <div key={m.id} className={`msg-row ${m.role}`}>
                  <div className="msg-bubble">
                    {m.content.split('\n').map((line, i) => (
                      <p key={i}>{line.startsWith('###') ? <strong>{line.replace('###', '')}</strong> : line}</p>
                    ))}
                  </div>
                </div>
              ))}
              
              {predictedBranches.length > 0 && (
                <div className="widget-branch-options">
                  {predictedBranches.map(branch => (
                    <button key={branch.id} className="branch-mini-btn" onClick={() => handleBranchSelect(branch)}>
                      {branch.name}
                    </button>
                  ))}
                </div>
              )}

              {isLoading && <div className="msg-row bot"><div className="typing-dots"><span></span><span></span><span></span></div></div>}
              <div ref={messagesEndRef} />
            </div>

            {errorMsg && <div className="widget-error-toast">{errorMsg}</div>}

            <div className="widget-input-area">
              <button className={`widget-mic ${isListening ? 'active' : ''}`} onClick={toggleListening}>
                <Mic size={20} />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isListening ? (language === 'te' ? "వింటున్నాను..." : "Listening...") : "Ask me anything..."}
              />
              <button className="widget-send" onClick={() => handleSendMessage()} disabled={isLoading}>
                <Send size={18} />
              </button>
            </div>
            <div className="widget-footer">
              AI Support for VITS Admissions
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
