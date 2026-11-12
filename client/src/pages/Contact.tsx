import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Aneto from "@/components/Aneto";
import { useScrollReveal, staggerContainer, staggerItem } from "@/hooks/useScrollReveal";
import { useI18n } from "@/contexts/I18nContext";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  type: string;
  message: string;
  consent: boolean;
}

export default function Contact() {
  const { t } = useI18n();
  const { ref: heroRef, inView: heroInView } = useScrollReveal(0.1);
  const { ref: formRef, inView: formInView } = useScrollReveal(0.06);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  async function onSubmit(data: ContactFormData) {
    setSubmitState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitState("success");
        reset();
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  }

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[rgba(201,169,110,0.5)] focus:bg-white/[0.06] transition-all duration-200";
  const labelClass = "block text-white/60 text-xs font-medium mb-1.5 tracking-wide";
  const errorClass = "text-red-400/70 text-xs mt-1";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060811", color: "#EDE9E3" }}>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop&q=70"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 40%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,17,0.85) 0%, rgba(6,8,17,0.75) 50%, rgba(6,8,17,1) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.05) 0%, transparent 55%)" }} />
          </div>
          <div className="absolute inset-0 hero-grid opacity-20 z-1" aria-hidden="true" />
          <div className="container relative z-10" ref={heroRef}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              <motion.span variants={staggerItem} className="badge-pill mb-8 inline-flex">
                Summit One · Contact
              </motion.span>
              <motion.h1
                variants={staggerItem}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight max-w-3xl"
              >
                {t.contact.hero_title}
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="text-white/55 text-base md:text-lg max-w-xl leading-relaxed"
              >
                {t.contact.hero_subtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Main content */}
        <section className="py-14 md:py-20" ref={formRef}>
          <div className="container">
            <div className="grid md:grid-cols-5 gap-10 md:gap-16">
              {/* Left: address + appointment */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="md:col-span-2 flex flex-col gap-8"
              >
                {/* Contact info */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-6">{t.contact.address_title}</h2>
                  <div className="flex flex-col gap-5">
                    <a
                      href="mailto:summit.one.contact@gmail.com"
                      className="flex items-start gap-3 group"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)" }}
                      >
                        <Mail className="w-4 h-4" style={{ color: "#C9A96E" }} />
                      </div>
                      <div>
                        <div className="text-white/35 text-xs mb-0.5 tracking-wide uppercase">Email</div>
                        <div className="text-white/70 text-sm group-hover:text-[#C9A96E] transition-colors duration-200">
                          summit.one.contact@gmail.com
                        </div>
                      </div>
                    </a>
                    <a href="tel:+41784415420" className="flex items-start gap-3 group">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)" }}
                      >
                        <Phone className="w-4 h-4" style={{ color: "#C9A96E" }} />
                      </div>
                      <div>
                        <div className="text-white/35 text-xs mb-0.5 tracking-wide uppercase">Téléphone</div>
                        <div className="text-white/70 text-sm group-hover:text-[#C9A96E] transition-colors duration-200">
                          +41 78 441 54 20
                        </div>
                      </div>
                    </a>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.49-2.01-4.5-4.5-4.5z" stroke="#C9A96E" strokeWidth="1.3" strokeLinejoin="round"/>
                          <circle cx="8" cy="6" r="1.5" stroke="#C9A96E" strokeWidth="1.3"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-white/35 text-xs mb-0.5 tracking-wide uppercase">Localisation</div>
                        <div className="text-white/70 text-sm">Suisse</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appointment info */}
                <div
                  className="p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4" style={{ color: "#C9A96E" }} />
                    <h3 className="text-white font-semibold text-sm">{t.contact.appointment_title}</h3>
                  </div>
                  <div className="flex flex-col gap-2.5 mb-4">
                    {["À distance (visioconférence)", "En présentiel en Suisse"].map((opt) => (
                      <div key={opt} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C9A96E" }} />
                        <span className="text-white/60 text-sm">{opt}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/35 text-xs leading-relaxed">
                    {t.contact.appointment_body}
                  </p>
                </div>
              </motion.div>

              {/* Right: form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="md:col-span-3"
              >
                <h2 className="text-lg font-semibold text-white mb-7">{t.contact.form_title}</h2>

                {submitState === "success" ? (
                  <div
                    className="flex items-center gap-3 p-5 rounded-xl"
                    style={{ background: "rgba(91,175,138,0.08)", border: "1px solid rgba(91,175,138,0.25)" }}
                  >
                    <CheckCircle className="w-5 h-5 text-[#5BAF8A] flex-shrink-0" />
                    <p className="text-white/70 text-sm">{t.contact.form.success}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{t.contact.form.first_name} *</label>
                        <input
                          {...register("firstName", { required: t.contact.form.required })}
                          className={inputClass}
                          placeholder="Mathéo"
                        />
                        {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>{t.contact.form.last_name} *</label>
                        <input
                          {...register("lastName", { required: t.contact.form.required })}
                          className={inputClass}
                          placeholder="Dupont"
                        />
                        {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>{t.contact.form.email} *</label>
                      <input
                        type="email"
                        {...register("email", {
                          required: t.contact.form.required,
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Adresse e-mail invalide" }
                        })}
                        className={inputClass}
                        placeholder="votre@email.com"
                      />
                      {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{t.contact.form.phone}</label>
                        <input
                          type="tel"
                          {...register("phone")}
                          className={inputClass}
                          placeholder="+41 00 000 00 00"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>{t.contact.form.country}</label>
                        <input
                          {...register("country")}
                          className={inputClass}
                          placeholder="Suisse"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>{t.contact.form.type} *</label>
                      <select
                        {...register("type", { required: t.contact.form.required })}
                        className={`${inputClass} cursor-pointer`}
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-[#0A0E1A]">Sélectionner...</option>
                        {t.contact.types.map((type) => (
                          <option key={type} value={type} className="bg-[#0A0E1A]">{type}</option>
                        ))}
                      </select>
                      {errors.type && <p className={errorClass}>{errors.type.message}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>{t.contact.form.message} *</label>
                      <textarea
                        {...register("message", { required: t.contact.form.required, minLength: { value: 20, message: "Minimum 20 caractères" } })}
                        rows={4}
                        className={`${inputClass} resize-none`}
                        placeholder="Décrivez votre demande..."
                      />
                      {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                    </div>

                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("consent", { required: "Le consentement est requis" })}
                          className="mt-0.5 flex-shrink-0 accent-[#C9A96E]"
                        />
                        <span className="text-white/45 text-xs leading-relaxed">{t.contact.form.consent}</span>
                      </label>
                      {errors.consent && <p className={errorClass}>{errors.consent.message}</p>}
                    </div>

                    {submitState === "error" && (
                      <div
                        className="flex items-center gap-2 p-3 rounded-lg"
                        style={{ background: "rgba(192,102,90,0.1)", border: "1px solid rgba(192,102,90,0.3)" }}
                      >
                        <AlertCircle className="w-4 h-4 text-red-400/70 flex-shrink-0" />
                        <p className="text-red-400/70 text-xs">{t.contact.form.error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitState === "loading"}
                      className="btn-primary flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-semibold disabled:opacity-60"
                    >
                      {submitState === "loading" ? (
                        <span>Envoi en cours...</span>
                      ) : (
                        t.contact.form.submit
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Aneto />
    </div>
  );
}
