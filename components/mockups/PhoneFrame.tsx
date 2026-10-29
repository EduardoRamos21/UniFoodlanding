import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
  label: string;
  className?: string;
  /** Ocupa el alto del contenedor. Evita que el contenido encoja el marco. */
  fill?: boolean;
};

/** Marco de teléfono decorativo; el contenido interior es una vista de ejemplo. */
export function PhoneFrame({ children, label, className = "", fill = false }: PhoneFrameProps) {
  return (
    <div
      className={`relative rounded-[2.6rem] bg-obsidian p-[0.55rem] ${fill ? "h-full w-full" : "aspect-[9/18.5]"} ${className}`}
      style={fill ? { height: "100%", aspectRatio: "auto" } : undefined}
      role="img"
      aria-label={label}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-chalk" aria-hidden="true">
        <div className="absolute left-1/2 top-2 z-10 h-[1.15rem] w-[4.6rem] -translate-x-1/2 rounded-pill bg-obsidian" />
        {children}
      </div>
    </div>
  );
}
