import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugin: Partial<VitePWAOptions> = {
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    workbox: {
        clientsClaim: true,
        skipWaiting: true,
    },
    includeAssets: ['favicon.ico', 'apple-touc-icon.png', 'masked-icon.svg'],
    manifest: {
        name: 'Creative Minds',
        short_name: 'Creative Minds',
        description: 'Place where you can share your thoughts.',
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
            {
                src: '/maskable_icon.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable',
            },
        ],
        theme_color: '#171717',
        background_color: '#e8ebf2',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
    },
};

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [react(), VitePWA(manifestForPlugin)],
});
