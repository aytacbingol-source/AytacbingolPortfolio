// Gerçek görsel gelene kadar her proje için slug'dan türetilen, her seferinde aynı çıkan bir plan taslağı çizer.

function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

type Rect = { x: number; y: number; w: number; h: number };

function split(r: Rect, rand: () => number, depth: number, out: Rect[]) {
  const min = 46;
  const canV = r.w > min * 2;
  const canH = r.h > min * 2;
  if (depth <= 0 || (!canV && !canH) || (depth < 3 && rand() < 0.25)) {
    out.push(r);
    return;
  }
  const vertical = canV && (!canH || r.w >= r.h ? rand() < 0.75 : rand() < 0.25);
  const t = 0.35 + rand() * 0.3;
  if (vertical) {
    const w = Math.round(r.w * t);
    split({ ...r, w }, rand, depth - 1, out);
    split({ ...r, x: r.x + w, w: r.w - w }, rand, depth - 1, out);
  } else {
    const h = Math.round(r.h * t);
    split({ ...r, h }, rand, depth - 1, out);
    split({ ...r, y: r.y + h, h: r.h - h }, rand, depth - 1, out);
  }
}

export function PlanDrawing({ seed, className = "", fit = "slice" }: { seed: string; className?: string; fit?: "slice" | "meet" }) {
  const rand = seeded(seed);
  const W = 400;
  const H = 300;
  const pad = 48;
  const outer = { x: pad, y: pad, w: W - pad * 2, h: H - pad * 2 };
  const rooms: Rect[] = [];
  split(outer, rand, 4, rooms);

  const cols = 4;
  const axes = Array.from({ length: cols + 1 }, (_, i) => outer.x + (outer.w / cols) * i);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`block h-full w-full bg-surface text-ink ${className}`}
      preserveAspectRatio={`xMidYMid ${fit}`}
      aria-hidden="true"
    >
      {axes.map((x, i) => (
        <g key={i}>
          <line x1={x} y1={18} x2={x} y2={H - 10} stroke="var(--axis)" strokeWidth="0.6" strokeDasharray="12 4 2 4" />
          <circle cx={x} cy={12} r={7} fill="var(--surface)" stroke="var(--axis)" strokeWidth="0.6" />
          <text x={x} y={14.5} textAnchor="middle" fontSize="7" fill="var(--muted)" fontFamily="inherit">
            {i + 1}
          </text>
        </g>
      ))}
      {rooms.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="none" stroke="currentColor" strokeWidth="1" />
      ))}
      {rooms.slice(0, 6).map((r, i) => {
        const s = Math.min(18, r.w / 3, r.h / 3);
        const cx = r.x + 6;
        const cy = r.y + r.h;
        return (
          <path
            key={`d${i}`}
            d={`M ${cx} ${cy} L ${cx} ${cy - s} A ${s} ${s} 0 0 1 ${cx + s} ${cy}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        );
      })}
      <rect x={outer.x} y={outer.y} width={outer.w} height={outer.h} fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
