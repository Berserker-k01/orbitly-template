import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, AlertCircle } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface Message {
  id: string;
  role: "assistant" | "user";
  text: string;
}

type Intent =
  | "approach"
  | "performance"
  | "contact"
  | "referral"
  | "risk"
  | "start"
  | "default";

function detectIntent(text: string): Intent {
  const lower = text.toLowerCase();
  if (/parrain|referral|recommand|commission|filleul/i.test(lower)) return "referral";
  if (/risque|risk|perte|drawdown|garantie|levier|avertissement/i.test(lower)) return "risk";
  if (/commencer|start|inscri|ouvrir|minimum|investir|comment (faire|début)/i.test(lower)) return "start";
  if (/approche|stratégie|algo|quantit|method|approach|strategy|ansatz|logiciel/i.test(lower)) return "approach";
  if (/perfor|résult|rendement|profit|track|win|gains|return|myfxbook|tableau/i.test(lower)) return "performance";
  if (/contact|mail|téléphone|phone|email|rendez|appoint|adresse|address|joindre/i.test(lower)) return "contact";
  return "default";
}

let msgSeq = 0;
function nextId(prefix: string) {
  msgSeq += 1;
  return `${prefix}-${Date.now()}-${msgSeq}`;
}

export default function Aneto() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [lastIntent, setLastIntent] = useState<Intent | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: "welcome", role: "assistant", text: t.aneto.welcome }]);
    }
  }, [open, messages.length, t.aneto.welcome]);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);

  function handleSend() {
    const text = input.trim();
    if (!text || busy) return;

    const userMsg: Message = { id: nextId("u"), role: "user", text };
    setInput("");
    setBusy(true);
    setMessages((prev) => {
      const next = [...prev, userMsg];
      // Keep conversation readable — drop oldest after welcome if too long
      if (next.length > 24) {
        const welcome = next[0]?.id === "welcome" ? [next[0]] : [];
        return [...welcome, ...next.slice(-(welcome.length ? 23 : 24))];
      }
      return next;
    });

    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      const intent = detectIntent(text);
      const base = t.aneto.responses[intent] ?? t.aneto.responses.default;
      const reply =
        lastIntent === intent && intent !== "default"
          ? `${base}\n\nSi vous voulez aller plus loin, notre équipe répond aussi via le formulaire Contact.`
          : base;
      setLastIntent(intent);
      setMessages((prev) => [...prev, { id: nextId("a"), role: "assistant", text: reply }]);
      setBusy(false);
    }, 550);
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl overflow-hidden"
        style={{
          background: open ? "rgba(10,14,26,0.95)" : "#0A0E1A",
          border: "1px solid rgba(201,169,110,0.45)",
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
            <motion.img
              key="open"
              src="/logo.png"
              alt=""
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ width: "34px", height: "34px", objectFit: "contain" }}
            />
          )}
        </AnimatePresence>
      </motion.button>

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
            <div
              className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(201,169,110,0.25)",
                  width: 40,
                  height: 40,
                }}
              >
                <img
                  src="/logo.png"
                  alt=""
                  style={{ width: 28, height: 28, objectFit: "contain", display: "block" }}
                />
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

            <div
              className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <AlertCircle className="w-3 h-3 text-white/20 flex-shrink-0" />
              <p className="text-white/25 text-[10px] leading-tight">{t.aneto.disclaimer}</p>
            </div>

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
                disabled={!input.trim() || busy}
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
