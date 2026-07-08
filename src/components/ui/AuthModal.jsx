import Link from "next/link";
import { motion } from "framer-motion";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

/**
 * AuthModal
 * -----------------------------------------------------------------------------
 * The "smart login intercept" surfaced when a signed-out visitor clicks
 * "Confirm Booking" on /checkout. Browsing and building a cart stay anonymous;
 * this is the ONLY gate, and it appears only at finalization.
 *
 * It reuses the shared <Modal> (portal + backdrop + Escape + scroll lock) and
 * layers in an animated lock badge plus explicit redirection buttons to
 * /login and /register.
 *
 * Props:
 *   open    — whether the modal is visible
 *   onClose — called on backdrop click / Escape / "Keep browsing"
 */
export default function AuthModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="auth-modal-title">
      {/* Animated lock badge */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
        className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      </motion.div>

      <h2
        id="auth-modal-title"
        className="text-center font-display text-xl font-bold tracking-tight"
      >
        One quick step to confirm
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-center text-sm text-secondary">
        To complete your booking and track your repair status live, please log
        in or create an account.
      </p>

      {/* Explicit redirection buttons to /login and /register */}
      <div className="mt-6 flex flex-col gap-3">
        <Button as={Link} href="/login" className="w-full justify-center">
          Log in
        </Button>
        <Button
          as={Link}
          href="/register"
          variant="outline"
          className="w-full justify-center"
        >
          Create an account
        </Button>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-4 block w-full text-center text-sm font-medium text-secondary transition-colors hover:text-[rgb(var(--text-primary))]"
      >
        Keep browsing
      </button>
    </Modal>
  );
}
