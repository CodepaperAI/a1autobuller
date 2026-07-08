import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import ModeToggle from "@/components/ui/ModeToggle";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Certifications", href: "/certifications" },
  { label: "Contact Us", href: "/contact" },
];

function CartButton({ onNavigate }) {
  const { count } = useCart();

  return (
    <Link
      href="/checkout"
      onClick={onNavigate}
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl surface-elevated transition-colors hover:border-brand-500"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
        <path d="M2 3h2.2l2 12.5a2 2 0 0 0 2 1.7h8.3a2 2 0 0 0 2-1.6L21 7H5.2" />
      </svg>
      <AnimatePresence>
        {count > 0 ? (
          <motion.span
            key={count}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold leading-none text-white shadow-glow"
          >
            {count}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </Link>
  );
}

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Only render the portal on the client (document is undefined during SSR).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setDrawerOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  const isActive = (href) =>
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);

  // The mobile drawer + backdrop. Portaled to <body> so no ancestor stacking
  // context or transform can let page content show through it. z-[60] keeps it
  // above the floating WhatsApp button (z-50).
  const drawer = (
    <AnimatePresence>
      {drawerOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm md:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[60] flex h-full w-80 max-w-[85%] flex-col border-l divider p-6 font-sans bg-[rgb(var(--surface))] md:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-lg font-extrabold tracking-tight">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl surface-elevated"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="flex flex-col gap-1"
            >
              {NAV_LINKS.map((link) => (
                <motion.div key={link.href} variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                  <Link href={link.href} onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-[rgb(var(--surface-elevated))]">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                <Link href="/checkout" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-[rgb(var(--surface-elevated))]">
                  Cart
                </Link>
              </motion.div>
            </motion.div>

            <div className="mt-auto flex flex-col gap-3 pt-6">
              <Button as="a" href="tel:+16044455057">
                Call Now
              </Button>

              {isAuthenticated ? (
                <Button variant="outline" onClick={logout}>
                  Log out ({user.name})
                </Button>
              ) : (
                <Button variant="outline" as={Link} href="/login">
                  Log in
                </Button>
              )}
              <Button as={Link} href="/services">Book an Appointment</Button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b divider bg-[rgb(var(--surface))]/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <nav className="section flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="A1 Buller Auto home">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-black text-white shadow-glow">
              A1
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">
              Buller<span className="text-brand-600"> Auto</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-brand-600"
                    : "text-secondary hover:text-[rgb(var(--text-primary))]",
                ].join(" ")}
              >
                {link.label}
                {isActive(link.href) ? (
                  <motion.span layoutId="nav-active" className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-brand-600" />
                ) : null}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <CartButton />
            <ModeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-secondary">
                  Hi, <span className="font-semibold text-[rgb(var(--text-primary))]">{user.name}</span>
                </span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Log out
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" as={Link} href="/login">
                Log in
              </Button>
            )}

            <Button size="sm" as="a" href="tel:+16044455057">
              Call Now
            </Button>

            <Button size="sm" as={Link} href="/services">
              Book an Appointment
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <CartButton />
            <ModeToggle />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl surface-elevated"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Portal keeps the drawer above everything, unaffected by page stacking. */}
      {mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}