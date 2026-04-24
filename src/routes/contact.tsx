import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { lazy, Suspense, useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import { CONTACT } from "@/lib/contact";
import { MessageCircle, ArrowRight, Send, User, AtSign, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const HourglassScene = lazy(() => import("@/components/three/HourglassScene").then(m => ({ default: m.HourglassScene })));

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — A-C-S" },
      { name: "description", content: "Start a conversation with A-C-S. WhatsApp or send a message directly." },
      { property: "og:title", content: "Contact — A-C-S" },
      { property: "og:description", content: "Let's start a conversation." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, lang } = useI18n();
  const isRTL = lang === "ar";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hpWebsite, setHpWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          website: hpWebsite.trim(),
        }),
      });

      const data: unknown = await res.json().catch(() => null);
      const errMsg =
        data && typeof data === "object" && "error" in data && typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : null;

      if (!res.ok) {
        toast.error(errMsg ?? t("form_error"));
        return;
      }

      toast.success(t("form_success"));
      setName("");
      setEmail("");
      setMessage("");
      setHpWebsite("");
    } catch {
      toast.error(t("form_error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <section className="px-6 lg:px-10">
        <SectionHeading kicker="// CONTACT" title={t("contact_title")} sub={t("contact_sub")} />
      </section>

      <section className="px-6 lg:px-10 mt-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[500px] order-2 lg:order-1">
            <div className="absolute inset-0 bg-radial-gold blur-2xl" />
            <Suspense fallback={null}>
              <HourglassScene />
            </Suspense>
          </div>

          <div className={`order-1 lg:order-2 space-y-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
            <motion.a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="group block bg-surface border border-gold rounded-2xl p-8 hover:border-[var(--gold)] hover:shadow-gold-lg transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-radial-gold opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
              <div className="relative flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold shrink-0">
                  <MessageCircle className="w-7 h-7 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs tracking-[0.4em] uppercase text-[var(--gold)] mb-2">{t("whatsapp_label")}</div>
                  <div className="font-display text-2xl text-ivory truncate">{CONTACT.whatsapp}</div>
                </div>
                <ArrowRight className={`w-5 h-5 text-[var(--gold)] shrink-0 group-hover:translate-x-1 transition-transform ${lang === "ar" ? "rotate-180" : ""}`} />
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="pt-6 border-t border-gold/30"
            >
              <p className="text-ivory/50 text-sm leading-relaxed">
                {lang === "ar"
                  ? "نرد خلال ساعات العمل. كن مختصراً، حدد هدفك، وسنبدأ من هناك."
                  : "We respond within business hours. Be concise, name your goal, and we'll start from there."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 mt-32" dir={isRTL ? "rtl" : "ltr"}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className={`mb-12 ${isRTL ? "text-right" : "text-left"}`}
          >
            <div className="text-xs tracking-[0.4em] uppercase text-[var(--gold)] mb-4">// {t("form_or")}</div>
            <h2 className="font-display text-4xl md:text-5xl text-ivory mb-3">{t("form_title")}</h2>
            <p className="text-ivory/60">{t("form_sub")}</p>
            <div className="luxe-divider mt-8" />
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative bg-surface border border-gold rounded-2xl p-8 md:p-12 shadow-deep overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-radial-gold blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-radial-gold blur-3xl opacity-30 pointer-events-none" />

            <div className="relative space-y-7">
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact-check-field">Leave this field empty</label>
                <input
                  id="contact-check-field"
                  name="contact_check_field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="new-password"
                  inputMode="text"
                  spellCheck={false}
                  data-lpignore="true"
                  value={hpWebsite}
                  onChange={(e) => setHpWebsite(e.target.value)}
                />
              </div>
              <div className={`grid md:grid-cols-2 gap-7 ${isRTL ? "text-right" : "text-left"}`}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs tracking-[0.3em] uppercase text-[var(--gold-soft)] flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    {t("form_name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("form_name_ph")}
                    required
                    dir={isRTL ? "rtl" : "ltr"}
                    className="w-full bg-transparent border-b border-gold/40 px-0 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-[var(--gold)] transition-colors duration-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs tracking-[0.3em] uppercase text-[var(--gold-soft)] flex items-center gap-2">
                    <AtSign className="w-3.5 h-3.5" />
                    {t("form_email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("form_email_ph")}
                    required
                    dir="ltr"
                    className={`w-full bg-transparent border-b border-gold/40 px-0 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-[var(--gold)] transition-colors duration-500 ${isRTL ? "text-right" : "text-left"}`}
                  />
                </div>
              </div>

              <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <label htmlFor="message" className="text-xs tracking-[0.3em] uppercase text-[var(--gold-soft)] flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {t("form_message")}
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("form_message_ph")}
                  required
                  rows={6}
                  dir={isRTL ? "rtl" : "ltr"}
                  className="w-full bg-transparent border-b border-gold/40 px-0 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-[var(--gold)] transition-colors duration-500 resize-none"
                />
              </div>

              <div className={`pt-4 flex ${isRTL ? "justify-start" : "justify-end"}`}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full text-sm tracking-widest uppercase font-medium bg-gradient-gold text-black shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <span>{submitting ? t("form_sending") : t("form_submit")}</span>
                  <Send className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
