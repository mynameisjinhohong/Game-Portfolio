import nextPlugin from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'dist/**', 'build/**'],
  },
  ...nextPlugin,
  {
    rules: {
      // useCallback으로 래핑된 setState 호출은 의도된 패턴
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default eslintConfig;
