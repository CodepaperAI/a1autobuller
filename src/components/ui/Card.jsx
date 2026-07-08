import { motion } from "framer-motion";

/**
 * Card
 * -----------------------------------------------------------------------------
 * A themed elevated surface. When `interactive` is true it lifts on hover;
 * when `reveal` is true it fades/slides in as it enters the viewport.
 */
export default function Card({
  children,
  className = "",
  interactive = false,
  reveal = false,
  ...props
}) {
  const revealProps = reveal
    ? {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: "easeOut" },
      }
    : {};

  return (
    <motion.div
      {...revealProps}
      whileHover={interactive ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={[
        "surface-elevated rounded-2xl p-6 shadow-panel",
        interactive ? "cursor-pointer hover:border-brand-500/60" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </motion.div>
  );
}
