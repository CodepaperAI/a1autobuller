import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

/**
 * ContactSection
 * -----------------------------------------------------------------------------
 * The embedded lead-capture / booking form. Fields: Full Name, Email, Message,
 * plus a drag-and-drop (or click) upload area for photos of vehicle damage.
 * Includes client-side validation and an animated success state.
 *
 * Booking intercept: when a signed-out visitor submits, we surface the optional
 * auth prompt first (per the brief). "Continue as guest" still completes the
 * submission, so nothing is ever hard-gated.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILES = 5;
const MAX_FILE_MB = 10;

export default function ContactSection() {
  const { isAuthenticated, requestBooking } = useAuth();
  const fileInputRef = useRef(null);

  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // --- Validation ----------------------------------------------------------
  const validate = useCallback(() => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.email.trim()) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(values.email)) next.email = "That email doesn't look right.";
    if (!values.message.trim()) next.message = "Tell us briefly what you need.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [values]);

  // --- File handling -------------------------------------------------------
  const addFiles = useCallback(
    (incoming) => {
      setFileError("");
      const list = Array.from(incoming);
      const images = list.filter((f) => f.type.startsWith("image/"));
      if (images.length !== list.length) {
        setFileError("Only image files can be attached.");
      }
      const tooBig = images.find((f) => f.size > MAX_FILE_MB * 1024 * 1024);
      if (tooBig) {
        setFileError(`Each image must be under ${MAX_FILE_MB} MB.`);
      }
      setFiles((prev) => {
        const merged = [...prev, ...images.filter((f) => f.size <= MAX_FILE_MB * 1024 * 1024)];
        if (merged.length > MAX_FILES) {
          setFileError(`You can attach up to ${MAX_FILES} photos.`);
        }
        return merged.slice(0, MAX_FILES);
      });
    },
    []
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const removeFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  // --- Submit --------------------------------------------------------------
  const actuallySubmit = useCallback(() => {
    // In production, POST `values` + `files` (FormData) to your API/CRM here.
    setSubmitted(true);
    setValues({ name: "", email: "", message: "" });
    setFiles([]);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validate()) return;
      // Signed-in visitors submit straight away; guests see the optional prompt.
      if (isAuthenticated) actuallySubmit();
      else requestBooking(actuallySubmit);
    },
    [validate, isAuthenticated, actuallySubmit, requestBooking]
  );

  return (
    <section id="contact" className="section scroll-mt-24 py-20 sm:py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: pitch + details */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Book a repair or request an estimate.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-secondary mt-4 max-w-md text-lg leading-relaxed"
          >
            Attach a few photos of the damage and we&apos;ll come back with a clear,
            no-obligation estimate — usually within one business day.
          </motion.p>

          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">📍</span>
              <span>123 Northern Blvd, Queens, NY 11101</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">📞</span>
              <a href="tel:+17185550142" className="transition-colors hover:text-brand-600">
                (718) 555-0142
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">🕒</span>
              <span>Mon–Sat: 8:00 AM – 7:00 PM</span>
            </div>
          </div>
        </div>

        {/* Right: the form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="surface-elevated rounded-2xl p-6 shadow-panel sm:p-8"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              // ----- Success state -----
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="mt-5 text-xl font-bold">Request received</h3>
                <p className="text-secondary mt-2 text-sm">
                  Thanks — our team will reach out within one business day.
                </p>
                <Button variant="secondary" className="mt-6" onClick={() => setSubmitted(false)}>
                  Send another request
                </Button>
              </motion.div>
            ) : (
              // ----- Form state -----
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                <Input
                  label="Full name"
                  name="name"
                  placeholder="Jordan Rivera"
                  value={values.name}
                  onChange={setField("name")}
                  error={errors.name}
                  autoComplete="name"
                />
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={setField("email")}
                  error={errors.email}
                  autoComplete="email"
                />
                <Textarea
                  label="How can we help?"
                  name="message"
                  placeholder="Describe the damage or the service you need…"
                  value={values.message}
                  onChange={setField("message")}
                  error={errors.message}
                />

                {/* Drag-and-drop / click upload */}
                <div>
                  <span className="mb-1.5 block text-sm font-medium">Attach photos of the damage</span>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                    }}
                    className={[
                      "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors",
                      dragActive
                        ? "border-brand-500 bg-brand-500/5"
                        : "divider hover:border-brand-500/60",
                    ].join(" ")}
                  >
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
                      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                    </svg>
                    <p className="mt-3 text-sm font-medium">
                      Drag & drop, or <span className="text-brand-600">browse</span>
                    </p>
                    <p className="text-secondary mt-1 text-xs">
                      Up to {MAX_FILES} images, {MAX_FILE_MB} MB each
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.length) addFiles(e.target.files);
                        e.target.value = ""; // allow re-selecting the same file
                      }}
                    />
                  </div>

                  {fileError ? (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-red-500">
                      {fileError}
                    </p>
                  ) : null}

                  {/* Selected files */}
                  <AnimatePresence>
                    {files.length > 0 ? (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 space-y-2"
                      >
                        {files.map((file, idx) => (
                          <motion.li
                            key={`${file.name}-${idx}`}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            className="flex items-center justify-between rounded-lg surface px-3 py-2 text-sm"
                          >
                            <span className="truncate pr-3">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              aria-label={`Remove ${file.name}`}
                              className="text-secondary transition-colors hover:text-red-500"
                            >
                              ✕
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    ) : null}
                  </AnimatePresence>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit request
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
