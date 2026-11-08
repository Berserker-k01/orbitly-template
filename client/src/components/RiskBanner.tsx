import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RiskBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem('risk-banner-dismissed') === '1'; }
    catch { return false; }
  });

  function dismiss() {
    try { sessionStorage.setItem('risk-banner-dismissed', '1'); } catch {}
    setDismissed(true);
  }

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.35, delay: 2 }}
          className="fixed bottom-0 left-0 right-0 z-40"
          style={{
            background: "rgba(6,8,17,0.97)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
          }}
          role="complementary"
          aria-label="Avertissement sur les risques"
        >
          <div className="container py-3 flex items-start gap-3">
            <AlertTriangle className="w-3.5 h-3.5 text-[#C9A96E] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-white/40 text-xs leading-relaxed flex-1">
              <span className="text-white/60 font-medium">Avertissement sur les risques — </span>
              Les performances passées ne préjugent pas des performances futures. Le trading Forex avec effet de levier implique un risque élevé de perte. Vous pourriez perdre tout ou partie de votre capital.
            </p>
            <button
              onClick={dismiss}
              className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0 p-1"
              aria-label="Fermer l'avertissement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
