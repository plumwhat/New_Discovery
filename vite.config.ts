import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // This import is standard for React projects

// https://vitejs.dev/config/
export default defineConfig({
  // 1. This 'base' property is added to fix the blank page on GitHub Pages.
  // It tells your app to look for files in the correct sub-folder.
  base: "/New_Discovery/",

  // This is a standard and required plugin for Vite to work with React.
  plugins: [react()],

  // 2. Your 'resolve' configuration for custom '@' imports is kept.
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  }

  // 3. The 'define' block that exposed your API key has been removed for security.
});
