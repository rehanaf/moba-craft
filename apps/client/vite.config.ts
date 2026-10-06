import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  publicDir: fileURLToPath(new URL('../../assets', import.meta.url)),
  plugins: [
    VitePWA({
      injectRegister: 'script',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Moba CraftX',
        short_name: 'MobaCraftX',
        description: 'MOBA web bergaya Minecraft',
        theme_color: '#101418',
        background_color: '#101418',
        display: 'fullscreen',
        orientation: 'landscape',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
});
