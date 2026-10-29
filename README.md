# UNIFOOD — Landing page

Landing de marketing de UNIFOOD (pedidos anticipados para cafeterías universitarias).
Es independiente de la app Expo: no se conecta a Supabase ni pide datos personales.

- **Producto:** `MVP_UNIFOOD.md` (fuente de verdad de funcionalidades).
- **Copy y reglas:** `SUPERPROMPT_LANDING_UNIFOOD.md`.
- **Sistema visual:** `DESIGN (1).md`, `tokens.json`, `variables.css`, `theme.css`.

## Stack

Next.js 16 (App Router) · TypeScript estricto · Tailwind CSS v4 · GSAP + ScrollTrigger (`@gsap/react`).

## Comandos

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm run start
```

## Configuración antes de publicar

Copia `.env.example` a `.env.local` y completa:

| Variable | Uso | Si está vacía |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Dominio definitivo: activa `metadataBase`, canonical y URLs absolutas de Open Graph. | No se emite canonical; el build avisa de `metadataBase`. |
| Contacto | WhatsApp y correo en `lib/site-config.ts` (`contacts`). Los CTA de contacto llevan a `#contacto`. | — |

Todos los destinos de CTA están en `lib/site-config.ts`.

Pendiente de definir (no se inventó): dominio, redes sociales, aviso de privacidad y aviso legal.
El correo y los WhatsApp están en `lib/site-config.ts`.

## Estructura

```
app/                  layout (fuentes, metadatos, script de arranque), página, icono y OG image
components/landing/   secciones de la página
components/landing/hero/halftone.ts   halftone del hero dibujado en canvas
components/mockups/   teléfono y pantallas de ejemplo (datos ilustrativos)
components/ui/        logo, botones, iconos
lib/                  configuración de CTAs, registro de GSAP, datos de demostración
```

## Decisiones de diseño

- Se aplica el sistema “Caldera” de `DESIGN (1).md`: canvas Pumice, tarjetas Limestone,
  Ember como único acento fuerte, Plasma Violet solo en el halftone y una tarjeta, Sulfur en
  etiquetas, sin sombras, radios de 40 px y pills.
- **Tipografía display:** PP Neue Corp Compact es comercial; se sustituye por Archivo
  (Google Fonts) en anchura condensada (`font-stretch: 72%`). Si se licencia la original,
  basta con cambiar `--font-display` en `app/globals.css`.
- **Texto sobre Ember** en Obsidian (como indica el design); el blanco solo se usa en
  cifras grandes, porque blanco sobre Ember no alcanza contraste AA en texto pequeño.
- **Logo:** círculo Ember con la U blanca de la app actual (`components/ui/Logo.tsx`,
  `app/icon.svg`). El wordmark “UniFood” replica el de la app.
- Toda vista de producto está marcada como “Vista de ejemplo”, “Datos ilustrativos” o
  “Demostración”. No hay métricas, testimonios, logos de instituciones ni pagos.

## Animaciones

- Script en `<head>` que oculta el hero solo si habrá animación; si GSAP no arranca en 2.5 s,
  el contenido aparece igual.
- Hero: titular palabra por palabra, halftone que se revela en onda, teléfono, filas del
  menú y tarjeta de estado que avanza una vez (Pendiente → Aceptado → En preparación).
  Con puntero fino, los puntos del halftone reaccionan al cursor (el bucle se detiene al quedarse quieto).
- Revelados de scroll con `data-reveal` / `data-reveal-group` (`ScrollReveals.tsx`).
  Usan solo `opacity`, para que el contenido siga en el orden de tabulación.
- “Cómo funciona”: en escritorio, teléfono sticky que cambia de pantalla por paso y línea de progreso con scrub.
- Demo interactiva del menú: agregar productos, confirmar y ver los estados hasta “Listo para recoger”.
- Cafeterías: parallax mínimo del panel y barras del reporte (solo escritorio).
- Todo se desactiva con `prefers-reduced-motion: reduce` vía `gsap.matchMedia()`; los
  contextos se limpian con `useGSAP`.
