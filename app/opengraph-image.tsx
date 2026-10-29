import { ImageResponse } from "next/og";

export const alt = "UNIFOOD: pedidos anticipados para cafeterías universitarias";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function halftoneSvg(width: number, height: number) {
  const cell = 14;
  const dots: string[] = [];
  for (let y = cell / 2; y < height; y += cell) {
    for (let x = cell / 2; x < width; x += cell) {
      const n =
        Math.sin(x * 0.011 + 1.3) * Math.cos(y * 0.013 - 0.7) * 0.55 +
        Math.sin((x + y) * 0.006 + 2.1) * 0.4 +
        (1 - y / height) * 0.25;
      const t = Math.min(1, Math.max(0, (n + 0.45) / 1.2));
      const r = Math.max(1.1, t * cell * 0.62);
      dots.push(`<circle cx="${x}" cy="${y}" r="${r.toFixed(2)}"/>`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#524ae9"/><g fill="#fc5000">${dots.join("")}</g></svg>`;
}

export default function OpengraphImage() {
  const art = `data:image/svg+xml;base64,${Buffer.from(halftoneSvg(460, 550)).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#e2e2df",
          padding: 40,
          gap: 32,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 64,
                background: "#fc5000",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 38,
                fontWeight: 700,
              }}
            >
              U
            </div>
            <div style={{ fontSize: 34, color: "#070607" }}>UniFood</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 76, lineHeight: 1, fontWeight: 800, color: "#070607", letterSpacing: -1 }}>
              Tu pausa en la universidad, mejor organizada.
            </div>
            <div style={{ fontSize: 28, color: "#3b3a3b", lineHeight: 1.35 }}>
              Menús claros, pedidos anticipados y el estado de tu pedido en un solo lugar.
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={art} width={460} height={550} alt="" style={{ borderRadius: 40 }} />
      </div>
    ),
    size,
  );
}
