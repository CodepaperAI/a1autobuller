import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

/**
 * CartContext
 * -----------------------------------------------------------------------------
 * Holds the visitor's selected service bookings. Each cart entry is a booking
 * object shaped like:
 *
 *   {
 *     id:          string,   // unique line id (used for removal)
 *     serviceId:   string,   // catalog service id
 *     serviceName: string,   // human-readable service name
 *     date:        string,   // ISO "YYYY-MM-DD" chosen in the date picker
 *     time:        string,   // "9:30 AM" style 30-min slot label
 *     priceFrom:   number,   // indicative starting price (optional)
 *     addedAt:     number,   // timestamp for stable sorting
 *   }
 *
 * Browsing and adding to cart are fully anonymous — the login intercept only
 * happens at checkout finalization (see /checkout + <AuthModal>).
 *
 * State is mirrored to localStorage so a page refresh doesn't wipe the cart.
 */

const CartContext = createContext(undefined);

const CART_KEY = "a1-buller-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage on mount (client only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* corrupted cart — start fresh */
    }
    setReady(true);
  }, []);

  // Persist on every change (but only after the initial hydration).
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* storage full / unavailable — non-fatal */
    }
  }, [items, ready]);

  /**
   * Push a new booking into the cart.
   * Accepts { serviceId, serviceName, date, time, priceFrom } and stamps an id.
   * De-dupes exact (service + date + time) combinations so a double-click can't
   * create two identical appointments.
   */
  const addToCart = useCallback((booking) => {
    setItems((prev) => {
      const isDuplicate = prev.some(
        (b) =>
          b.serviceId === booking.serviceId &&
          b.date === booking.date &&
          b.time === booking.time
      );
      if (isDuplicate) return prev;

      const entry = {
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        serviceId: booking.serviceId,
        serviceName: booking.serviceName,
        date: booking.date,
        time: booking.time,
        priceFrom: booking.priceFrom ?? null,
        addedAt: Date.now(),
      };
      return [...prev, entry];
    });
  }, []);

  /** Remove a single booking line by its id. */
  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((b) => b.id !== id));
  }, []);

  /** Empty the cart entirely (e.g. after a confirmed booking). */
  const clearCart = useCallback(() => setItems([]), []);

  // Derived helpers, memoized so consumers don't re-render needlessly.
  const count = items.length;
  const estimatedTotal = useMemo(
    () => items.reduce((sum, b) => sum + (Number(b.priceFrom) || 0), 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      count,
      estimatedTotal,
      ready,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [items, count, estimatedTotal, ready, addToCart, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (ctx === undefined) {
    throw new Error("useCart must be used within a <CartProvider>");
  }
  return ctx;
}
