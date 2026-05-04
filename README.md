# LogiTrail — Logistics Service Landing Page

Marketing and contact landing page for **LogiTrail**, a logistics and freight company based in Gauteng, South Africa.

## Tech Stack

- React 18 + TypeScript
- Vite
- Plain CSS (custom properties, CSS nesting, `clamp()`)

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```
src/
  App.tsx          # Page sections and layout
  App.css          # All section styles and animations
  index.css        # CSS variables and global base styles
  components/
    Navbar.tsx     # Fixed navbar with mobile slide-in panel
    Navbar.css
  assets/          # Images and logo
```

## Features

- Full-height hero banner with blur-in load animations
- Sticky navbar with mobile hamburger menu
- Scroll-triggered stagger animations (services, contact links)
- Responsive at 1024px and 560px breakpoints
- SEO meta tags, Open Graph, and geo-targeting for Gauteng

## Contact

**Phone:** +27 68 697 2815  
**Email:** info@logitrail.co.za

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
