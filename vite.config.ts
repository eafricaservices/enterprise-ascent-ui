import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Injects the Meta Pixel <noscript> into <head> after Vite's HTML processing.
// Done here (not in index.html) because Vite's parser rejects <img> inside
// <noscript> inside <head> — the string replacement bypasses that entirely.
const metaPixelNoscript = {
  name: "meta-pixel-noscript",
  transformIndexHtml: {
    order: "post" as const,
    handler(html: string) {
      return html.replace(
        "</head>",
        `  <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1367317238456680&ev=PageView&noscript=1" /></noscript>\n  </head>`
      );
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), metaPixelNoscript],
  base: process.env.BASE_URL || "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Raise warning threshold slightly — individual vendor chunks can be ~200 kB each, which is expected.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── React core + routing + query ─────────────────────────────────
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom/") ||
            id.includes("node_modules/@remix-run/") ||
            id.includes("node_modules/@tanstack/")
          ) {
            return "react-vendor";
          }

          // ── Radix UI primitives ──────────────────────────────────────────
          if (id.includes("node_modules/@radix-ui/")) {
            return "radix-vendor";
          }

          // ── Framer Motion ────────────────────────────────────────────────
          if (id.includes("node_modules/framer-motion/")) {
            return "motion-vendor";
          }

          // ── Recharts + dependencies ──────────────────────────────────────
          if (
            id.includes("node_modules/recharts/") ||
            id.includes("node_modules/victory-vendor/") ||
            id.includes("node_modules/d3")
          ) {
            return "charts-vendor";
          }

          // ── Supabase ─────────────────────────────────────────────────────
          if (id.includes("node_modules/@supabase/")) {
            return "supabase-vendor";
          }

          // ── UI utilities & icon library ──────────────────────────────────
          if (
            id.includes("node_modules/lucide-react/") ||
            id.includes("node_modules/class-variance-authority/") ||
            id.includes("node_modules/clsx/") ||
            id.includes("node_modules/tailwind-merge/") ||
            id.includes("node_modules/cmdk/") ||
            id.includes("node_modules/sonner/") ||
            id.includes("node_modules/vaul/") ||
            id.includes("node_modules/next-themes/") ||
            id.includes("node_modules/embla-carousel") ||
            id.includes("node_modules/input-otp/") ||
            id.includes("node_modules/react-resizable-panels/")
          ) {
            return "ui-vendor";
          }
        },
      },
    },
  },
});

