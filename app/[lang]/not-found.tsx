import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-40 md:px-10">
      <h1 className="text-5xl font-semibold tracking-[-0.04em] md:text-8xl">404</h1>
      <p className="mt-6 text-lg text-muted">Sayfa bulunamadı / Page not found</p>
      <Link href="/tr" className="mt-10 inline-block border border-ink px-5 py-3 text-sm hover:bg-ink hover:text-paper">
        aytacbingol.com
      </Link>
    </div>
  );
}
