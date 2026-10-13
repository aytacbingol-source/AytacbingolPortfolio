import Image from "next/image";
import { PlanDrawing } from "./PlanDrawing";

export function ProjectImage({
  src,
  seed,
  alt,
  priority,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  fit,
}: {
  fit?: "slice" | "meet";
  src?: string;
  seed: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!src) return <PlanDrawing seed={seed} fit={fit} />;
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />;
}
