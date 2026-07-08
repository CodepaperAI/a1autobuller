import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingPromptModal from "@/components/ui/BookingPromptModal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
/**
 * LayoutWrapper
 * -----------------------------------------------------------------------------
 * The single shell every page renders inside. It provides the sticky Navbar,
 * the Footer, the global booking-intercept modal, and an animated page
 * transition keyed on the route so navigations feel intentional.
 */
export default function LayoutWrapper({ children }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Rendered once so any "Book" control can trigger it from anywhere. */}
      <BookingPromptModal />
   {/* Floating WhatsApp chat button (fixed, appears on every page) */}
       <WhatsAppButton />
    </div>
  );
}

