/* Clears Vite's dependency optimizer cache. Stale entries (e.g. after removing a
   package) can otherwise cause ENOENT and a blank page in dev. */
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "node_modules", ".vite");
try {
  fs.rmSync(dir, { recursive: true, force: true });
} catch {
  /* ignore */
}
