import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      '.vite',
      'build',
      '**/*.d.ts',
      'eslint.config.js',
      'vite.config.ts',
    ],
  },

  // ГЛОБАЛЬНЫЕ НАСТРОЙКИ
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },

  // Базовые JS правила
  js.configs.recommended,

  // TypeScript с type-checked
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...config.rules,
      // Смягчение спорных правил
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',

      // Отключаем самые шумные type-checked правила
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/await-thenable': 'off',
    },
  })),

  // React + кастомные правила
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Отключение exhaustive-deps (пустые зависимости useEffect)
      'react-hooks/exhaustive-deps': 'off',

      // игнорирование any в socket.io
      '@typescript-eslint/no-explicit-any': 'off',

      // FSD: запрет импорта UI из слоёв
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '@entities/*/ui/*',
            '@features/*/ui/*',
            '@widgets/*/ui/*',
            '@pages/*/ui/*',
          ],
        },
      ],
    },
  },
);
