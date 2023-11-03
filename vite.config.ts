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
    devOptions: {
        enabled: true,
    },
    includeAssets: ['vite.svg', 'masked-icon.svg'],
    manifest: {
        name: 'Creative Minds',
        short_name: 'Creative Minds',
        description: 'Place where you can share your thoughts.',
        icons: [
            {
                src: '/vite.svg',
                sizes: '192x192',
                type: 'image/svg',
            },
            {
                src: '/vite.svg',
                sizes: '225x225',
                type: 'image/svg',
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
