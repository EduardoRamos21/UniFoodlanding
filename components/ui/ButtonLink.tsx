import type { ReactNode } from "react";
import type { Cta } from "@/lib/site-config";
import { ArrowIcon } from "./icons";

type Variant = "primary" | "secondary" | "dark" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-ember text-obsidian hover:bg-ember-press",
  secondary: "border-[1.5px] border-obsidian text-obsidian hover:bg-obsidian hover:text-chalk",
  dark: "bg-obsidian text-chalk hover:bg-obsidian/85",
  "outline-light": "border-[1.5px] border-chalk/80 text-chalk hover:bg-chalk hover:text-obsidian",
};

const sizes = {
  sm: "min-h-11 px-5 py-2.5 text-[0.9375rem]",
  md: "min-h-12 px-6 py-3 text-base",
  lg: "min-h-12 px-7 py-4 text-[1.0625rem]",
};

type ButtonLinkProps = {
  cta: Cta;
  variant?: Variant;
  size?: keyof typeof sizes;
  withArrow?: boolean;
  className?: string;
  children?: ReactNode;
};

export function ButtonLink({
  cta,
  variant = "primary",
  size = "md",
  withArrow = false,
  className = "",
  children,
}: ButtonLinkProps) {
  const isHttp = cta.external && cta.href.startsWith("http");
  return (
    <a
      href={cta.href}
      {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-2 rounded-pill text-center leading-tight transition-[background-color,color,transform] duration-200 active:scale-[0.97] ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children ?? cta.label}
      {withArrow ? (
        <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
      {isHttp ? <span className="sr-only"> (se abre en una pestaña nueva)</span> : null}
    </a>
  );
}
