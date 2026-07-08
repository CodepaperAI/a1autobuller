import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { TIME_SLOTS } from "@/data/servicesCatalog";

/**
 * ServiceDetailModal  ->  src/components/ui/ServiceDetailModal.jsx
 * -----------------------------------------------------------------------------
 * Opens from a service card's "Learn More" button: full image + details, a
 * date + 30-min slot picker, and Add to Cart (wired to CartContext).
 *
 * NEW: clicking the image opens a full-screen lightbox preview so the photo is
 * clearly visible. ESC closes the preview first, then the modal.
 */

function todayISO() {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d - tz).toISOString().slice(0, 10);
}

function resolveImage(service) {
  if (!service) return "";
  const raw =
    service.image ||
    `/${(service.name || service.title || "").replace(/\//g, "")}.png`;
  return encodeURI(raw);
}

export default function ServiceDetailModal({ service, open, onClose }) {
  const { addToCart } = useCart();
  const panelRef = useRef(null);
  const lastFocused = useRef(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [justAdded, setJustAdded] = useState(false);
  const [error, setError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false); // image lightbox

  const minDate = todayISO();

  // Reset the form + preview each time a new service is opened.
  useEffect(() => {
    if (open) {
      setDate("");
      setTime("");
      setJustAdded(false);
      setError("");
      setPreviewOpen(false);
    }
  }, [open, service?.id]);

  // Scroll lock + focus while open.
  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const raf = requestAnimationFrame(() => panelRef.current?.focus());

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
    };
  }, [open]);

  // ESC: close the image preview first if it's open, otherwise close the modal.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (previewOpen) setPreviewOpen(false);
      else onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, previewOpen, onClose]);

  const shortDescription = service?.tagline || service?.shortDescription || "";
  const fullDescription = service?.fullDescription || shortDescription;
  const includes = service?.items || service?.includes || [];
  const priceFrom = service?.priceFrom ?? service?.startingPrice ?? null;
  const duration = service?.duration || service?.estimatedTime || null;
  const imageSrc = resolveImage(service);

  const canAdd = Boolean(date && time);

  const handleAdd = useCallback(() => {
    if (!service) return;
    if (!canAdd) {
      setError("Please choose a date and time slot first.");
      return;
    }
    setError("");
    addToCart({
      serviceId: service.id,
      serviceName: service.name || service.title,
      date,
      time,
      priceFrom,
      image: imageSrc,
    });
    setJustAdded(true);
    window.setTimeout(() => {
      setJustAdded(false);
      setDate("");
      setTime("");
    }, 1500);
  }, [service, canAdd, addToCart, date, time, priceFrom, imageSrc]);

  const handleBackdrop = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose?.();
    },
    [onClose]
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <AnimatePresence>
        {open && service ? (
          <div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:items-center"
            onMouseDown={handleBackdrop}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-detail-title"
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="scrollbar-slim relative z-10 my-auto w-full max-w-3xl rounded-2xl surface border divider p-6 shadow-glow focus-visible:outline-none sm:p-8"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl surface-elevated text-secondary transition-colors hover:text-brand-600"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Full service image (3:2) — click to enlarge */}
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  aria-label="Enlarge image"
                  className="group relative aspect-[3/2] w-full cursor-zoom-in overflow-hidden rounded-xl bg-gradient-to-br from-brand-600/20 to-metal-800/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
                >
                  <img
                    src={imageSrc}
                    alt={service.name || service.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Hover hint */}
                  <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                    </svg>
                    Click to enlarge
                  </span>
                </button>

                {/* Title + description + meta */}
                <div className="flex flex-col">
                  <h2 id="service-detail-title" className="font-display text-2xl font-extrabold tracking-tight">
                    {service.name || service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">
                    {fullDescription}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    {duration ? (
                      <span className="inline-flex items-center gap-2 text-secondary">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>
                        {duration}
                      </span>
                    ) : null}
                    {priceFrom != null ? (
                      <span className="font-semibold text-[rgb(var(--text-primary))]">
                        From ${priceFrom}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Detailed breakdown: what's included */}
              {includes.length ? (
                <div className="mt-6">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-brand-600">
                    What&apos;s included
                  </h3>
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-secondary">
                        <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12l4 4 10-10" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Booking: date + strict 30-minute time slot */}
              <div className="mt-6 border-t divider pt-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-brand-600">
                  Choose a date &amp; time
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="detail-date" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-secondary">
                      Date
                    </label>
                    <input
                      id="detail-date"
                      type="date"
                      value={date}
                      min={minDate}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setError("");
                      }}
                      className="w-full rounded-xl border divider bg-[rgb(var(--surface))] px-3 py-2.5 text-sm text-[rgb(var(--text-primary))] transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="detail-time" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-secondary">
                      Time slot
                    </label>
                    <select
                      id="detail-time"
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value);
                        setError("");
                      }}
                      className="w-full rounded-xl border divider bg-[rgb(var(--surface))] px-3 py-2.5 text-sm text-[rgb(var(--text-primary))] transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    >
                      <option value="" disabled>
                        Select a time
                      </option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <AnimatePresence>
                  {error ? (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      role="alert"
                      className="mt-2 text-xs font-medium text-red-500"
                    >
                      {error}
                    </motion.p>
                  ) : null}
                </AnimatePresence>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <Button
                    onClick={handleAdd}
                    disabled={!canAdd || justAdded}
                    className="w-full justify-center sm:w-auto"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {justAdded ? (
                        <motion.span key="added" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l4 4 10-10" />
                          </svg>
                          Added to cart
                        </motion.span>
                      ) : (
                        <motion.span key="idle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="9" cy="20" r="1.4" />
                            <circle cx="18" cy="20" r="1.4" />
                            <path d="M2 3h2.2l2 12.5a2 2 0 0 0 2 1.7h8.3a2 2 0 0 0 2-1.6L21 7H5.2" />
                          </svg>
                          Add to Cart
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Full-screen image preview (lightbox) — above the modal (z-[120]) */}
      <AnimatePresence>
        {open && service && previewOpen ? (
          <motion.div
            key="image-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setPreviewOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${service.name || service.title} image preview`}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              aria-label="Close preview"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* The image — stop propagation so clicking it doesn't close */}
            <motion.img
              src={imageSrc}
              alt={service.name || service.title}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-h-[90vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>,
    document.body
  );
}