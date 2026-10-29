export type Point = { x: number; y: number };

type HalftoneOptions = {
  /** Polígono en px relativos al host; las esquinas se redondean con `radius`. */
  getPolygon: (host: HTMLElement) => Point[];
  observe?: HTMLElement[];
  radius?: number;
  base?: string;
  ink?: string;
};

export type HalftoneController = {
  setProgress: (p: number) => void;
  enablePointer: () => () => void;
  destroy: () => void;
};

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function field(x: number, y: number, w: number, h: number) {
  const u = x / 1000;
  const v = y / 1000;
  const n =
    Math.sin(u * 4.2 + 1.3) * Math.cos(v * 5.1 - 0.7) * 0.55 +
    Math.sin((u + v) * 2.4 + 2.1) * 0.4 +
    Math.sin(u * 1.3 - v * 3.4 + 0.4) * 0.35;
  // Calor extra en las esquinas superior derecha e inferior izquierda.
  const tr = Math.hypot(1 - x / w, y / h);
  const bl = Math.hypot(x / w, 1 - y / h);
  const edge = Math.max(0, 0.75 - Math.min(tr, bl)) * 1.1;
  return smoothstep(-0.5, 0.55, n + edge);
}

function roundedPolygon(ctx: CanvasRenderingContext2D, pts: Point[], radius: number) {
  const n = pts.length;
  if (n < 3) return;
  const at = (i: number) => pts[((i % n) + n) % n] as Point;
  const first = at(0);
  const last = at(n - 1);
  ctx.moveTo((first.x + last.x) / 2, (first.y + last.y) / 2);
  for (let i = 0; i < n; i++) {
    const prev = at(i - 1);
    const cur = at(i);
    const next = at(i + 1);
    const r = Math.min(
      radius,
      Math.hypot(cur.x - prev.x, cur.y - prev.y) / 2,
      Math.hypot(next.x - cur.x, next.y - cur.y) / 2,
    );
    ctx.arcTo(cur.x, cur.y, next.x, next.y, r);
  }
  ctx.closePath();
}

export function createHalftone(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  { getPolygon, observe = [], radius = 40, base = "#524ae9", ink = "#fc5000" }: HalftoneOptions,
): HalftoneController {
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let cell = 8;
  let xs = new Float32Array(0);
  let ys = new Float32Array(0);
  let heat = new Float32Array(0);
  let polygon: Point[] = [];
  let progress = 0;
  let maxDist = 1;

  const pointer = { x: 0, y: 0, tx: 0, ty: 0, s: 0, ts: 0 };
  let raf = 0;

  function layout() {
    const rect = host.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

    cell = width < 640 ? 7 : 8;
    const cols = Math.ceil(width / cell);
    const rows = Math.ceil(height / cell);
    const count = cols * rows;
    xs = new Float32Array(count);
    ys = new Float32Array(count);
    heat = new Float32Array(count);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cell + cell / 2;
        const y = r * cell + cell / 2;
        xs[i] = x;
        ys[i] = y;
        heat[i] = field(x, y, width, height);
        i++;
      }
    }
    polygon = getPolygon(host);
    maxDist = Math.hypot(width, height);
    draw();
  }

  function draw() {
    if (!ctx || width === 0 || polygon.length < 3) return;
    ctx.clearRect(0, 0, width, height);
    if (progress <= 0) return;

    ctx.save();
    ctx.beginPath();
    roundedPolygon(ctx, polygon, radius);
    ctx.clip();

    ctx.globalAlpha = Math.min(1, progress * 2.5);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;

    // El revelado avanza como una onda desde la esquina inferior izquierda.
    const band = 260;
    const front = progress * (maxDist + band);
    const sigma2 = 2 * 95 * 95;
    const usePointer = pointer.s > 0.001;

    ctx.fillStyle = ink;
    ctx.beginPath();
    for (let i = 0; i < heat.length; i++) {
      const x = xs[i] as number;
      const y = ys[i] as number;
      let k = 1;
      if (progress < 1) {
        const d = Math.hypot(x, height - y);
        k = Math.min(1, Math.max(0, (front - d) / band));
        if (k === 0) continue;
      }
      let r = cell * (0.07 + (heat[i] as number) * 0.68) * k;
      if (usePointer) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        r += cell * 0.34 * pointer.s * Math.exp(-(dx * dx + dy * dy) / sigma2);
      }
      if (r < 0.3) continue;
      ctx.moveTo(x + r, y);
      ctx.arc(x, y, r, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.restore();
  }

  function tick() {
    pointer.x += (pointer.tx - pointer.x) * 0.18;
    pointer.y += (pointer.ty - pointer.y) * 0.18;
    pointer.s += (pointer.ts - pointer.s) * 0.12;
    draw();
    const settled =
      Math.abs(pointer.ts - pointer.s) < 0.002 &&
      Math.abs(pointer.tx - pointer.x) < 0.5 &&
      Math.abs(pointer.ty - pointer.y) < 0.5;
    raf = settled ? 0 : requestAnimationFrame(tick);
  }

  const wake = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const ro = new ResizeObserver(() => layout());
  ro.observe(host);
  observe.forEach((el) => ro.observe(el));
  layout();

  return {
    setProgress(p) {
      progress = p;
      draw();
      if (p > 0) host.setAttribute("data-halftone-ready", "");
    },
    enablePointer() {
      const onMove = (e: PointerEvent) => {
        if (progress < 1) return;
        const rect = host.getBoundingClientRect();
        pointer.tx = e.clientX - rect.left;
        pointer.ty = e.clientY - rect.top;
        if (pointer.s < 0.01) {
          pointer.x = pointer.tx;
          pointer.y = pointer.ty;
        }
        pointer.ts = 1;
        wake();
      };
      const onLeave = () => {
        pointer.ts = 0;
        wake();
      };
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      return () => {
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
      };
    },
    destroy() {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    },
  };
}
