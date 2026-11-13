import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { useI18n } from "@/contexts/I18nContext";

export default function NotFound() {
  const { t, langPath } = useI18n();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#060811", color: "#EDE9E3" }}>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          {/* Logo watermark */}
          <div className="mx-auto mb-10 opacity-20">
            <img src="/logo-full-white.png" alt="" style={{ height: '72px', width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
          </div>

          <div className="font-data text-6xl font-bold text-white/10 mb-4 select-none">404</div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            {t.not_found.title}
          </h1>
          <p className="text-white/45 text-sm mb-10 leading-relaxed">
            {t.not_found.subtitle}
          </p>
          <button
            onClick={() => setLocation(langPath('/'))}
            className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.not_found.cta}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
