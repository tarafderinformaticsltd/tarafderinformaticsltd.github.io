import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import { resolve, basename } from "node:path";

const site = JSON.parse(readFileSync(resolve("src/data/site.json"), "utf8"));

// Multi-page app: every key in site.pages is its own HTML document (index.html, cep.html, ...).
const pageFile = (key) => (key === "home" ? "index.html" : `${key}.html`);
const input = Object.fromEntries(
  Object.keys(site.pages).map((key) => [key, resolve(pageFile(key))])
);

// Fills <title>, meta tags and the favicon in each HTML file from src/data/site.json
function siteMeta() {
  return {
    name: "site-meta",
    transformIndexHtml(html, ctx) {
      const file = basename(ctx.filename);
      const key = Object.keys(site.pages).find((k) => pageFile(k) === file) ?? "home";
      const page = site.pages[key];
      return html
        .replaceAll("{{lang}}", site.lang)
        .replaceAll("{{title}}", page.title)
        .replaceAll("{{description}}", page.description)
        .replaceAll("{{keywords}}", site.keywords)
        .replaceAll("{{themeColor}}", site.themeColor)
        .replaceAll("{{siteName}}", site.name)
        .replaceAll("{{logo}}", site.logo)
        .replaceAll("{{page}}", key);
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [react(), siteMeta()],
  build: { rollupOptions: { input } },
});
