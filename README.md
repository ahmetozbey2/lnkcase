This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Run build:

```bash
yarn build
```
## Commit Standart

`commitlint` was used to enforce a certain standard for commits. Commits that do not follow the format
`[commit type: commit message]` will be flagged by commit lint. The possible commit types are as follows:

- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

## Project File Structure and Functions

The fundamental file structure and component types used in this project are as follows:
```bash
.
├── ...
├── packages
| ├── components
|   ├── Button
|     ├── index.tsx
|     ├── button.test.tsx
|     ├── button.stories.tsx
| ├── views
|   ├── Homepage
|     ├── index.tsx
| ├── pages
|   ├── index.tsx
| ├── helpers
| ├── layout
└── ...
```

### `components`

This folder contains the core components of the project. Each component serves as a location where its structure is created, tests are written, and prototyping is done using Storybook.

#### Example: `Button`

- `index.tsx`: The fundamental implementation of the Button component.

### `views`

This folder is where components that create page views are combined, and the overall style of the page is designed.

#### Example: `Homepage`

- `index.tsx`: The main application file for the Homepage component.

### `pages`

This folder contains the main component that renders the entire page using components from the `views` folder.

#### Example: `index.tsx`

- `index.tsx`: The main file that renders the page.

This structure organizes the project files in a logical manner and describes the function of each component. This file structure makes the project more understandable and well-organized for development and maintenance purposes.


## State Management: Zustand

This project uses [Zustand](https://github.com/pmndrs/zustand) as the state management library for managing global state in a simple and scalable way.

### Key Features:

- Minimal and unopinionated API
- React-friendly with built-in hooks
- Easy to integrate and scale

Zustand stores are defined inside the `stores` folder and can be used throughout the app via custom hooks.

### Example usage:

```tsx
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## Data Fetching: React Query

[React Query](https://tanstack.com/query/latest) is used for managing server-state and handling asynchronous data fetching, caching, synchronization, and more.

### Key Features:

- Caching and background updates
- Query invalidation
- Pagination and lazy loading support
- Devtools for debugging

React Query is integrated using the `QueryClientProvider` at the root of the app. Queries are used with the `useQuery` hook.

### Example usage:

```tsx
const { data, isLoading, error } = useQuery(['todos'], fetchTodos);
```

React Query improves the performance and UX of the app by managing network state efficiently.
