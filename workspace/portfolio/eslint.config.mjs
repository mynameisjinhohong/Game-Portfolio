import nextPlugin from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'dist/**', 'build/**'],
  },
  ...nextPlugin,
];

export default eslintConfig;
