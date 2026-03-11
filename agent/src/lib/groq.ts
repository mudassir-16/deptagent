import Groq from "groq-sdk";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

export const groq = apiKey ? new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true 
}) : null;

export async function getGroqResponse(messages: { role: 'user' | 'assistant' | 'system', content: string }[], language: string = 'en') {
  if (!groq) {
    const offlineMsgs: Record<string, string> = {
      en: "AI Assistant is running in offline mode. I can still help you with rank predictions based on the official data!",
      te: "AI అసిస్టెంట్ ఆఫ్-లైన్ మోడ్‌లో ఉంది. అడ్మిషన్ వివరాల కోసం దయచేసి మీ ర్యాంక్‌ను చెప్పండి.",
      hi: "AI असिस्टेंट ऑफलाइन मोड में है। मैं अभी भी आधिकारिक डेटा के आधार पर रैंक भविष्यवाणी में आपकी मदद कर सकता हूँ!"
    };
    return offlineMsgs[language] || offlineMsgs.en;
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.1-8b-instant", // Updated to current stable model
    });

    return completion.choices[0]?.message?.content || "No response generated.";
  } catch (error) {
    console.error("Groq API Error:", error);
    return "I'm having trouble connecting to my brain, but I'm still here to help with rank calculations.";
  }
}
