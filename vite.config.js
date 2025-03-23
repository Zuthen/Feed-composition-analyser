import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            reporter: ['text', 'json'],
            exclude: [
                "src/types/**/*",
                "src/App.tsx",
                "src/main.tsx",
                "src/setupTests.ts"
            ],
        },
});
