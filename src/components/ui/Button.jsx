import { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Button
 * -----------------------------------------------------------------------------
 * Atomic, theme-aware button with three variants and Framer Motion
 * micro-interactions (subtle lift on hover, press on tap). Renders a <button>
 * by default; pass `as` to render another element (e.g. an <a> or Next Link).
 */

const VARIANTS = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-glow disabled:bg-brand-300",
  secondary:
    "surface-elevated text-[rgb(var(--text-primary))] hover:border-brand-500 hover:text-brand-600",
  ghost:
    "bg-transparent text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-elevated))]",
  outline:
    "bg-transparent border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white",
};

const SIZES = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const Button = forwardRef(function Button(
  {
    as: Component = "button",
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
  },
  ref
) {
  // framer-motion can animate any element via motion(Component). Memoize so the
  // wrapped component keeps a stable identity across renders (avoids remounts).
  const MotionComp = useMemo(() => motion(Component), [Component]);

  return (
    <MotionComp
      ref={ref}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold",
        "transition-colors duration-200 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-60",
        VARIANTS[variant],
        SIZES[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </MotionComp>
  );
});

export default Button;
