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

1. **Use CSS classes** defined in `globals.css`
2. **Follow Gov DS spacing** and color tokens
3. **Responsive design** - components should work on all screen sizes
4. **Use Roboto font family** as defined in `/public/fonts/`

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
- [ ] Responsive design considered
- [ ] Czech language used for user-facing text where appropriate
