/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
          dark: '#9A7A30',
        },
        cream: '#F8F3EA',
        dark: {
          DEFAULT: '#0D0D0D',
          2: '#1A1510',
          3: '#231E16',
        },
        muted: '#8A7A60',
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.8s ease both',
        'fade-in-up': 'fadeInUp 0.8s ease both',
        'pulse-dot': 'pulseDot 2s ease infinite',
        'scroll-line': 'scrollLine 2s ease infinite',
        'bounce-in': 'bounceIn 1.5s 1s ease both',
      },
      keyframes: {
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '70%': { transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
