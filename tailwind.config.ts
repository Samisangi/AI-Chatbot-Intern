module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        netrider: {
          navy: '#0A0A23',
          darkblue: '#0F0F3D',
          blue: '#2563EB',
          cyan: '#38BDF8',
          lightgray: '#E2E8F0',
          darkgray: '#1E293B',
        },
        futuristic: {
          background: '#0A0F1E',
          botBubble: '#132544',
          userStart: '#0066FF',
          userEnd: '#0090FF',
          accent: '#00D1FF',
          textMain: '#FFFFFF',
          textSecondary: '#B0C4DE',
          purple: '#6B46C1',
        },
      },
      backgroundImage: {
        'gradient-netrider':
          'linear-gradient(135deg, #0A0A23 0%, #0F0F3D 50%, #2563EB 100%)',
        'gradient-chat':
          'linear-gradient(180deg, #2563EB 0%, #38BDF8 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(37, 99, 235, 0.5)',
        'glow-cyan': '0 0 30px rgba(56, 189, 248, 0.6)',
      },
      animation: {
        'bounce-slow': 'bounce 1.5s infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'slideIn': 'slideIn 0.3s ease-out',
        'fadeIn': 'fadeIn 0.4s ease-in',
        'typing-dot': 'typingDot 1.4s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        typingDot: {
          '0%, 60%, 100%': { opacity: '0.5', transform: 'translateY(0)' },
          '30%': { opacity: '1', transform: 'translateY(-10px)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
