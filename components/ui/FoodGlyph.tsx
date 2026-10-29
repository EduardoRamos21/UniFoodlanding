import type { FoodGlyph as Glyph } from "@/lib/demo-data";

const paths: Record<Glyph, React.ReactNode> = {
  cup: (
    <>
      <path d="M7 9h9v5.5a4.5 4.5 0 0 1-4.5 4.5A4.5 4.5 0 0 1 7 14.5z" />
      <path d="M16 10.5h1.2a2.3 2.3 0 0 1 0 4.6H16M9.5 4.5c-.6.8.6 1.4 0 2.2M12.5 4.5c-.6.8.6 1.4 0 2.2" />
    </>
  ),
  bowl: (
    <>
      <path d="M4 11h16a8 8 0 0 1-16 0z" />
      <path d="M9 19h6M8.5 8.5c1-1.4 2.3-1.4 3.5 0 1.2 1.4 2.5 1.4 3.5 0" />
    </>
  ),
  torta: (
    <>
      <path d="M4.5 11.5C4.5 8 8 6 12 6s7.5 2 7.5 5.5z" />
      <path d="M4 14.5h16M5 17.5h14c0 .8-.7 1.5-1.5 1.5h-11c-.8 0-1.5-.7-1.5-1.5z" />
    </>
  ),
  glass: (
    <>
      <path d="M7 5h10l-1.4 13.2a1 1 0 0 1-1 .8H9.4a1 1 0 0 1-1-.8z" />
      <path d="M7.6 10.5h8.8M14 5l2-2.5" />
    </>
  ),
  cookie: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M9.5 9.5h.01M14.5 10h.01M10.5 14.5h.01M14 14h.01" strokeWidth="2.6" />
    </>
  ),
  salad: (
    <>
      <path d="M3.5 12h17a8.5 8.5 0 0 1-17 0z" />
      <path d="M8 12c-.5-2.5 1-4.5 3.5-4.5M12 12c.2-3 2.3-5 5-4.6M11.5 7.5c0-1.5.8-2.6 2-3" />
    </>
  ),
};

type FoodGlyphProps = { glyph: Glyph; className?: string };

export function FoodGlyph({ glyph, className = "size-6" }: FoodGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[glyph]}
    </svg>
  );
}
