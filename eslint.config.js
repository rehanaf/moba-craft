import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

const envAgnosticMessage =
  'packages/* harus bebas DOM/browser/network — jalankan juga di server. Gunakan dependency injection.';

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/dev-dist/**',
      '**/node_modules/**',
      'apps/client/android/**',
      'apps/client/ios/**',
      'coverage/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['apps/client/**/*.ts'],
    languageOptions: { globals: { ...globals.browser } },
  },
  {
    files: ['packages/*/src/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        ...['three', 'skinview3d', 'howler', 'zustand', 'vite-plugin-pwa'].map((name) => ({
          name,
          message: envAgnosticMessage,
        })),
      ],
      'no-restricted-globals': [
        'error',
        ...['window', 'document', 'navigator', 'HTMLElement', 'requestAnimationFrame'].map((name) => ({
          name,
          message: envAgnosticMessage,
        })),
      ],
    },
  },
  {
    files: ['eslint.config.js', '**/*.config.js', '**/*.config.ts', '**/vite.config.ts'],
    languageOptions: { globals: { ...globals.node } },
  },
  prettier,
);
