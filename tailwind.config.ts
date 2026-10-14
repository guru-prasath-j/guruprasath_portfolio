import type { Config } from 'tailwindcss';

// Design tokens — change them here and the whole site follows.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07080C',
        band: '#0A0C12',
        surface: '#0D0F16',
        line: '#1E2130',
        line2: '#2A2E44',
        ink: '#E9EAF0',
        soft: '#C9CCDA',
        muted: '#A7ABBE',
        faint: '#8C91A8',
        dim: '#5B6076',
        accent: '#8C97FF',
        cyan: '#5CE1E6',
        live: '#5CE1B9',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: { page: '1240px' },
    },
  },
  plugins: [],
};
export default config;
