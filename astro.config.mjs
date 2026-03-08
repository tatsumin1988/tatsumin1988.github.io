import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserSite =
  repositoryOwner &&
  repositoryName &&
  repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;

const site =
  process.env.SITE_URL ??
  (repositoryOwner
    ? `https://${repositoryOwner}.github.io`
    : "https://username.github.io");

const base =
  process.env.BASE_PATH ??
  (repositoryName ? (isUserSite ? "/" : `/${repositoryName}/`) : "/");

export default defineConfig({
  site,
  base,
  output: "static",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark"
      },
      wrap: true
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
