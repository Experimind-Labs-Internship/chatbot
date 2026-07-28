import { useEffect, useRef, useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import { getAllProducts } from "../../firebase/productService";
import logo from "../../assets/images/logo/logo.png";
import "./ChatWidget.css";

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
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    getAllProducts()
      .then((products) => setCatalogue(products.map(({ id, name, price, category, description, image, images }) => ({
        id,
        name,
        price,
        category,
        description,
        image: image || images?.[0] || "",
      }))))
      .catch(() => setCatalogue([]));
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

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
      if (!response.ok) throw new Error(data.message || "Unable to get a response.");
      setMessages((current) => [...current, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((current) => [...current, {
        role: "assistant",
        content: "I’m sorry, I can’t connect right now. Please try again shortly or visit our Contact page.",
      }]);
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
            <button type="button" className="yumi-chat__close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <FiX />
            </button>
          </header>

          <div className="yumi-chat__messages" ref={messagesRef}>
            {messages.map((item, index) => (
              <p key={`${item.role}-${index}`} className={`yumi-chat__message yumi-chat__message--${item.role}`}>
                {item.content}
              </p>
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

          <form className="yumi-chat__form" onSubmit={(event) => { event.preventDefault(); sendMessage(message); }}>
            <label className="sr-only" htmlFor="yumi-chat-input">Your message</label>
            <input id="yumi-chat-input" ref={inputRef} value={message} onChange={(event) => setMessage(event.target.value)} maxLength="1000" placeholder="Type your message…" disabled={isSending} />
            <button type="submit" aria-label="Send message" disabled={isSending || !message.trim()}><FiSend /></button>
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
