# VPS-SITE-CIA-FRONT

Front-end repository of CIA website.

---

## Structure
- `public`: static files (HTML template, images, etc.)
- `src`: source code (React components, styles, etc.)
- `build`: built files for production (after running `npm run build`)

---

## Customization

Modify files in `src` folder to customize the application (except `index.tsx`).

To edit outisde of src for customization:
- `webpack.config.js` (`plugins.webpack.DefinePlugin` to add environment variables to application)

---

## Commands
- `npm run lint` : lint the code with ESLint (automatically run before `dev` and `build`)
- `npm run dev` : run the application in development mode (with hot-reloading)
- `npm run build` : build the application for production
