import Link from "next/link";

export default function Breadcrumbs({ items, className = "" }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={["text-sm text-secondary", className].filter(Boolean).join(" ")}
    >
      <ol className="flex flex-wrap items-center gap-y-1">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={`${item.href || "current"}-${item.label}`} className="flex items-center">
              {index > 0 ? <span className="px-2" aria-hidden>/</span> : null}
              {current || !item.href ? (
                <span aria-current={current ? "page" : undefined} className="text-[rgb(var(--text-primary))]">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-brand-600">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
