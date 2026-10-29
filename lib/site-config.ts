const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") || null;

export const siteConfig = {
  name: "UNIFOOD",
  title: "UNIFOOD | Pedidos para cafeterías universitarias",
  description:
    "Consulta menús, precios y disponibilidad de las cafeterías de tu campus, pide antes de llegar y sigue el estado de tu pedido. UNIFOOD también ayuda a las cafeterías a organizar sus pedidos.",
  siteUrl,
} as const;

export const contacts = [
  {
    id: "whatsapp-1",
    channel: "WhatsApp",
    value: "961-150-1539",
    href: "https://wa.me/5219611501539",
    external: true,
  },
  {
    id: "whatsapp-2",
    channel: "WhatsApp",
    value: "961 230 8413",
    href: "https://wa.me/5219612308413",
    external: true,
  },
  {
    id: "email",
    channel: "Correo",
    value: "contactounifood@gmail.com",
    href: "mailto:contactounifood@gmail.com",
    external: false,
  },
] as const;

export const navLinks = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#estudiantes", label: "Para estudiantes" },
  { href: "#cafeterias", label: "Para cafeterías" },
  { href: "#faq", label: "Preguntas frecuentes" },
  { href: "#contacto", label: "Contacto" },
] as const;

export type Cta = { href: string; label: string; external: boolean };

export const ctas = {
  header: { href: "#como-funciona", label: "Conocer UNIFOOD", external: false },
  heroPrimary: { href: "#como-funciona", label: "Descubrir cómo funciona", external: false },
  heroSecondary: { href: "#cafeterias", label: "¿Tienes una cafetería?", external: false },
  cafeteria: { href: "#contacto", label: "Quiero conocer UNIFOOD para mi cafetería", external: false },
  final: { href: "#contacto", label: "Contactar al equipo", external: false },
} satisfies Record<string, Cta>;
