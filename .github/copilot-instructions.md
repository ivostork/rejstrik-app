# Project Coding Standards

## Tech Stack
- **Framework**: Next.js 16.x with App Router
- **Language**: TypeScript 5.x with strict mode
- **UI Library**: React 19.x with functional components
- **Design System**: Gov Design System CE (`@gov-design-system-ce/react`)
- **Styling**: CSS (globals.css)

## General Guidelines
- Use TypeScript for all new code with strict type checking
- Follow functional programming principles where possible
- Prefer immutable data (`const`, `readonly`)
- Use optional chaining (`?.`) and nullish coalescing (`??`) operators

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Use ALL_CAPS for constants
- Prefix type definitions with descriptive names (e.g., `ButtonProps`, `UserData`)

## React & Next.js Guidelines
- Use functional components with hooks exclusively
- Use `'use client'` directive only when client-side interactivity is needed
- Follow React hooks rules (no conditional hooks)
- Keep components small and focused on a single responsibility
- Use `React.FC` type sparingly; prefer explicit prop types
- Colocate components in the `app/ui/` directory
- Use Next.js App Router conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`)

## TypeScript Guidelines
- Always define explicit types for component props using `type` or `interface`
- Use `type Props = {}` pattern for component props
- Avoid using `any` type; use `unknown` when type is truly unknown
- Use generic types when appropriate for reusable components
- Export types that may be used by other components

## Gov Design System CE
- Import components strictly from this package:
  `import { GovButton, GovFormInput } from '@gov-design-system-ce/react';`
- Do not use sub-path imports (e.g., avoid `@gov-design-system-ce/react/button`)
- Use Gov Design System components (e.g., `GovButton`, `GovFormInput`) instead of native HTML elements when available
- Follow the design system's color, size, and type props (e.g., `color='primary'`, `type='solid'`, `size='m'`)
- Reference icons from `/public/icons/` directories (colored, complex, components)
- Use Roboto font family as defined in `/public/fonts/`

## Accessibility
- Include proper ARIA attributes (`aria-live`, `aria-label`, etc.)
- Use semantic HTML elements
- Ensure keyboard navigation support
- Provide screen reader support with visually hidden text when needed

## State Management
- Use React's built-in `useState` and `useReducer` for local state
- Prefer lifting state up over complex state management libraries
- Use explicit type annotations for state: `useState<Type>(initialValue)`

## Event Handlers
- Name event handlers with `handle` prefix (e.g., `handleClick`, `handleSubmit`)
- Type event parameters explicitly (e.g., `React.MouseEvent<HTMLButtonElement>`)

## File Organization
```
app/
├── page.tsx           # Route pages
├── layout.tsx         # Layouts
├── globals.css        # Global styles
└── ui/                # Reusable UI components
    └── ComponentName.tsx
public/
├── fonts/             # Font files
└── icons/             # Icon assets
    ├── colored/
    ├── complex/
    └── components/
```

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries for React components
- Always log errors with contextual information

## Code Style
- Use 4 spaces for indentation
- Use single quotes for strings in JavaScript/TypeScript
- Add trailing commas in multi-line arrays and objects
- Keep lines under 100 characters when possible
