# 📨 Kawaii Messenger

A tiny minimalist messenger with a touch of *kawaii* aesthetics.

## Pages Sprint 1
- [Sign up page](https://kawaii-messenger.netlify.app/sign-up)
- [Sign in page](https://kawaii-messenger.netlify.app/)
- [Home page](https://kawaii-messenger.netlify.app/home)
- [Profile settings](https://kawaii-messenger.netlify.app/settings)
- [Messenger](https://kawaii-messenger.netlify.app/messenger)
- [500 error page](https://kawaii-messenger.netlify.app/500)
- [400 error page](https://kawaii-messenger.netlify.app/400)
- [404 error page](https://kawaii-messenger.netlify.app/404)

## 🛠 Tech Stack

**Languages & Frameworks:**  
- **TypeScript** & **JavaScript**  
- Component-based architecture (custom `Block` class, `EventBus`)

**Build & Tooling:**  
- **Vite** – lightning-fast build tool
- **Sass** (SCSS) – modern CSS with variables and nesting
- **PostCSS** – CSS transformations (with plugins like `postcss-nested`, `postcss-preset-env`)
- **Handlebars** – template engine for UI components

**Testing:**  
- **Mocha** – test runner  
- **Chai** – assertions  
- **Sinon** – spies, stubs, and mocks  
- **jsdom** – DOM emulation for tests

**Linting & Formatting:**  
- **ESLint** – JavaScript/TypeScript linting  
- **Stylelint** – CSS/SCSS linting  

**Automation & Quality:**  
- **Husky** – git hooks for pre-commit and pre-push  
- **lint-staged** – run linters/formatters only on staged files  
- **TypeScript** – static type checking (`tsc`)

**Deployment:**  
- **Netlify** – continuous deployment and hosting

## 🎨 Design

View the UI design on [Figma](https://www.figma.com/design/xFYpnXMI4U0U1I0RQb2PJQ/Messenger-Public?node-id=0-1&t=0Gy7dVTRkVwptXQX-1)
(mvp version for now)

## 🚀 Scripts

```bash
# Start the development server
npm run dev

# Build the project
npm run build

# Preview the production build
npm run preview

# Build and preview
npm start

# Type check with TypeScript
npm run type-check

# Run ESLint
npm run eslint

# Auto-fix ESLint issues
npm run eslint:fix

# Run Stylelint
npm run stylelint

# Auto-fix Stylelint issues
npm run stylelint:fix

# Full lint: ESLint, Stylelint, and TypeScript check
npm run lint

# Run all unit tests (Mocha, Chai, Sinon)
npm run test
```

## 🐉 Developer

Created by [Lana](https://github.com/enoferge)
