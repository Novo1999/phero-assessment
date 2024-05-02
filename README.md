This is a [Next.js](https://nextjs.org/) project about project management dashboard with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then,
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Brief overview of architecture

- Next.js 14 is used for SSR and routing, also created some metadata, and static params
- Used github pages to serve the project data as mock api
- Used tanstack query for fetching, wrapped the whole app with the provider
- Ant design as component library with tailwindCSS as styling
- For animations, mostly used framer motion and used GSAP to create a page transition animation
- Zustand manages global states like sidebar, auth, project and task actions, I like that we dont need any provider to wrap with
