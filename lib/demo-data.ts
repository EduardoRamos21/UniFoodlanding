/**
 * Datos exclusivamente ilustrativos para las vistas de ejemplo de la landing.
 * No representan cafeterías, precios ni pedidos reales.
 */

export type FoodGlyph = "cup" | "bowl" | "torta" | "glass" | "cookie" | "salad";

export type DemoProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  category: DemoCategoryId;
  glyph: FoodGlyph;
};

export type DemoCategoryId = "desayunos" | "comidas" | "bebidas";

export const demoCafeteria = {
  name: "Cafetería Central",
  campus: "Campus de ejemplo",
};

export const demoCategories: { id: DemoCategoryId; label: string }[] = [
  { id: "desayunos", label: "Desayunos" },
  { id: "comidas", label: "Comidas" },
  { id: "bebidas", label: "Bebidas" },
];

export const demoProducts: DemoProduct[] = [
  {
    id: "molletes",
    name: "Molletes",
    description: "Con frijoles, queso y pico de gallo.",
    price: 45,
    available: true,
    category: "desayunos",
    glyph: "torta",
  },
  {
    id: "chilaquiles",
    name: "Chilaquiles verdes",
    description: "Con crema, queso y cebolla.",
    price: 60,
    available: true,
    category: "desayunos",
    glyph: "bowl",
  },
  {
    id: "fruta",
    name: "Coctel de fruta",
    description: "Fruta de temporada picada.",
    price: 35,
    available: false,
    category: "desayunos",
    glyph: "salad",
  },
  {
    id: "torta",
    name: "Torta de milanesa",
    description: "Pan telera, aguacate y jitomate.",
    price: 65,
    available: true,
    category: "comidas",
    glyph: "torta",
  },
  {
    id: "ensalada",
    name: "Ensalada de pollo",
    description: "Lechuga, pollo a la plancha y aderezo.",
    price: 70,
    available: true,
    category: "comidas",
    glyph: "salad",
  },
  {
    id: "sopa",
    name: "Sopa del día",
    description: "Pregunta en la cafetería por la de hoy.",
    price: 40,
    available: false,
    category: "comidas",
    glyph: "bowl",
  },
  {
    id: "cafe",
    name: "Café americano",
    description: "Vaso de 12 oz.",
    price: 25,
    available: true,
    category: "bebidas",
    glyph: "cup",
  },
  {
    id: "jamaica",
    name: "Agua de jamaica",
    description: "Vaso de 500 ml.",
    price: 20,
    available: true,
    category: "bebidas",
    glyph: "glass",
  },
  {
    id: "galleta",
    name: "Galleta de avena",
    description: "Horneada en la cafetería.",
    price: 18,
    available: true,
    category: "bebidas",
    glyph: "cookie",
  },
];

export type OrderStatus = "pending" | "accepted" | "preparing" | "ready";

export const orderStatusFlow: { id: OrderStatus; label: string; hint: string }[] = [
  { id: "pending", label: "Pendiente", hint: "La cafetería revisa tu pedido." },
  { id: "accepted", label: "Aceptado", hint: "La cafetería confirmó tu pedido." },
  { id: "preparing", label: "En preparación", hint: "Tu pedido se está preparando." },
  { id: "ready", label: "Listo para recoger", hint: "Consulta las indicaciones de la cafetería." },
];

export const demoFolio = "UF-0427";

const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export function formatMXN(value: number) {
  return mxn.format(value);
}
