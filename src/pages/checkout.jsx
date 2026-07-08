import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import AuthModal from "@/components/ui/AuthModal";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

/**
 * /checkout — Booking review + finalization (Phase 3)
 * -----------------------------------------------------------------------------
 * Shows every booking the visitor added to the cart (service, date, time) with
 * per-line removal and an indicative total.
 *
 * Smart login intercept: "Confirm Booking" is where anonymity ends. If the
 * visitor is NOT signed in, we surface <AuthModal> instead of finalizing. Once
 * authenticated, the same button confirms the booking, clears the cart, and
 * shows a success state.
 */

/** Pretty-print an ISO date (YYYY-MM-DD) as e.g. "Mon, Jul 7, 2026". */
function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CheckoutPage() {
  const { items, count, estimatedTotal, removeFromCart, clearCart, ready } = useCart();
  const { isAuthenticated } = useAuth();

  const [authOpen, setAuthOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  /**
   * Confirm Booking handler — the intercept gate.
   * Signed out -> open AuthModal. Signed in -> finalize (mock) + clear cart.
   */
  const handleConfirm = () => {
    if (!isAuthenticated) {
      setAuthOpen(true);
      return;
    }
    // TODO: replace with a real POST to your booking API / CRM.
    setConfirmed(true);
    clearCart();
  };

  /* --- Success screen ----------------------------------------------------- */
  if (confirmed) {
    return (
      <>
        <Head>
          <title>Booking Confirmed | A1 Buller Auto</title>
          <meta name="robots" content="noindex" />
        </Head>
        <section className="section flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 16 }}
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow"
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l4 4 10-10" />
            </svg>
          </motion.div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            Booking confirmed
          </h1>
          <p className="mt-3 max-w-md text-secondary">
            Thanks! Your appointment request is in. You can track your repair
            status live from your account.
          </p>
          <div className="mt-8 flex gap-3">
            <Button as={Link} href="/services" variant="outline">
              Book another service
            </Button>
            <Button as={Link} href="/">
              Back to home
            </Button>
          </div>
        </section>
      </>
    );
  }

  /* --- Empty cart --------------------------------------------------------- */
  if (ready && count === 0) {
    return (
      <>
        <Head>
          <title>Your Cart | A1 Buller Auto</title>
          <meta name="robots" content="noindex" />
        </Head>
        <section className="section flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl surface-elevated text-secondary">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
              <path d="M2 3h2.2l2 12.5a2 2 0 0 0 2 1.7h8.3a2 2 0 0 0 2-1.6L21 7H5.2" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            Your cart is empty
          </h1>
          <p className="mt-3 max-w-md text-secondary">
            Add a service and a time slot to get started — you can review
            everything here before you confirm.
          </p>
          <Button as={Link} href="/services" className="mt-8">
            Browse services
          </Button>
        </section>
      </>
    );
  }

  /* --- Review screen ------------------------------------------------------ */
  return (
    <>
      <Head>
        <title>Review Your Booking | A1 Buller Auto</title>
        <meta name="robots" content="noindex" />
      </Head>

      <section className="section py-14 sm:py-20">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Review your booking
        </h1>
        <p className="mt-2 text-secondary">
          {count} {count === 1 ? "appointment" : "appointments"} ready to
          confirm.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Line items */}
          <div className="lg:col-span-2">
            <ul className="flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="surface-elevated flex items-center justify-between gap-4 rounded-2xl p-5 shadow-panel"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-display font-bold tracking-tight">
                        {item.serviceName}
                      </p>
                      <p className="mt-1 text-sm text-secondary">
                        {formatDate(item.date)} · {item.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {item.priceFrom != null ? (
                        <span className="hidden text-sm font-semibold sm:inline">
                          From ${item.priceFrom}
                        </span>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.serviceName}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-red-500/10 hover:text-red-500"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
                        </svg>
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          {/* Summary / confirm */}
          <aside className="lg:col-span-1">
            <div className="surface-elevated sticky top-24 rounded-2xl p-6 shadow-panel">
              <h2 className="font-display text-lg font-bold tracking-tight">
                Summary
              </h2>
              <dl className="mt-4 flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-secondary">Appointments</dt>
                  <dd className="font-semibold">{count}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-secondary">Estimated from</dt>
                  <dd className="font-semibold">${estimatedTotal}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-secondary">
                Final pricing is confirmed after a technician reviews your
                vehicle. No payment is taken online.
              </p>

              <Button onClick={handleConfirm} className="mt-5 w-full justify-center">
                Confirm Booking
              </Button>
              <Button
                as={Link}
                href="/services"
                variant="ghost"
                className="mt-2 w-full justify-center"
              >
                Add more services
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* Smart login intercept */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
