import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: true,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/react/") && !id.includes("react-router") && !id.includes("react-refresh")) {
            return "react-vendor";
          }
          if (id.includes("react-router")) {
            return "router";
          }
          if (id.includes("@tanstack/react-query") || id.includes("@tanstack/query-core")) {
            return "react-query";
          }
          if (id.includes("@radix-ui")) {
            return "radix-ui";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
