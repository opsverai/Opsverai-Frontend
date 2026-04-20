/** Root-relative URL for files in `public/` (works with `base` in vite.config). */
export function publicAsset(path: string): string {
  const p = path.startsWith("/") ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL;
  if (base === "/") return `/${p}`;
  return `${base.replace(/\/?$/, "/")}${p}`;
}
