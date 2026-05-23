# pendolo.studio

The website for [pendolo.studio](https://pendolo.studio) — a creative design and web development studio.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Bun](https://bun.sh/) — package manager and runtime
- [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — 3D hero visuals
- [Framer Motion](https://www.framer.com/motion/) — animations

## Getting started

Install [Bun](https://bun.sh/docs/installation), then:

```sh
git clone <YOUR_GIT_URL>
cd pendolo-studio
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start the development server |
| `bun run build` | Create a production build |
| `bun start` | Serve the production build |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | Run TypeScript type checking |

## Deployment

This project is built for deployment on [Vercel](https://vercel.com/). Connect the repository to Vercel and deploy — Next.js is supported out of the box.
