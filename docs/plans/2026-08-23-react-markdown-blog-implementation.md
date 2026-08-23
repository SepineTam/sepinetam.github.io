# React Markdown Blog Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the legacy static site with a React blog whose published content comes only from Markdown files.

**Architecture:** Vite builds a React single-page application. A small content module imports Markdown as raw text, parses YAML frontmatter, filters drafts, and feeds list/detail routes; GitHub Actions builds and deploys `dist` to Pages.

**Tech Stack:** React, Vite, React Router, react-markdown, remark-gfm, YAML, Vitest, ESLint, GitHub Pages Actions.

---

### Task 1: Replace the legacy shell

**Files:**
- Remove: tracked legacy HTML, IDE metadata, Donate and Typewriter assets
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/styles.css`

**Steps:**
1. Add the Vite/React package definition and application entry points.
2. Implement the editorial shell, header, homepage, empty state, and responsive CSS.
3. Run `npm run lint` and `npm run build`.
4. Commit as `feat: rebuild blog shell with React`.

### Task 2: Add Markdown publishing

**Files:**
- Create: `src/lib/posts.js`, `src/lib/posts.test.js`, `src/content/posts/_template.md`
- Modify: `src/App.jsx`, `src/styles.css`, `README.md`

**Steps:**
1. Write tests for frontmatter parsing, draft filtering, date sorting, and slug lookup.
2. Run `npm test -- --run` and verify the tests initially fail.
3. Implement Markdown loading and rendering.
4. Document the exact publishing fields and commands.
5. Run tests, lint, and build.
6. Commit as `feat: publish blog posts from Markdown`.

### Task 3: Automate Pages deployment

**Files:**
- Create: `.github/workflows/deploy-pages.yml`, `scripts/prepare-pages.mjs`
- Modify: `package.json`

**Steps:**
1. Add a post-build step that copies `dist/index.html` to `dist/404.html`.
2. Add the official Pages artifact and deploy workflow.
3. Run tests, lint, and build; verify both entry files exist.
4. Commit as `ci: deploy React blog to GitHub Pages`.
5. Push `main`, switch Pages to workflow publishing, set the custom domain, and wait for the workflow.
6. Verify `https://blog.sepinetam.com` and a deep route without starting a local server.
