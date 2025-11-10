# AI Wine Sommelier

Snap a photo of any wine bottle or label and get instant expert reviews, tasting notes, scores, and pricing information from world-renowned sources. This project is built with React, TypeScript, and Vite, and uses the Google Gemini API for image analysis.

## Project Setup

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-wine-sommelier.git
cd ai-wine-sommelier
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root of the project. You will need to add your Google Gemini API key to this file. Vite requires environment variables exposed to the client to be prefixed with `VITE_`.

```
VITE_API_KEY=YOUR_GEMINI_API_KEY
```

### 4. Run the Development Server
Once the setup is complete, you can start the local development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Available Scripts

- `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles and bundles the application for production into the `dist` folder.
- `npm run preview`: Serves the production build locally to preview it before deployment.

## Deploying to GitHub Pages

1.  Update the `base` property in `vite.config.ts` to match your repository name (e.g., `base: '/ai-wine-sommelier/'`).
2.  Run `npm run build`.
3.  Push the contents of the `dist` folder to the `gh-pages` branch of your repository. GitHub Actions can automate this process.
