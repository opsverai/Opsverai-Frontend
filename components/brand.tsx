import { images } from "@/lib/publicImages";

/** Shared wordmark for Opsver AI (opsverai.com · AI Innovation & Idea Development Platform) */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <img
      src={images.logo}
      alt="Opsver AI"
      className={className || "h-8 w-auto object-contain"}
      loading="eager"
      decoding="async"
    />
  );
}
