import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, AlertCircle, MessageSquare } from "lucide-react";
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

function splitWelcome(welcome: string): string[] {
  return welcome
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
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
      const parts = splitWelcome(t.aneto.welcome);
      setMessages(
        parts.map((text, i) => ({
          id: i === 0 ? "welcome" : `welcome-note-${i}`,
          role: "assistant" as const,
          text,
        }))
      );
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
      if (next.length > 24) {
        const keepWelcome = next.filter((m) => m.id.startsWith("welcome"));
        const rest = next.filter((m) => !m.id.startsWith("welcome"));
        return [...keepWelcome, ...rest.slice(-(24 - keepWelcome.length))];
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
        className="fixed bottom-5 right-4 z-50 flex items-center gap-2.5 shadow-xl overflow-hidden sm:bottom-6 sm:right-6"
        style={{
          height: 56,
          paddingLeft: open ? 16 : 10,
          paddingRight: open ? 16 : 16,
          borderRadius: 999,
          background: open
            ? "rgba(10,14,26,0.95)"
            : "linear-gradient(135deg, #C9A96E 0%, #B8914E 100%)",
          border: open ? "1px solid rgba(201,169,110,0.45)" : "none",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(201,169,110,0.25)",
        }}
        aria-label={open ? "Fermer le chat Aneto" : "Ouvrir le chat Aneto"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <X className="w-5 h-5 text-white/70" />
              <span className="text-white/70 text-xs font-medium hidden sm:inline">Fermer</span>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2.5"
            >
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(6,8,17,0.2)" }}
              >
                <img
                  src="/logo-mark-clear.png"
                  alt=""
                  style={{ width: 26, height: 26, objectFit: "contain" }}
                />
              </span>
              <span className="flex flex-col items-start leading-none pr-1">
                <span className="text-[#060811] text-xs font-bold">Chat</span>
                <span className="text-[#060811]/70 text-[10px] font-medium mt-0.5">Aneto</span>
              </span>
              <MessageSquare className="w-4 h-4 text-[#060811]/80 flex-shrink-0" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 flex flex-col overflow-hidden rounded-2xl left-3 right-3 bottom-[5.5rem] sm:left-auto sm:right-6 sm:bottom-24 sm:w-[360px]"
            style={{
              background: "rgba(10,14,26,0.97)",
              border: "1px solid rgba(255,255,255,0.1)",
              height: "min(70dvh, 520px)",
              maxHeight: "min(70dvh, 520px)",
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
                  src="/logo-mark-clear.png"
                  alt=""
                  style={{ width: 30, height: 30, objectFit: "contain", display: "block" }}
                />
              </div>
              <div className="min-w-0">
                <div className="text-white text-sm font-semibold leading-none mb-0.5">
                  {t.aneto.title}
                </div>
                <div className="text-white/35 text-xs truncate">{t.aneto.subtitle}</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5BAF8A", boxShadow: "0 0 6px rgba(91,175,138,0.6)" }} />
                <span className="text-white/35 text-xs">Online</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-3 min-h-0">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-shrink-0 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed break-words ${
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
                </div>
              ))}
              <div ref={messagesEndRef} className="flex-shrink-0 h-px" />
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
                className="flex-1 min-w-0 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-white/25 focus:outline-none focus:border-[rgba(201,169,110,0.4)] transition-colors duration-200"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || busy}
                className="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30"
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
