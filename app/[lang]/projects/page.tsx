import { redirect } from "next/navigation";

// Projeler artık ana sayfadaki "Seçilmiş Mimari İşler" bölümünde.
export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  redirect(`/${lang}#projects`);
}
