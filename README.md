# Webniere Agency Frontend

Marketing site for Webniere Agency built with Vite, React, TypeScript, shadcn-ui, and Tailwind CSS. This repository is ready for self-hosted, static deployment (e.g., GitHub Pages, Netlify, Vercel).

## Local development

Prerequisites: Node.js and npm installed.

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

## Production build

```sh
npm run build
```
The build output is generated in the `dist` directory and can be served by any static host.

## Deployment

- Upload the `dist` folder to your preferred static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.).
- Ensure your host serves `index.html` for client-side routes (SPA fallback).

## Tech stack

- Vite
- React + TypeScript
- Tailwind CSS
- shadcn-ui
- Framer Motion
