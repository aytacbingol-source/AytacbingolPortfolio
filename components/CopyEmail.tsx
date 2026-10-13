"use client";

import { useState } from "react";

export function CopyEmail({ email, labels }: { email: string; labels: { copy: string; copied: string } }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {}
  }
  return (
    <span className="inline-flex flex-wrap items-baseline gap-3">
      <a href={`mailto:${email}`} className="text-2xl tracking-tight underline decoration-line underline-offset-8 hover:decoration-ink md:text-3xl">
        {email}
      </a>
      <button type="button" onClick={copy} className="border border-line px-2 py-1 text-xs hover:border-ink" aria-live="polite">
        {done ? labels.copied : labels.copy}
      </button>
    </span>
  );
}
