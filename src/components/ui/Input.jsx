import { forwardRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Input / Textarea
 * -----------------------------------------------------------------------------
 * Theme-aware form controls with an associated <label>, inline validation
 * message, and a subtle focus micro-interaction. Both forward refs so parent
 * forms can read/focus them directly.
 */

const baseField =
  "w-full rounded-xl border bg-[rgb(var(--surface))] px-4 py-3 text-sm " +
  "text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))] " +
  "transition-colors duration-200 focus:outline-none focus:border-brand-500 " +
  "focus:ring-2 focus:ring-brand-500/30";

function FieldError({ id, message }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1.5 text-xs font-medium text-red-500"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

export const Input = forwardRef(function Input(
  { label, error, className = "", id: idProp, ...props },
  ref
) {
  const autoId = useId();
  const id = idProp || autoId;
  const errorId = `${id}-error`;

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
          {label}
        </label>
      ) : null}
      <motion.input
        ref={ref}
        id={id}
        whileFocus={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={[
          baseField,
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : "divider",
          className,
        ].join(" ")}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { label, error, className = "", id: idProp, rows = 5, ...props },
  ref
) {
  const autoId = useId();
  const id = idProp || autoId;
  const errorId = `${id}-error`;

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
          {label}
        </label>
      ) : null}
      <motion.textarea
        ref={ref}
        id={id}
        rows={rows}
        whileFocus={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={[
          baseField,
          "resize-y",
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : "divider",
          className,
        ].join(" ")}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
});

export default Input;
