---
name: figma-to-code
description: Convert Figma designs to Next.js 16 components using Gov Design System CE, React 19, and TypeScript. Use when analyzing Figma mockups via Figma MCP and generating production-ready code that follows Czech government design standards.
---

# Figma to Code Conversion Skill

This skill guides the conversion of Figma designs into production-ready Next.js components using the Gov Design System CE (Czech e-Government Design System).

## When to Use This Skill

- Converting Figma mockups to React components
- Analyzing Figma designs via Figma MCP tools
- Generating TypeScript component code from visual designs
- Creating accessible, government-standard UI components

## Tech Stack Requirements

All generated code must use:
- **Framework**: Next.js 16.x with App Router
- **Language**: TypeScript 5.x with strict mode
- **UI Library**: React 19.x with functional components
- **Design System**: Gov Design System CE (`@gov-design-system-ce/react`)
- **Styling**: CSS (globals.css)

## Conversion Workflow

### Step 1: Analyze Figma Design

When receiving a Figma URL or selection:

1. Use Figma MCP tools (`get_design_context`, `get_metadata`) to extract:
   - Component hierarchy and structure
   - Colors, spacing, and typography
   - Icons and image assets
   - Interactive states (hover, focus, disabled)

2. Identify Gov Design System CE components that match design elements:
   - Buttons → `GovButton`
   - Form inputs → `GovFormInput`, `GovFormSelect`, `GovFormCheckbox`
   - Messages → `GovMessage`
   - Cards → `GovCard`
   - Navigation → `GovBreadcrumbs`, `GovTabs`
   - Layout → `GovContainer`, `GovGrid`, `GovGridItem`

### Step 2: Map Design to Components

Map Figma elements to Gov Design System components:

| Figma Element | Gov DS Component | Props to Consider |
|---------------|------------------|-------------------|
| Primary Button | `GovButton` | `color="primary"`, `type="solid"`, `size="m"` |
| Secondary Button | `GovButton` | `color="secondary"`, `type="outlined"` |
| Text Input | `GovFormInput` | `type="text"`, `size="m"` |
| Dropdown | `GovFormSelect` | `size="m"` |
| Alert/Message | `GovMessage` | `variant="primary\|secondary\|success\|error\|warning"` |
| Icon | Native `<img>` | Use `/public/icons/` paths |

### Step 3: Analyze Icons and Map to Assets

When the Figma design contains icons:

1. **Extract icon information** from Figma using MCP tools:
   - Identify all icon nodes in the design
   - Note icon names, sizes, and colors used
   - Check if icons are decorative or functional

2. **Review available icons** in `/public/icons/`:
   - `/public/icons/colored/` - Icons with predefined colors
   - `/public/icons/complex/` - Multi-part or detailed icons
   - `/public/icons/components/` - UI component icons (arrows, chevrons, etc.)

3. **Match Figma icons to existing assets**:
   - Compare icon names and visual appearance
   - Propose the closest matching icon from the public folder
   - Document any icons that need to be downloaded from Figma

4. **Icon mapping output format**:
   ```
   | Figma Icon Name | Proposed Asset Path | Match Status |
   |-----------------|---------------------|--------------|
   | search-icon     | /icons/components/search.svg | ✓ Exact match |
   | arrow-right     | /icons/components/chevron-right.svg | ~ Similar |
   | custom-logo     | N/A | ✗ Download from Figma |
   ```

5. **For missing icons**:
   - List all icons that are not available in `/public/icons/`
   - Provide the Figma node ID and asset URL for each missing icon
   - Suggest the target path and filename (e.g., `/public/icons/components/user-profile.svg`)
   - The user will download and save the icons manually

### Step 4: Generate TypeScript Component

Follow this component structure:

```typescript
'use client'; // Only if client-side interactivity is needed

import { GovButton, GovFormInput } from '@gov-design-system-ce/react';

type ComponentNameProps = {
    // Define explicit prop types
    title: string;
    onSubmit?: (data: FormData) => void;
    isLoading?: boolean;
};

export default function ComponentName({ 
    title, 
    onSubmit, 
    isLoading = false 
}: ComponentNameProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <div className="component-name">
            {/* Component content */}
        </div>
    );
}
```

## Code Generation Rules

### TypeScript Requirements

1. **Always define explicit prop types**:
   ```typescript
   type ButtonProps = {
       label: string;
       onClick: () => void;
       disabled?: boolean;
   };
   ```

2. **Avoid `any` type** - use `unknown` if type is truly unknown

3. **Use explicit event types**:
   ```typescript
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { };
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { };
   ```

### React & Next.js Requirements

1. **Use `'use client'` directive** only when component needs:
   - Event handlers (onClick, onChange, etc.)
   - React hooks (useState, useEffect, etc.)
   - Browser APIs

2. **Naming conventions**:
   - Components: `PascalCase` (e.g., `SearchForm`, `UserCard`)
   - Event handlers: `handle` prefix (e.g., `handleClick`, `handleSubmit`)
   - Props types: `ComponentNameProps`

3. **File location**: Place components in `app/ui/` directory

### Gov Design System CE Usage

1. **Import components** from `@gov-design-system-ce/react`:
   ```typescript
   import { 
       GovButton, 
       GovFormInput, 
       GovFormLabel,
       GovMessage 
   } from '@gov-design-system-ce/react';
   ```

2. **Icon paths** - reference from `/public/icons/`:
   - Colored icons: `/icons/colored/icon-name.svg`
   - Complex icons: `/icons/complex/icon-name.svg`
   - Component icons: `/icons/components/icon-name.svg`

3. **Common component props**:
   - Size: `size="s" | "m" | "l" | "xl"`
   - Color: `color="primary" | "secondary" | "success" | "error" | "warning"`
   - Type: `type="solid" | "outlined" | "link"`

### Design Token Usage (tokens.css)

**IMPORTANT**: Always use CSS variables from `tokens.css`. All values use `rem` units for consistency.

#### Spacing Tokens
Use these for padding, margin, and gap values:
```css
--spacing-none: 0rem;
--spacing-2xs: 0.125rem;   /* 2px */
--spacing-xs: 0.25rem;     /* 4px */
--spacing-xs-nudge: 0.375rem;
--spacing-s: 0.5rem;       /* 8px */
--spacing-s-nudge: 0.75rem;
--spacing-m: 1rem;         /* 16px */
--spacing-m-nudge: 1.25rem;
--spacing-l: 1.5rem;       /* 24px */
--spacing-xl: 2rem;        /* 32px */
--spacing-2xl: 2.5rem;     /* 40px */
--spacing-3xl: 3rem;       /* 48px */
--spacing-4xl: 3.5rem;
--spacing-5xl: 4rem;
--spacing-6xl: 4.5rem;
--spacing-7xl: 5rem;
--spacing-8xl: 7.5rem;
```

#### Typography Tokens
Use these for font sizes (responsive across breakpoints):
```css
/* Body text */
--font-size-body-xs: 0.75rem;   /* 12px */
--font-size-body-s: 0.875rem;   /* 14px */
--font-size-body-m: 1rem;       /* 16px */
--font-size-body-l: 1.125rem;   /* 18px */
--font-size-body-xl: 1.25rem;   /* 20px */

/* Headlines */
--font-size-headline-xs: 1.125rem;
--font-size-headline-s: 1.25rem;
--font-size-headline-m: 1.5rem;
--font-size-headline-l: 2rem;
--font-size-headline-xl: 2.5rem;

/* Display (large headings) */
--font-size-display-s: 2.5rem;
--font-size-display-m: 3rem;
--font-size-display-l: 3.5rem;

/* Font family */
--font-family: Roboto, sans-serif;
```

#### Line Height Tokens
```css
--height-line-xs: 1.125rem;
--height-line-s: 1.3125rem;
--height-line-m: 1.5rem;
--height-line-l: 1.6875rem;
--height-line-xl: 1.875rem;
--height-line-2xl: 2.25rem;
--height-line-3xl: 3rem;
```

#### Corner Radius Tokens
```css
--corner-radius-none: 0rem;
--corner-radius-2xs: 0.125rem;
--corner-radius-xs: 0.25rem;     /* 4px */
--corner-radius-xs-nudge: 0.375rem;
--corner-radius-s: 0.5rem;       /* 8px */
--corner-radius-s-nudge: 0.75rem;
--corner-radius-m: 1rem;         /* 16px */
--corner-radius-m-nudge: 1.25rem;
--corner-radius-l: 1.5rem;
--corner-radius-xl: 2rem;
--corner-radius-2xl: 2.5rem;
```

#### Icon Size Tokens
```css
--icon-size-xs: 0.75rem;   /* 12px */
--icon-size-s: 0.875rem;   /* 14px */
--icon-size-m: 1rem;       /* 16px */
--icon-size-l: 1.125rem;   /* 18px */
--icon-size-xl: 1.25rem;   /* 20px */
--icon-size-2xl: 1.5rem;   /* 24px */
--icon-size-3xl: 2rem;     /* 32px */
--icon-size-4xl: 2.5rem;   /* 40px */
--icon-size-5xl: 3rem;     /* 48px */
```

#### Semantic Color Tokens
These adapt to light/dark themes automatically:
```css
/* Text colors */
--text-primary           /* Main text color */
--text-secondary         /* Secondary/muted text */
--text-tertiary          /* Tertiary/subtle text */
--text-disabled          /* Disabled state */
--text-placeholder       /* Input placeholders */
--text-primary-color     /* Primary brand color for text */
--text-secondary-color   /* Secondary brand color for text */

/* Background colors */
--background-white
--background-page
--background-block-primary
--background-block-secondary
--background-neutral-subtle
--background-neutral-subtlest
--background-primary
--background-primary-subtle
--background-primary-subtlest
--background-secondary
--background-secondary-subtle

/* Border colors */
--border-subtle          /* Subtle borders */
--border-subtlest        /* Very subtle borders */
--border-neutral         /* Neutral/default borders */
--border-primary         /* Primary color borders */
--border-secondary       /* Secondary color borders */
--border-disabled        /* Disabled state borders */

/* Status colors */
--status-error
--status-success
--status-warning
--status-focus
--status-visited

/* Interactive states */
--interactive-active
--interactive-disabled
--interactive-inactive
--interactive-error

/* Icon colors */
--icon-default
--icon-disabled
--icon-neutral
--icon-secondary
--icon-error
--icon-success
--icon-warning
```

#### Raw Color Palette (use sparingly, prefer semantic tokens)
```css
/* Primary green palette */
--color-primary-50 to --color-primary-1050

/* Secondary/accent palette */
--color-secondary-50 to --color-secondary-1000

/* Neutral grays */
--color-neutral-0 (white) to --color-neutral-1000 (black)

/* Status palettes */
--color-error-50 to --color-error-1000
--color-success-50 to --color-success-1000
--color-warning-50 to --color-warning-1000
```

### Custom Styles in globals.css

When tokens.css doesn't provide exactly what you need, add custom classes to `globals.css`:

1. **Always use token variables** - never hardcode values
2. **Use `rem` units** for any custom values to match the design system
3. **Follow the naming convention**: `.component-element` or `.component-element--modifier`

Example custom class using tokens:
```css
/* In globals.css */
.search-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
    padding: var(--spacing-l);
    background-color: var(--background-block-primary);
    border-radius: var(--corner-radius-s);
    border: 1px solid var(--border-subtle);
}

.search-form__title {
    font-family: var(--font-family);
    font-size: var(--font-size-headline-m);
    font-weight: 500;
    color: var(--text-primary);
    line-height: var(--height-line-2xl);
}

.search-form__input-wrapper {
    margin-bottom: var(--spacing-s);
}
```

### Figma-to-Token Mapping

When converting Figma designs, map design values to the nearest token:

| Figma Value | Token Variable |
|-------------|----------------|
| 4px spacing | `var(--spacing-xs)` |
| 8px spacing | `var(--spacing-s)` |
| 16px spacing | `var(--spacing-m)` |
| 24px spacing | `var(--spacing-l)` |
| 32px spacing | `var(--spacing-xl)` |
| 48px spacing | `var(--spacing-3xl)` |
| 12px font | `var(--font-size-body-xs)` |
| 14px font | `var(--font-size-body-s)` |
| 16px font | `var(--font-size-body-m)` |
| 20px font | `var(--font-size-body-xl)` |
| 24px font | `var(--font-size-headline-m)` |
| 32px font | `var(--font-size-headline-l)` |
| 4px radius | `var(--corner-radius-xs)` |
| 8px radius | `var(--corner-radius-s)` |
| 16px radius | `var(--corner-radius-m)` |
| Green primary | `var(--color-primary-600)` or `var(--text-primary-color)` |
| Orange secondary | `var(--color-secondary-600)` or `var(--text-secondary-color)` |
| Main text | `var(--text-primary)` |
| Muted text | `var(--text-secondary)` |
| Page background | `var(--background-page)` |
| Card background | `var(--background-block-primary)` |
| Subtle border | `var(--border-subtle)` |

### Accessibility Requirements

Always include:

1. **ARIA attributes** for dynamic content:
   ```typescript
   <div aria-live="polite" aria-atomic="true">
       {statusMessage}
   </div>
   ```

2. **Labels for form inputs**:
   ```typescript
   <GovFormLabel slot="top" size="m">
       Field Label
   </GovFormLabel>
   ```

3. **Screen reader support**:
   ```typescript
   <span className="sr-only">Loading results</span>
   ```

4. **Keyboard navigation** - ensure all interactive elements are focusable

### Styling Guidelines

1. **Use CSS variables from `tokens.css`** - never hardcode colors, spacing, or typography values
2. **Add custom classes to `globals.css`** when needed, always referencing token variables
3. **Use `rem` units** for any custom values (consistent with design system)
4. **Follow Gov DS semantic tokens** for theme-aware styling (light/dark mode support)
5. **Responsive design** - components should work on all screen sizes (tokens are responsive)
6. **Use `var(--font-family)` (Roboto)** as defined in tokens.css

## Example: Converting a Search Form

Given a Figma design with a search input and button:

```typescript
'use client';

import { useState } from 'react';
import { GovButton, GovFormInput, GovFormLabel } from '@gov-design-system-ce/react';

type SearchFormProps = {
    onSearch: (query: string) => void;
    placeholder?: string;
    isLoading?: boolean;
};

export default function SearchForm({ 
    onSearch, 
    placeholder = 'Vyhledat...', 
    isLoading = false 
}: SearchFormProps) {
    const [query, setQuery] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleInputChange = (event: CustomEvent<string>) => {
        setQuery(event.detail);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form" role="search">
            <GovFormInput
                type="text"
                size="m"
                placeholder={placeholder}
                value={query}
                onGovInput={handleInputChange}
                disabled={isLoading}
            >
                <GovFormLabel slot="top" size="m">
                    Hledaný výraz
                </GovFormLabel>
            </GovFormInput>
            
            <GovButton
                type="solid"
                color="primary"
                size="m"
                nativeType="submit"
                disabled={isLoading}
            >
                {isLoading ? 'Hledám...' : 'Vyhledat'}
            </GovButton>
        </form>
    );
}
```

**Example CSS in globals.css using tokens:**
```css
/* Search form styles using design tokens */
.search-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
    padding: var(--spacing-l);
    background-color: var(--background-block-primary);
    border-radius: var(--corner-radius-s);
}

.search-form__title {
    font-family: var(--font-family);
    font-size: var(--font-size-headline-m);
    font-weight: 500;
    color: var(--text-primary);
    line-height: var(--height-line-2xl);
    margin-bottom: var(--spacing-s);
}

.search-form__description {
    font-family: var(--font-family);
    font-size: var(--font-size-body-s);
    color: var(--text-secondary);
    line-height: var(--height-line-s);
}
```

## Asset Handling

When Figma design includes custom assets:

1. **Download assets** using URLs from Figma MCP response
2. **Save images** to `/public/` directory with descriptive names
3. **Use Next.js Image** for optimized loading when appropriate
4. **Reference icons** from `/public/icons/` subdirectories

## Quality Checklist

Before finalizing generated code, verify:

- [ ] TypeScript strict mode compatible (no `any` types)
- [ ] All props have explicit type definitions
- [ ] Gov Design System components used where available
- [ ] ARIA attributes included for accessibility
- [ ] Event handlers properly typed
- [ ] `'use client'` only where necessary
- [ ] Component placed in `app/ui/` directory
- [ ] Naming conventions followed (PascalCase, handleX)
- [ ] **CSS uses token variables from `tokens.css`** (no hardcoded values)
- [ ] **Custom styles added to `globals.css`** (not inline or component CSS)
- [ ] **All values use `rem` units** (consistent with design system)
- [ ] Semantic color tokens used for theme support (light/dark)
- [ ] Responsive design considered
- [ ] Czech language used for user-facing text where appropriate
