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
});
