import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

/**
 * AuthContext
 * -----------------------------------------------------------------------------
 * A deliberately lightweight, front-end-only auth layer. Authentication is
 * OPTIONAL for browsing the entire site — nothing is gated behind a login.
 *
 * It ALSO owns the "booking intercept" flow. When a visitor clicks
 * "Book an Appointment" while signed out, `requestBooking()` opens a modal
 * inviting them to log in, create an account, or continue as a guest. The
 * actual modal UI lives in <BookingPromptModal>, rendered once in the layout.
 *
 * NOTE: This mocks persistence with localStorage for demo purposes. Swap the
 * `login`/`register` bodies for real API calls (or NextAuth) in production.
 */

const AuthContext = createContext(undefined);

const USER_KEY = "a1-buller-user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Booking-intercept modal state.
  const [isBookingPromptOpen, setBookingPromptOpen] = useState(false);
  // Holds the "continue anyway" action supplied by whoever requested booking.
  const pendingActionRef = useRef(null);

  // Restore any previously "signed in" mock user.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((value) => {
    try {
      if (value) window.localStorage.setItem(USER_KEY, JSON.stringify(value));
      else window.localStorage.removeItem(USER_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  // --- Mock auth actions ---------------------------------------------------
  const login = useCallback(
    async ({ email }) => {
      const next = { email, name: email.split("@")[0], signedInAt: Date.now() };
      setUser(next);
      persist(next);
      return next;
    },
    [persist]
  );

  const register = useCallback(
    async ({ name, email }) => {
      const next = { email, name, signedInAt: Date.now() };
      setUser(next);
      persist(next);
      return next;
    },
    [persist]
  );

  const logout = useCallback(() => {
    setUser(null);
    persist(null);
  }, [persist]);

  // --- Booking intercept ---------------------------------------------------
  /**
   * Call this from any "Book an Appointment" control.
   * If the visitor is signed in, `onProceed` runs immediately.
   * Otherwise the intercept modal opens and `onProceed` is stashed so the
   * "Continue as guest" option can still fulfil the original intent.
   */
  const requestBooking = useCallback(
    (onProceed) => {
      if (user) {
        onProceed?.();
        return;
      }
      pendingActionRef.current = onProceed || null;
      setBookingPromptOpen(true);
    },
    [user]
  );

  const closeBookingPrompt = useCallback(() => {
    setBookingPromptOpen(false);
    pendingActionRef.current = null;
  }, []);

  // "Skip for now" — run the stashed action and close.
  const continueAsGuest = useCallback(() => {
    const action = pendingActionRef.current;
    setBookingPromptOpen(false);
    pendingActionRef.current = null;
    action?.();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        ready,
        login,
        register,
        logout,
        // booking intercept
        isBookingPromptOpen,
        requestBooking,
        closeBookingPrompt,
        continueAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
