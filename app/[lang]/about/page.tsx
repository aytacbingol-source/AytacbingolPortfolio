import { redirect } from "next/navigation";

// Hakkımda içeriği artık ana sayfanın ilk bölümünde.
export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  redirect(`/${lang}#about`);
}
