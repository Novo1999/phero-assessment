This is a [Next.js](https://nextjs.org/) project about project management dashboard with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
# then to install dependencies
npm i
```

Then,
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Brief overview of architecture

- Next.js is used for SSR and routing, also created some metadata, and static params
- Used github pages to server the project data as mock api
- Used tanstack query for fetching
- Ant design as component library with tailwindCSS as styling
- For animations, mostly used framer motion and used GSAP to create a page transition animation
- Zustand manages global states like sidebar, auth, project and task actions
