import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeSync } from "@/components/ThemeSync";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDict(isLocale(lang) ? lang : "tr");
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name}, ${t.role}`, template: `%s | ${site.name}` },
    description: t.hero.intro,
    alternates: { canonical: `/${lang}`, languages: { tr: "/tr", en: "/en" } },
    openGraph: { siteName: site.name, locale: lang === "tr" ? "tr_TR" : "en_US", type: "website" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// Sayfa çizilmeden önce temayı uygular, böylece açılışta beyaz/siyah yanıp sönme olmaz.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <ThemeSync />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
          {lang === "tr" ? "İçeriğe geç" : "Skip to content"}
        </a>
        <Header lang={lang} t={t} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer t={t} />
      </body>
    </html>
  );
}
