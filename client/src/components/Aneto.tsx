import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, AlertCircle } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface Message {
  id: string;
  role: "assistant" | "user";
  text: string;
}

function detectIntent(text: string): "approach" | "performance" | "contact" | "default" {
  const lower = text.toLowerCase();
  if (/approche|stratégie|algo|quantit|method|approach|strategy|ansatz/i.test(lower)) return "approach";
  if (/perfor|résult|rendement|profit|drawdown|track|win|gains|return/i.test(lower)) return "performance";
  if (/contact|mail|téléphone|phone|email|rendez|appoint|adresse|address/i.test(lower)) return "contact";
  return "default";
}

export default function Aneto() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !initialized) {
      setMessages([
        { id: "welcome", role: "assistant", text: t.aneto.welcome },
      ]);
      setInitialized(true);
    }
  }, [open, initialized, t.aneto.welcome]);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => {
      const intent = detectIntent(text);
      const reply = t.aneto.responses[intent];
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "r", role: "assistant", text: reply },
      ]);
    }, 650);
  }

  return (
    <>
      {/* FAB */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{
          background: open
            ? "rgba(10,14,26,0.95)"
            : "linear-gradient(135deg, #C9A96E 0%, #B8914E 100%)",
          border: open ? "1px solid rgba(201,169,110,0.4)" : "none",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(201,169,110,0.2)",
        }}
        aria-label={open ? "Fermer Aneto" : "Ouvrir Aneto"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-white/70" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-5 h-5" style={{ color: "#060811" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[360px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "rgba(10,14,26,0.97)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(24px)",
              maxHeight: "520px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.1)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.2)", padding: '4px 8px' }}>
                <img src="/logo-full.png" alt="" style={{ height: '22px', width: 'auto', objectFit: 'contain', display: 'block' }} />
              </div>
              <div>
                <div className="text-white text-sm font-semibold leading-none mb-0.5">
                  {t.aneto.title}
                </div>
                <div className="text-white/35 text-xs">{t.aneto.subtitle}</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5BAF8A", boxShadow: "0 0 6px rgba(91,175,138,0.6)" }} />
                <span className="text-white/35 text-xs">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "text-[#060811] font-medium rounded-br-sm"
                        : "text-white/75 rounded-bl-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "linear-gradient(135deg, #C9A96E, #B8914E)" }
                        : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Disclaimer */}
            <div
              className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <AlertCircle className="w-3 h-3 text-white/20 flex-shrink-0" />
              <p className="text-white/25 text-[10px] leading-tight">{t.aneto.disclaimer}</p>
            </div>

            {/* Input */}
            <div
              className="p-3 flex gap-2 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                placeholder={t.aneto.placeholder}
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-white/25 focus:outline-none focus:border-[rgba(201,169,110,0.4)] transition-colors duration-200"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                style={{ background: "linear-gradient(135deg, #C9A96E, #B8914E)" }}
                aria-label={t.aneto.send}
              >
                <Send className="w-3.5 h-3.5" style={{ color: "#060811" }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
