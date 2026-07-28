# React + Vite

## Customer chatbot setup

The customer-facing Yumi Assistant is included on every storefront page and is excluded from the admin area. It uses the server-side endpoint at `/api/chat`; no AI key is exposed to the browser.

1. Copy `.env.example` to `.env.local` for local Vercel development, or add the variables in **Vercel → Project → Settings → Environment Variables**.
2. Set `OPENAI_API_KEY` to an OpenAI API key. Optionally set `OPENAI_CHAT_MODEL`; it defaults to `gpt-5.6-luna`.
3. Deploy with Vercel. The `api/chat.js` function will be deployed automatically.

For local testing of `/api/chat`, run it through the Vercel development environment (for example, `vercel dev`); Vite alone serves the React app but does not run Vercel serverless functions.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
