import type { Metadata, Viewport } from "next";
import { Archivo, DM_Sans } from "next/font/google";
import { SmoothAnchors } from "@/components/landing/SmoothAnchors";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  ...(siteConfig.siteUrl
    ? { metadataBase: new URL(siteConfig.siteUrl), alternates: { canonical: "/" } }
    : {}),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#e2e2df",
  width: "device-width",
  initialScale: 1,
};

// Corre antes del primer pintado: marca JS disponible y oculta el hero solo si
// habrá animación; si GSAP no arranca en 2.5 s, el contenido se muestra igual.
const bootScript = `(function(d){var h=d.documentElement;h.classList.add('js');var r=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r){h.classList.add('motion-pending');setTimeout(function(){h.classList.remove('motion-pending')},2500)}})(document);`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${archivo.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SmoothAnchors />
        {children}
      </body>
    </html>
  );
}
