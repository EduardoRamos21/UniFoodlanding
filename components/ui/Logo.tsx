type LogoMarkProps = { className?: string };

/** Marca actual de la app: círculo Ember con la U blanca. */
export function LogoMark({ className = "size-9" }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="32" fill="var(--color-ember)" />
      <path
        d="M21.5 17.5v16.25a10.5 10.5 0 0 0 21 0V17.5"
        fill="none"
        stroke="#fff"
        strokeWidth="7"
      />
    </svg>
  );
}

type LogoProps = { className?: string; tone?: "dark" | "light" };

export function Logo({ className = "", tone = "dark" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-9 shrink-0" />
      <span
        className={`text-[1.3rem] leading-none tracking-[-0.01em] ${tone === "dark" ? "text-obsidian" : "text-chalk"}`}
      >
        UniFood
      </span>
    </span>
  );
}
