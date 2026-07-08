import Link from "next/link";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

/**
 * BookingPromptModal
 * -----------------------------------------------------------------------------
 * The "smart authentication gateway" intercept. When a signed-out visitor
 * clicks "Book an Appointment", AuthContext opens this modal. Browsing stays
 * fully open — the visitor can log in, create an account, OR skip and continue
 * as a guest. It's rendered exactly once, inside LayoutWrapper.
 */
export default function BookingPromptModal() {
  const { isBookingPromptOpen, closeBookingPrompt, continueAsGuest } = useAuth();

  return (
    <Modal
      open={isBookingPromptOpen}
      onClose={closeBookingPrompt}
      title="Almost there"
      labelledBy="booking-prompt-title"
    >
      <p className="text-secondary text-sm leading-relaxed">
        To complete your booking and track your repair status, please log in or
        create an account. Prefer to browse? You can continue as a guest —
        creating an account is completely optional.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button as={Link} href="/login" onClick={closeBookingPrompt} variant="primary">
          Log in
        </Button>
        <Button as={Link} href="/register" onClick={closeBookingPrompt} variant="outline">
          Create account
        </Button>
      </div>

      <button
        type="button"
        onClick={continueAsGuest}
        className="mt-4 w-full text-center text-sm font-medium text-secondary underline-offset-4 transition-colors hover:text-brand-600 hover:underline"
      >
        Skip for now and continue as guest
      </button>
    </Modal>
  );
}
