---
description: Convert Stitch UI prototypes to functional Next.js applications
---

# Stitch UI to Next.js Conversion Workflow

This workflow guides the process of taking static UI prototypes from Stitch and transforming them into a production-ready Next.js application.

## Prerequisites
- Access to `stitch_e_commerce_practice_platform` directory containing `code.html` and `screen.png` files.
- A Next.js project initialized with Tailwind CSS.
- `PROJECT_SPEC.md` for functional requirements.

## Steps

### 1. Analysis & Mapping
- Review the `PROJECT_SPEC.md` to understand the business logic and data structures.
- Map each Stitch prototype folder to a specific route in the Next.js app (e.g., `luxecommerce_premium_home_page` -> `/`).
- Identify common components across prototypes (Headers, Footers, Product Cards).

### 2. Design System Foundation
// turbo
- Set up `globals.css` with the design tokens identified in the prototypes (colors, spacing, fonts).
- Configure `tailwind.config.ts` or `next.config.js` if custom fonts/icons are needed.

### 3. Component Extraction
- For each prototype:
  - Read the `code.html`.
  - Extract reusable functional components (e.g., `Button`, `ProductCard`, `Navbar`).
  - Convert HTML/CSS to React components using Tailwind CSS.
  - Apply the premium aesthetics (Glassmorphism, animations) as defined in the prototypes.

### 4. Logic & State Integration
- Implement client-side state management (Zustand/React Context).
- Add interactivity:
  - Search autocomplete.
  - Cart addition/removal.
  - Navigation transitions.
- Hook up mock data strings to local state.

### 5. Backend & API Integration
- Define API routes in `/app/api/` based on the data blueprints in `PROJECT_SPEC.md`.
- Implement database models (if applicable) or use a headless CMS/DaaS.
- Replace local state with `fetch` or `Server Actions`.

### 6. Polish & Verification
- Use `browser_subagent` to verify the UI against the `screen.png` in the prototype folder.
- Run `lint-and-validate` to ensure code quality.
- Verify SEO and Accessibility standards from `PROJECT_SPEC.md`.

## Quality Check
- [ ] UI matches the Stitch design 1:1.
- [ ] All interactive elements (Cart, Search, Forms) are functional.
- [ ] Responsive design is correctly implemented for all breakpoints.
- [ ] Performance and Accessibility (a11y) standards are met.
