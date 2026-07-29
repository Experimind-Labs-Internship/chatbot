import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";

export default function VoiceAssistant() {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onend = () => setListening(false);

    recognition.onerror = () => setListening(false);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;

      const reply = await askGemini(transcript);

      speak(reply);
    };

    recognitionRef.current = recognition;
  }, []);

  async function askGemini(message) {
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await res.json();

      return data.reply;
    } catch {
      return "Sorry, I couldn't connect to the assistant.";
    }
  }

  function speak(text) {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = speechSynthesis.getVoices();

    const female =
      voices.find(v => v.name.includes("Google UK English Female")) ||
      voices.find(v => v.name.includes("Microsoft Sonia")) ||
      voices.find(v => v.name.includes("Microsoft Natasha")) ||
      voices.find(v => v.name.includes("Samantha")) ||
      voices.find(v => v.name.includes("Zira")) ||
      voices.find(v => v.lang.startsWith("en"));

    if (female) utterance.voice = female;

    utterance.rate = 1;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
  }

  function startListening() {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  }

  return (
    <button
      onClick={startListening}
      className={`fixed bottom-24 right-6 z-50 h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-all ${
        listening
          ? "bg-red-500 animate-pulse"
          : "bg-[#465348] hover:bg-[#39443A]"
      }`}
    >
      {listening ? (
        <MicOff className="text-white" size={26} />
      ) : (
        <Mic className="text-white" size={26} />
      )}
    </button>
  );
}