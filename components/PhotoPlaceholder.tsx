// Gerçek fotoğraf gelene kadar gösterilen monoton yer tutucu: gökyüzü, zemin ve gölgeli bina kütleleri.
// Aynı "seed" her zaman aynı görseli üretir.

function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const tones = {
  light: ["#c9cccf", "#eef0f1", "#a9abad", "#f7f7f6", "#d4d5d6", "#55585c"],
  mid: ["#8f9397", "#c9ccce", "#6f7275", "#e9e9e8", "#bdbfc1", "#3b3d40"],
};

export function PhotoPlaceholder({ seed, tone = "light" }: { seed: string; tone?: keyof typeof tones }) {
  const t = tones[tone];
  const r = seeded(seed);
  const W = 800;
  const H = 600;
  const gy = H * (0.72 + r() * 0.1);
  const id = `g${seed.replace(/[^a-z0-9]/gi, "")}${tone}`;

  const masses: React.ReactNode[] = [];
  let x = -40 + r() * 120;
  let k = 0;
  while (x < W) {
    const w = 160 + r() * 260;
    const h = H * (0.18 + r() * 0.45);
    const y = gy - h;
    const d = 30 + r() * 50;
    const fl = 22 + Math.floor(r() * 10);
    const bands: React.ReactNode[] = [];
    for (let yy = y + fl; yy < gy - 8; yy += fl) {
      bands.push(<rect key={yy} x={x} y={yy} width={w} height={Math.max(3, fl * 0.35)} fill={t[5]} opacity={0.5} />);
    }
    const roof = r() > 0.5;
    masses.push(
      <g key={k++}>
        <polygon points={`${x + w},${y} ${x + w + d},${y + d * 0.4} ${x + w + d},${gy} ${x + w},${gy}`} fill={t[4]} />
        <rect x={x} y={y} width={w} height={gy - y} fill={t[3]} />
        {bands}
        {roof && <rect x={x - 20} y={y - 8} width={w + 40} height={8} fill={t[5]} opacity={0.8} />}
      </g>,
    );
    x += w + d + 30 + r() * 140;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="block h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t[0]} />
          <stop offset="1" stopColor={t[1]} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id})`} />
      <rect y={gy} width={W} height={H - gy} fill={t[2]} />
      {masses}
    </svg>
  );
}
