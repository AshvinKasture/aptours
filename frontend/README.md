# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

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

export default tseslint.config([
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

## Environment Setup

This project uses environment variables for configuration. Follow these steps to set up your environment:

### Contact Form Configuration

The contact form uses [Web3Forms](https://web3forms.com/) for form submission. To enable the contact form:

1. **Get a Web3Forms Access Key:**
   - Visit [https://web3forms.com/](https://web3forms.com/)
   - Sign up for a free account
   - Create a new form and get your access key

2. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`: `cp .env.example .env`
   - Replace `your_web3forms_access_key_here` with your actual Web3Forms access key in the `.env` file:
   
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
   ```

3. **GitHub Repository Setup (for deployment):**
   - Go to your GitHub repository
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `WEB3FORMS_ACCESS_KEY`
   - Value: Your Web3Forms access key (same as in your .env file)
   - Click **Add secret**

4. **Environment Variables:**
   - `VITE_SHOW_PRICING`: Controls whether to display tour prices (`true`/`false`)
   - `VITE_WEB3FORMS_ACCESS_KEY`: Your Web3Forms access key for contact form submissions

### Features

- **Contact Modal:** Interactive modal with form validation
- **Web3Forms Integration:** Reliable form submission without backend
- **Email Notifications:** Automatic email notifications for form submissions
- **Error Handling:** Comprehensive error handling and user feedback
- **Responsive Design:** Works seamlessly on all device sizes
