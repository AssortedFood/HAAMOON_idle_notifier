// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.spec.ts'],  // only TS tests
    exclude: ['tests/**/*.js', 'dist/**'],
  },
});
