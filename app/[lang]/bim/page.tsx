import { redirect } from "next/navigation";

// BIM içeriği artık ana sayfadaki "BIM & Yazılım" bölümünde.
export default async function BimPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  redirect(`/${lang}#bim`);
}
