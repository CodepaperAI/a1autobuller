// import { useMemo, useState } from "react";
// import Head from "next/head";
// import { motion, AnimatePresence } from "framer-motion";
// import Button from "@/components/ui/Button";
// import { useCart } from "@/context/CartContext";
// import { SERVICE_CATALOG, TIME_SLOTS } from "@/data/servicesCatalog";

// /**
//  * /services — Master Service Catalog (Phases 2 & 3)
//  * -----------------------------------------------------------------------------
//  * Renders all 10 core service categories. Each card carries:
//  *   - the service's sub-items,
//  *   - an inline scheduling widget (date input + 30-min time-slot dropdown),
//  *   - an "Add to Cart" trigger that pushes { serviceName, date, time } into
//  *     the global CartContext.
//  *
//  * Everything here is anonymous — the login gate lives at /checkout only.
//  */

// /* --- Small inline icon set (valid single-file SVGs, theme-aware) ---------- */
// const ICONS = {
//   droplet: "M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z",
//   disc: null, // rendered as concentric circles below
//   tire: null,
//   bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
//   snow: null,
//   spring: "M4 6h16M6 6l12 4M6 10l12 4M6 14l12 4M4 18h16",
//   engine: "M4 9h3l2-3h4l2 3h3v6h-2v3H6v-3H4z",
//   exhaust: "M3 13h9a3 3 0 0 1 3 3v2M18 13h3v5h-3",
//   belt: null,
//   clipboard: "M9 4h6v3H9zM7 5H5v15h14V5h-2",
// };

// function ServiceIcon({ name }) {
//   const common = {
//     viewBox: "0 0 24 24",
//     className: "h-6 w-6",
//     fill: "none",
//     stroke: "currentColor",
//     strokeWidth: 2,
//     strokeLinecap: "round",
//     strokeLinejoin: "round",
//     "aria-hidden": true,
//   };

//   // A few icons read better as composed shapes than a single path.
//   if (name === "disc") {
//     return (
//       <svg {...common}>
//         <circle cx="12" cy="12" r="8" />
//         <circle cx="12" cy="12" r="3" />
//       </svg>
//     );
//   }
//   if (name === "tire") {
//     return (
//       <svg {...common}>
//         <circle cx="12" cy="12" r="9" />
//         <circle cx="12" cy="12" r="3.5" />
//         <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
//       </svg>
//     );
//   }
//   if (name === "snow") {
//     return (
//       <svg {...common}>
//         <path d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9" />
//       </svg>
//     );
//   }
//   if (name === "belt") {
//     return (
//       <svg {...common}>
//         <circle cx="7" cy="12" r="4" />
//         <circle cx="17" cy="12" r="4" />
//         <path d="M7 8h10M7 16h10" />
//       </svg>
//     );
//   }
//   return (
//     <svg {...common}>
//       <path d={ICONS[name] || ICONS.clipboard} />
//     </svg>
//   );
// }

// /* --- Helpers -------------------------------------------------------------- */

// /** Today's date as YYYY-MM-DD for the date input's `min` (no past bookings). */
// function todayISO() {
//   const d = new Date();
//   const tz = d.getTimezoneOffset() * 60000;
//   return new Date(d - tz).toISOString().slice(0, 10);
// }

// /* --- Single catalog card with its own scheduler state --------------------- */
// function ServiceCard({ service, index }) {
//   const { addToCart } = useCart();
//   const minDate = useMemo(() => todayISO(), []);

//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [justAdded, setJustAdded] = useState(false);
//   const [error, setError] = useState("");

//   const canAdd = Boolean(date && time);

//   const handleAdd = () => {
//     if (!canAdd) {
//       setError("Please choose a date and a time slot first.");
//       return;
//     }
//     setError("");
//     addToCart({
//       serviceId: service.id,
//       serviceName: service.name,
//       date,
//       time,
//       priceFrom: service.priceFrom,
//     });

//     // Brief animated confirmation, then reset the picker for the next add.
//     setJustAdded(true);
//     window.setTimeout(() => {
//       setJustAdded(false);
//       setDate("");
//       setTime("");
//     }, 1500);
//   };

//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 24 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-60px" }}
//       transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.05 }}
//       className="surface-elevated flex flex-col rounded-2xl p-6 shadow-panel"
//     >
//       {/* Header: icon + name + tagline */}
//       <div className="mb-4 flex items-start gap-3">
//         <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
//           <ServiceIcon name={service.icon} />
//         </span>
//         <div>
//           <h2 className="font-display text-lg font-bold leading-tight tracking-tight">
//             {service.name}
//           </h2>
//           <p className="mt-0.5 text-sm text-secondary">{service.tagline}</p>
//         </div>
//       </div>

//       {/* Sub-items */}
//       <ul className="mb-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
//         {service.items.map((item) => (
//           <li key={item} className="flex items-center gap-2 text-sm text-secondary">
//             <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//               <path d="M5 12l4 4 10-10" />
//             </svg>
//             {item}
//           </li>
//         ))}
//       </ul>

//       {/* Price + duration */}
//       <div className="mb-5 flex items-center gap-4 text-sm">
//         <span className="font-semibold text-[rgb(var(--text-primary))]">
//           From ${service.priceFrom}
//         </span>
//         <span className="text-secondary">·</span>
//         <span className="text-secondary">{service.duration}</span>
//       </div>

//       {/* Inline scheduling widget */}
//       <div className="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-2">
//         <div>
//           <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-secondary">
//             Date
//           </label>
//           <input
//             type="date"
//             value={date}
//             min={minDate}
//             onChange={(e) => {
//               setDate(e.target.value);
//               setError("");
//             }}
//             className="w-full rounded-xl border divider bg-[rgb(var(--surface))] px-3 py-2.5 text-sm text-[rgb(var(--text-primary))] transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
//           />
//         </div>
//         <div>
//           <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-secondary">
//             Time slot
//           </label>
//           <select
//             value={time}
//             onChange={(e) => {
//               setTime(e.target.value);
//               setError("");
//             }}
//             className="w-full rounded-xl border divider bg-[rgb(var(--surface))] px-3 py-2.5 text-sm text-[rgb(var(--text-primary))] transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
//           >
//             <option value="" disabled>
//               Select a time
//             </option>
//             {TIME_SLOTS.map((slot) => (
//               <option key={slot} value={slot}>
//                 {slot}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <AnimatePresence>
//         {error ? (
//           <motion.p
//             initial={{ opacity: 0, y: -4 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -4 }}
//             role="alert"
//             className="mt-2 text-xs font-medium text-red-500"
//           >
//             {error}
//           </motion.p>
//         ) : null}
//       </AnimatePresence>

//       {/* Add to cart with an animated confirmation swap */}
//       <div className="mt-4">
//         <Button
//           onClick={handleAdd}
//           disabled={!canAdd || justAdded}
//           className="w-full justify-center"
//         >
//           <AnimatePresence mode="wait" initial={false}>
//             {justAdded ? (
//               <motion.span
//                 key="added"
//                 initial={{ opacity: 0, y: 6 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -6 }}
//                 className="inline-flex items-center gap-2"
//               >
//                 <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//                   <path d="M5 12l4 4 10-10" />
//                 </svg>
//                 Added to cart
//               </motion.span>
//             ) : (
//               <motion.span
//                 key="idle"
//                 initial={{ opacity: 0, y: 6 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -6 }}
//               >
//                 Add to Cart
//               </motion.span>
//             )}
//           </AnimatePresence>
//         </Button>
//       </div>
//     </motion.article>
//   );
// }

// export default function ServicesPage() {
//   return (
//     <>
//       <Head>
//         <title>Our Services | A1 Buller Auto</title>
//         <meta
//           name="description"
//           content="Browse A1 Buller Auto's full menu of 10 core auto services — from oil changes and brakes to diagnostics and inspections. Pick a date and 30-minute time slot and add it to your cart."
//         />
//         <link rel="canonical" href="https://www.a1bullerauto.com/services" />
//       </Head>

//       <section className="section py-14 sm:py-20">
//         {/* Heading */}
//         <div className="mx-auto max-w-2xl text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
//           >
//             Our <span className="text-brand-600">Services</span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.08 }}
//             className="mt-4 text-base text-secondary"
//           >
//             Choose a service, pick a date and a 30-minute time slot, then add it
//             to your cart. Book as many as you need — you only sign in at checkout.
//           </motion.p>
//         </div>

//         {/* Catalog grid */}
//         <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//           {SERVICE_CATALOG.map((service, i) => (
//             <ServiceCard key={service.id} service={service} index={i} />
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }




import { useState, useCallback } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import ServiceDetailModal from "@/components/ui/ServiceDetailModal";
import { SERVICE_CATALOG } from "@/data/servicesCatalog";

/**
 * /services — Master Service Catalog
 * -----------------------------------------------------------------------------
 * Renders all 10 core service categories as informational cards (icon, name,
 * sub-items, price). Each card has a "Learn More" button; clicking it opens
 * <ServiceDetailModal>, which shows the full image + details and holds the
 * date/time slot picker and the Add to Cart action.
 *
 * Booking is anonymous — the login gate lives at /checkout only.
 */

/* --- Small inline icon set (valid single-file SVGs, theme-aware) ---------- */
const ICONS = {
  droplet: "M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z",
  disc: null, // rendered as concentric circles below
  tire: null,
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
  snow: null,
  spring: "M4 6h16M6 6l12 4M6 10l12 4M6 14l12 4M4 18h16",
  engine: "M4 9h3l2-3h4l2 3h3v6h-2v3H6v-3H4z",
  exhaust: "M3 13h9a3 3 0 0 1 3 3v2M18 13h3v5h-3",
  belt: null,
  clipboard: "M9 4h6v3H9zM7 5H5v15h14V5h-2",
};

function ServiceIcon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  // A few icons read better as composed shapes than a single path.
  if (name === "disc") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (name === "tire") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    );
  }
  if (name === "snow") {
    return (
      <svg {...common}>
        <path d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9" />
      </svg>
    );
  }
  if (name === "belt") {
    return (
      <svg {...common}>
        <circle cx="7" cy="12" r="4" />
        <circle cx="17" cy="12" r="4" />
        <path d="M7 8h10M7 16h10" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d={ICONS[name] || ICONS.clipboard} />
    </svg>
  );
}

/* --- Single catalog card: same design, now with a "Learn More" button ----- */
function ServiceCard({ service, index, onOpen }) {
  const open = () => onOpen(service);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.05 }}
      className="surface-elevated flex flex-col rounded-2xl p-6 shadow-panel"
    >
      {/* Header: icon + name + tagline */}
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
          <ServiceIcon name={service.icon} />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold leading-tight tracking-tight">
            {service.name}
          </h2>
          <p className="mt-0.5 text-sm text-secondary">{service.tagline}</p>
        </div>
      </div>

      {/* Sub-items */}
      <ul className="mb-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {service.items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-secondary">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l4 4 10-10" />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      {/* Price + duration */}
      <div className="mb-5 flex items-center gap-4 text-sm">
        <span className="font-semibold text-[rgb(var(--text-primary))]">
          From ${service.priceFrom}
        </span>
        <span className="text-secondary">·</span>
        <span className="text-secondary">{service.duration}</span>
      </div>

      {/* Learn More — opens the detail modal (image + details + booking) */}
      <div className="mt-auto">
        <Button onClick={open} className="w-full justify-center">
          Learn More
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Button>
      </div>
    </motion.article>
  );
}

export default function ServicesPage() {
  // The currently open service (null = modal closed).
  const [selected, setSelected] = useState(null);

  const handleOpen = useCallback((service) => setSelected(service), []);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <>
      <Head>
        <title>Our Services | A1 Buller Auto</title>
        <meta
          name="description"
          content="Browse A1 Buller Auto's full menu of 10 core auto services — from oil changes and brakes to diagnostics and inspections. Tap Learn More to see details and book a 30-minute time slot."
        />
        <link rel="canonical" href="https://www.a1bullerauto.com/services" />
      </Head>

      <section className="section py-14 sm:py-20">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Our <span className="text-brand-600">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 text-base text-secondary"
          >
            Tap Learn More on any service to see the full details, then pick a
            date and a 30-minute time slot to add it to your cart.
          </motion.p>
        </div>

        {/* Catalog grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICE_CATALOG.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} onOpen={handleOpen} />
          ))}
        </div>
      </section>

      {/* Detail modal: image + details + date/time slot + Add to Cart */}
      <ServiceDetailModal
        service={selected}
        open={Boolean(selected)}
        onClose={handleClose}
      />
    </>
  );
}