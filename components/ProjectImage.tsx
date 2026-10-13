import Image from "next/image";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

export function ProjectImage({
  src,
  seed,
  alt,
  priority,
  tone,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src?: string;
  seed: string;
  alt: string;
  priority?: boolean;
  tone?: "light" | "mid";
  sizes?: string;
}) {
  if (!src) return <PhotoPlaceholder seed={seed} tone={tone} />;
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />;
}
