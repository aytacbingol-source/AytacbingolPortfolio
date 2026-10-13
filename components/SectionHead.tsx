export function SectionHead({ no, title, aside }: { no: string; title: string; aside?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[3rem_1fr] items-baseline gap-3 border-b border-ink pb-4 md:grid-cols-[5rem_1fr_auto]">
      <span className="font-mono text-sm text-muted tabular-nums">{no}</span>
      <h2 className="text-3xl font-semibold tracking-[-0.035em] md:text-5xl">{title}</h2>
      {aside && <div className="col-start-2 text-sm text-muted md:col-start-3">{aside}</div>}
    </div>
  );
}
