import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import svgr from "vite-plugin-svgr";
import path from "path"

export default defineConfig({
    plugins: [
        laravel({
            // input: ['resources/css/app.css', 'resources/js/app.js'],
            input: ['resources/js/src/App.jsx'],
            refresh: true,
        }),
        react(),
        svgr(),
        eslint(),
        tailwindcss(),

    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true
        }
    } // for support all old js files
});
