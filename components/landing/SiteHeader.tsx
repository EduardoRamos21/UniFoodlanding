"use client";

import { useEffect, useRef, useState } from "react";
import { ctas, navLinks } from "@/lib/site-config";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a")?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle?.focus();
      }
      if (e.key === "Tab" && panel && toggle) {
        const focusables = [toggle, ...panel.querySelectorAll<HTMLElement>("a")];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#contenido"
        className="sr-only rounded-pill bg-obsidian px-4 py-2 text-chalk focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Saltar al contenido
      </a>
      <div
        className={`page-container transition-[padding] duration-300 ${scrolled ? "pt-2.5" : "pt-4 sm:pt-5"}`}
      >
        <nav
          aria-label="Principal"
          className={`relative flex items-center justify-between gap-4 rounded-pill bg-limestone py-2 pl-4 pr-2 transition-[box-shadow,background-color] duration-300 ${
            scrolled ? "bg-limestone/95 ring-[1.5px] ring-obsidian/10 backdrop-blur-sm" : ""
          }`}
        >
          <a href="#inicio" className="shrink-0 rounded-pill" aria-label="UNIFOOD, ir al inicio">
            <Logo />
          </a>

          <ul className="hidden items-center lg:flex">
            {navLinks.map((link, i) => (
              <li key={link.href} className={`flex items-center ${i === 0 ? "dotted-y border-obsidian/40 pl-3" : ""}`}>
                <a
                  href={link.href}
                  className="rounded-pill px-3 py-2 text-[0.9375rem] text-obsidian transition-colors hover:bg-pumice"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <ButtonLink cta={ctas.header} size="sm" />
            </span>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-obsidian px-4 text-sm text-chalk lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon className="size-4" /> : <MenuIcon className="size-4" />}
              {open ? "Cerrar" : "Menú"}
            </button>
          </div>
        </nav>

        <div
          ref={panelRef}
          id="menu-movil"
          hidden={!open}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
          className="mt-2 rounded-card bg-limestone p-6 lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="dotted-x border-obsidian/30 first:border-t-0">
                <a href={link.href} className="display block py-4 text-[2.25rem] text-obsidian">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink cta={ctas.header} className="mt-4 w-full" withArrow />
        </div>
      </div>
    </header>
  );
}
