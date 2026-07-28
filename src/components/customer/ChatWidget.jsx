import { useEffect, useRef, useState } from "react";
import { FiSend, FiX, FiMic, FiVolume2 } from "react-icons/fi";
import { getAllProducts } from "../../firebase/productService";
import logo from "../../assets/images/logo/logo.png";
import "./ChatWidget.css";
import ReactMarkdown from "react-markdown";
const STORAGE_KEY = "yumi-chat-messages";
const STARTER_MESSAGE = {
  role: "assistant",
  content: "Hi! I’m the Yumi Assistant. I can help you find an outfit or answer questions about shipping, returns, and payments.",
};

const SUGGESTIONS = [
  "Help me find a kaftan",
  "What is your return policy?",
  "How long does shipping take?",
];

function readStoredMessages() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : [STARTER_MESSAGE];
  } catch {
    return [STARTER_MESSAGE];
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(readStoredMessages);
  const [isSending, setIsSending] = useState(false);
  const [catalogue, setCatalogue] = useState([]);
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
  getAllProducts()
    .then((products) => {
      console.log("Products:", products);

      setCatalogue(
        products.map(
          ({ id, name, price, category, description, image, images }) => ({
            id,
            name,
            price,
            category,
            description,
            image: image || images?.[0] || "",
          })
        )
      );
    })
    .catch((err) => {
      console.error("Firebase products error:", err);
      setCatalogue([]);
    });
}, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);
  useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) return;

  recognitionRef.current = new SpeechRecognition();
  recognitionRef.current.lang = "en-IN";
  recognitionRef.current.interimResults = false;
  recognitionRef.current.continuous = false;
}, []);



function startListening() {
  const recognition = recognitionRef.current;

  if (!recognition) {
    alert("Voice recognition isn't supported in this browser.");
    return;
  }

  if (listening) return;

  setListening(true);

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;

    setListening(false);

    sendMessage(text);
  };

  recognition.onerror = () => {
    setListening(false);
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.start();
}



function speak(text) {
  if (!voiceEnabled) return;

  if (!("speechSynthesis" in window)) {
    console.log("Speech synthesis not supported");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Load available voices
  const voices = window.speechSynthesis.getVoices();

console.log(voices);

// Only use a voice if it actually exists
if (voices.length > 0) {
  const femaleVoice =
    voices.find(v => v.name === "Microsoft Aria Online (Natural)") ||
    voices.find(v => v.name === "Microsoft Jenny Online (Natural)") ||
    voices.find(v => v.name === "Google UK English Female");

  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }
}


  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1.15;
  utterance.volume = 1;

  utterance.onstart = () => setSpeaking(true);
  utterance.onend = () => setSpeaking(false);
  utterance.onerror = (e) => {
  if (e.error !== "interrupted") {
    console.error(e);
  }

  setSpeaking(false);
};

  window.speechSynthesis.speak(utterance);
}

  async function sendMessage(rawMessage) {
    const text = rawMessage.trim();
    if (!text || isSending) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(-8),
          catalogue,
          page: window.location.pathname,
        }),
      });
      const data = await response.json();

console.log("API Response:", data);

if (!response.ok) {
  throw new Error(data.message);
}
      setMessages((current) => [
  ...current,
  { role: "assistant", content: data.reply },
]);

speak(data.reply);
    } catch {
      const errorReply =
  "I’m sorry, I can’t connect right now. Please try again shortly or visit our Contact page.";

setMessages((current) => [
  ...current,
  {
    role: "assistant",
    content: errorReply,
  },
]);

speak(errorReply);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="yumi-chat" aria-live="polite">
      {isOpen && (
        <section className="yumi-chat__panel" aria-label="Yumi customer support chat">
          <header className="yumi-chat__header">
            <img src={logo} alt="Yumi" className="yumi-chat__logo" />
            <div>
              <h2>Yumi Assistant</h2>
              <p><span /> Customer support</p>
            </div>
            <button type="button" className="yumi-chat__close" onClick={() => {
  window.speechSynthesis.cancel();
  setIsOpen(false);
}} aria-label="Close chat">
              <FiX />
            </button>
          </header>

          <div className="yumi-chat__messages" ref={messagesRef}>
            {messages.map((item, index) => (
              <div
  key={`${item.role}-${index}`}
  className={`yumi-chat__message yumi-chat__message--${item.role}`}
>
  <ReactMarkdown
  components={{
    a: ({ href, children }) => (
      <a
        href={href}
        target="_self"
        rel="noopener noreferrer"
        style={{
          color: "#465348",
          fontWeight: 600,
          textDecoration: "underline",
        }}
      >
        {children}
      </a>
    ),
  }}
>
  {item.content}
</ReactMarkdown>
</div>
            ))}
            {isSending && <p className="yumi-chat__typing">Yumi Assistant is typing…</p>}
          </div>

          <div className="yumi-chat__suggestions">
            {SUGGESTIONS.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} disabled={isSending}>
                {suggestion}
              </button>
            ))}
          </div>
          {listening && (
  <div className="yumi-chat__voice-status">
    🎤 Listening...
  </div>
)}
{speaking && (
  <div className="yumi-chat__voice-status">
    🔊 Speaking...
  </div>
)}
          <form
  className="yumi-chat__form"
  onSubmit={(e) => {
    e.preventDefault();
    sendMessage(message);
  }}
>
  <label className="sr-only" htmlFor="yumi-chat-input">
    Your message
  </label>

  <input
    id="yumi-chat-input"
    ref={inputRef}
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    maxLength="1000"
    placeholder="Type your message…"
    disabled={isSending}
  />

  <div className="yumi-chat__actions">

    <button
  type="button"
  disabled={!recognitionRef.current}
  className={`yumi-chat__icon-btn ${
    listening ? "yumi-chat__icon-btn--listening" : ""
  }`}
  onClick={startListening}
  title="Voice Input"
>
  <FiMic />
</button>

    <button
  type="button"
  className="yumi-chat__icon-btn"
  onClick={() => {
    if (voiceEnabled) {
      window.speechSynthesis.cancel();
    }
    setVoiceEnabled(!voiceEnabled);
  }}
  title={voiceEnabled ? "Mute Voice" : "Enable Voice"}
>
  <FiVolume2
    style={{
      opacity: voiceEnabled ? 1 : 0.4,
    }}
  />
</button>

    <button
      type="submit"
      className="yumi-chat__icon-btn"
      disabled={isSending || !message.trim()}
    >
      <FiSend />
    </button>

  </div>
</form>
          <p className="yumi-chat__notice">Messages are processed to provide support.</p>
        </section>
      )}

      <button type="button" className="yumi-chat__launcher" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-label={isOpen ? "Close Yumi Assistant" : "Open Yumi Assistant"}>
        {isOpen ? <FiX /> : <img src={logo} alt="" />}
      </button>
    </div>
  );
}
