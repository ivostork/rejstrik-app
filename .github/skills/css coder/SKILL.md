---
name: css-standards
description: Enforces CSS coding standards, mandatory design token usage, and rem unit conventions. Use this when writing, refactoring, or reviewing CSS code to ensure consistency with the design system.
---

# CSS Coding Standards

## When to use this skill
Use this skill when you need to:
- Write new CSS styles for components
- Refactor existing CSS to match the design system
- Fix styling consistency issues
- Review CSS code for adherence to unit and token standards

## Overview
This skill defines CSS coding standards for consistent styling across the project. All CSS must use design tokens from `tokens.css` and follow strict unit conventions.

## File Organization
- **tokens.css**: Contains all design tokens (DO NOT MODIFY unless adding new design system tokens)
- **globals.css**: Contains custom styles, imports, and additional CSS variables
- Component-specific styles should be colocated with components when possible

## Unit Standards

### REQUIRED: Use `rem` Units Only
All size-based values MUST use `rem` units. This ensures consistent scaling and accessibility.

```css
/* ✅ CORRECT */
padding: 1rem;
margin: 0.5rem;
font-size: 1.125rem;
border-radius: 0.25rem;
gap: 1.5rem;

/* ❌ INCORRECT - Never use these */
padding: 16px;
margin: 8px;
font-size: 18px;
border-radius: 4px;
gap: 24px;
```

### Allowed Units
| Unit | Use Case |
|------|----------|
| `rem` | All spacing, sizing, typography, border-radius |
| `%` | Relative widths, flex-basis, responsive layouts |
| `em` | Only for media queries (`min-width: 64em`) |
| `0` | Zero values (no unit needed) |
| `fr` | CSS Grid track sizing |
| `vh`, `vw` | Viewport-relative sizing (sparingly) |

### Forbidden Units
Never use these units in CSS files:
- `px` - Use `rem` instead
- `pt`, `pc`, `in`, `cm`, `mm` - Print units not applicable
- Unitless values for properties that require units

## CSS Variables - MANDATORY

### Always Use Token Variables
Reference variables from `tokens.css` instead of hardcoded values.

```css
/* ✅ CORRECT - Using token variables */
.component {
    color: var(--text-primary);
    background-color: var(--background-block-primary);
    border: 1px solid var(--border-subtle);
    padding: var(--spacing-m);
    border-radius: var(--corner-radius-s);
    font-size: var(--font-size-body-m);
    line-height: var(--height-line-m);
}

/* ❌ INCORRECT - Hardcoded values */
.component {
    color: #262626;
    background-color: #ffffff;
    border: 1px solid #e7e7e7;
    padding: 16px;
    border-radius: 8px;
    font-size: 16px;
}
```

### Available Token Categories

#### Spacing (`--spacing-*`)
```css
--spacing-none: 0rem;
--spacing-2xs: 0.125rem;    /* 2px */
--spacing-xs: 0.25rem;       /* 4px */
--spacing-xs-nudge: 0.375rem;/* 6px */
--spacing-s: 0.5rem;         /* 8px */
--spacing-s-nudge: 0.75rem;  /* 12px */
--spacing-m: 1rem;           /* 16px */
--spacing-m-nudge: 1.25rem;  /* 20px */
--spacing-l: 1.5rem;         /* 24px */
--spacing-xl: 2rem;          /* 32px */
--spacing-2xl: 2.5rem;       /* 40px */
--spacing-3xl: 3rem;         /* 48px */
--spacing-4xl: 3.5rem;       /* 56px */
--spacing-5xl: 4rem;         /* 64px */
--spacing-6xl: 4.5rem;       /* 72px */
--spacing-7xl: 5rem;         /* 80px */
--spacing-8xl: 7.5rem;       /* 120px */
```

#### Typography (`--font-size-*`)
```css
/* Body text */
--font-size-body-xs: 0.75rem;   /* 12px */
--font-size-body-s: 0.875rem;   /* 14px */
--font-size-body-m: 1rem;       /* 16px */
--font-size-body-l: 1.125rem;   /* 18px */
--font-size-body-xl: 1.25rem;   /* 20px */

/* Headlines */
--font-size-headline-xs: 1.125rem; /* 18px */
--font-size-headline-s: 1.25rem;   /* 20px */
--font-size-headline-m: 1.5rem;    /* 24px */
--font-size-headline-l: 2rem;      /* 32px */
--font-size-headline-xl: 2.5rem;   /* 40px */

/* Display */
--font-size-display-s: 2.5rem;  /* 40px */
--font-size-display-m: 3rem;    /* 48px */
--font-size-display-l: 3.5rem;  /* 56px */
```

#### Line Heights (`--height-line-*`)
```css
--height-line-xs: 1.125rem;
--height-line-s: 1.3125rem;
--height-line-m: 1.5rem;
--height-line-l: 1.6875rem;
--height-line-xl: 1.875rem;
--height-line-2xl: 2.25rem;
--height-line-3xl: 3rem;
```

#### Border Radius (`--corner-radius-*`)
```css
--corner-radius-none: 0rem;
--corner-radius-2xs: 0.125rem;
--corner-radius-xs: 0.25rem;
--corner-radius-xs-nudge: 0.375rem;
--corner-radius-s: 0.5rem;
--corner-radius-s-nudge: 0.75rem;
--corner-radius-m: 1rem;
--corner-radius-m-nudge: 1.25rem;
--corner-radius-l: 1.5rem;
--corner-radius-xl: 2rem;
--corner-radius-2xl: 2.5rem;
```

#### Component Heights (`--height-component-*`)
```css
--height-component-xs: 1.5rem;  /* 24px */
--height-component-s: 2rem;     /* 32px */
--height-component-m: 2.5rem;   /* 40px */
--height-component-l: 3rem;     /* 48px */
--height-component-xl: 3.5rem;  /* 56px */
```

#### Icon Sizes (`--icon-size-*`)
```css
--icon-size-xs: 0.75rem;
--icon-size-s: 0.875rem;
--icon-size-m: 1rem;
--icon-size-l: 1.125rem;
--icon-size-xl: 1.25rem;
--icon-size-2xl: 1.5rem;
--icon-size-3xl: 2rem;
--icon-size-4xl: 2.5rem;
--icon-size-5xl: 3rem;
```

#### Colors - Semantic Tokens
Always prefer semantic color tokens over raw color values:

```css
/* Background */
--background-page
--background-block-primary
--background-block-secondary
--background-primary
--background-primary-subtle
--background-secondary
--background-neutral-subtle

/* Text */
--text-primary
--text-secondary
--text-tertiary
--text-disabled
--text-white
--text-primary-color
--text-secondary-color

/* Border */
--border-subtle
--border-subtlest
--border-primary
--border-secondary
--border-neutral
--border-error
--border-success
--border-warning

/* Status */
--status-error
--status-success
--status-warning
--status-focus
--status-visited

/* Interactive */
--interactive-active
--interactive-disabled
--interactive-error
--interactive-inactive
```

## Media Queries
Use `em` units for media query breakpoints (consistent with tokens.css):

```css
/* ✅ CORRECT */
@media (min-width: 48em) { /* 768px */ }
@media (min-width: 64em) { /* 1024px */ }

/* ❌ INCORRECT */
@media (min-width: 768px) { }
@media (min-width: 1024px) { }
```

## CSS Best Practices

### Property Order
Organize properties in this order:
1. **Layout** (display, position, flex, grid)
2. **Box Model** (width, height, margin, padding, border)
3. **Typography** (font-*, line-height, text-*)
4. **Visual** (background, color, opacity)
5. **Misc** (cursor, transition, animation)

```css
.component {
    /* Layout */
    display: flex;
    align-items: center;
    gap: var(--spacing-m);
    
    /* Box Model */
    width: 100%;
    padding: var(--spacing-l);
    border: 1px solid var(--border-subtle);
    border-radius: var(--corner-radius-s);
    
    /* Typography */
    font-size: var(--font-size-body-m);
    line-height: var(--height-line-m);
    
    /* Visual */
    background-color: var(--background-block-primary);
    color: var(--text-primary);
    
    /* Misc */
    cursor: pointer;
    transition: background-color 0.2s ease;
}
```

### Selector Specificity
- Use class selectors primarily
- Avoid ID selectors for styling
- Keep specificity low and consistent
- Use BEM-like naming for components

```css
/* ✅ CORRECT */
.header { }
.header-logo { }
.header-nav { }
.header-nav-item { }

/* ❌ INCORRECT */
#header { }
div.header { }
.header .logo .image { }
```

### Custom Properties in globals.css
When adding new custom properties, add them to `globals.css` under the appropriate section:

```css
:root[data-theme="light"] {
    /* Layout */
    --max-content-width: 75rem; /* 1200px in rem */
    --content-padding: var(--spacing-l);
    
    /* Custom component tokens */
    --header-height: var(--height-component-xl);
}
```

## Conversion Reference

When converting existing `px` values to `rem`:

| px | rem |
|----|-----|
| 2px | 0.125rem |
| 4px | 0.25rem |
| 6px | 0.375rem |
| 8px | 0.5rem |
| 12px | 0.75rem |
| 16px | 1rem |
| 20px | 1.25rem |
| 24px | 1.5rem |
| 32px | 2rem |
| 40px | 2.5rem |
| 48px | 3rem |
| 56px | 3.5rem |
| 64px | 4rem |

**Formula**: `rem = px / 16`

## Checklist Before Committing CSS
- [ ] All spacing uses `--spacing-*` variables
- [ ] All font sizes use `--font-size-*` variables
- [ ] All colors use semantic color tokens
- [ ] All border-radius uses `--corner-radius-*` variables
- [ ] No `px` units (except for `1px` borders when necessary)
- [ ] Media queries use `em` units
- [ ] Properties are ordered consistently
- [ ] New custom properties are added to `globals.css`

```