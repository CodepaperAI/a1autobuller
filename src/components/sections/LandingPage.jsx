import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

/**
 * LandingPage  ->  src/components/sections/LandingPage.jsx
 * -----------------------------------------------------------------------------
 * Reusable, conversion-focused landing page shell. Pass it a `config` object
 * and it renders the hero, trust badges, benefits, and lead form. Leads post to
 * /api/contact tagged with the page slug so you can tell where they came from.
 *
 * Used by: /car-dent-repair, /bumper-repair, /auto-paint-repair
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILES = 5;
const MAX_FILE_MB = 10;
const SITE = "https://www.a1bullerautocollision.com";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function LandingPage({ config }) {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email)) next.email = "Please enter a valid email.";
    if (!values.message.trim()) next.message = "Tell us briefly what happened.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    if (!validate()) return;

    setSending(true);
    setSubmitError("");
    try {
      const attachments = await Promise.all(
        files.slice(0, MAX_FILES).map(async (file) => ({
          filename: file.name,
          type: file.type,
          content: await fileToBase64(file),
        }))
      );

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: `[Landing: ${config.slug}]\n\n${values.message}`,
          attachments,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send. Please try again.");
      }

      setSent(true);
      setValues({ name: "", email: "", phone: "", message: "" });
      setFiles([]);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border divider bg-[rgb(var(--surface))] px-3.5 py-2.5 text-sm text-[rgb(var(--text-primary))] transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

  return (
    <>
      <Head>
        <title>{`${config.heading} | A1 Buller Auto Collision`}</title>
        <meta name="description" content={config.subheading} />
        <link rel="canonical" href={`${SITE}/${config.slug}`} />
      </Head>

      <section className="section py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: pitch */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-semibold uppercase tracking-wide text-brand-600"
            >
              {config.eyebrow}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
            >
              {config.heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-4 max-w-md text-lg leading-relaxed text-secondary"
            >
              {config.subheading}
            </motion.p>

            <div className="mt-6 flex flex-wrap gap-2">
              {config.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full surface-elevated px-3 py-1.5 text-xs font-semibold text-secondary"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as="a" href="tel:+16044234524" size="lg">
                Call (604) 423-4524
              </Button>
              <span className="text-sm text-secondary">or send photos →</span>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {config.benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: (i % 2) * 0.05 }}
                >
                  <h3 className="flex items-center gap-2 font-display text-base font-bold tracking-tight">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12l4 4 10-10" />
                    </svg>
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-secondary">{b.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: lead form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="surface-elevated h-fit rounded-2xl p-6 shadow-panel sm:p-8 lg:sticky lg:top-24"
          >
            {sent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 16 }}
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow"
                >
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l4 4 10-10" />
                  </svg>
                </motion.div>
                <h2 className="font-display text-xl font-extrabold tracking-tight">
                  Estimate request sent
                </h2>
                <p className="mt-2 text-sm text-secondary">
                  Thanks! We&apos;ll review your photos and reply with a quote shortly.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 className="font-display text-xl font-extrabold tracking-tight">
                  {config.formTitle}
                </h2>
                <p className="mt-2 text-sm text-secondary">{config.formNote}</p>

                <div className="mt-6 flex flex-col gap-4">
                  <div>
                    <label htmlFor="l-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-secondary">
                      Name
                    </label>
                    <input id="l-name" type="text" value={values.name} onChange={setField("name")} className={fieldClass} autoComplete="name" />
                    {errors.name ? <p className="mt-1 text-xs font-medium text-red-500">{errors.name}</p> : null}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="l-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-secondary">
                        Email
                      </label>
                      <input id="l-email" type="email" value={values.email} onChange={setField("email")} className={fieldClass} autoComplete="email" />
                      {errors.email ? <p className="mt-1 text-xs font-medium text-red-500">{errors.email}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="l-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-secondary">
                        Phone <span className="normal-case text-secondary/70">(optional)</span>
                      </label>
                      <input id="l-phone" type="tel" value={values.phone} onChange={setField("phone")} className={fieldClass} autoComplete="tel" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="l-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-secondary">
                      {config.messageLabel || "What happened?"}
                    </label>
                    <textarea id="l-message" rows={4} value={values.message} onChange={setField("message")} className={`${fieldClass} resize-y`} />
                    {errors.message ? <p className="mt-1 text-xs font-medium text-red-500">{errors.message}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="l-files" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-secondary">
                      Photos of the damage <span className="normal-case text-secondary/70">(up to {MAX_FILES})</span>
                    </label>
                    <input
                      id="l-files"
                      type="file"
                      accept="image/*,application/pdf"
                      multiple
                      onChange={(e) => {
                        const list = Array.from(e.target.files || []).filter(
                          (f) => f.size <= MAX_FILE_MB * 1024 * 1024
                        );
                        setFiles(list.slice(0, MAX_FILES));
                      }}
                      className="w-full cursor-pointer rounded-xl border divider bg-[rgb(var(--surface))] px-3.5 py-2.5 text-sm text-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-brand-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
                    />
                    {files.length ? (
                      <p className="mt-1.5 text-xs text-secondary">
                        {files.length} file{files.length > 1 ? "s" : ""} attached
                      </p>
                    ) : null}
                  </div>

                  {submitError ? (
                    <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-sm font-medium text-red-500">
                      {submitError}
                    </p>
                  ) : null}

                  <Button type="submit" size="lg" className="w-full justify-center" disabled={sending}>
                    {sending ? "Sending…" : config.ctaLabel || "Get my free estimate"}
                  </Button>
                  <p className="text-center text-xs text-secondary">
                    No obligation. We never share your details.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}