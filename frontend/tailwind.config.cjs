module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        bg: { primary: '#0A0A0A', secondary: '#111111', tertiary: '#1A1A1A' },
        border: { subtle: '#222222', default: '#2E2E2E' },
        text: { primary: '#FFFFFF', secondary: '#A0A0A0', muted: '#555555' },
        brand: { primary: '#6366F1', hover: '#4F52D4', glow: 'rgba(99,102,241,0.2)' },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        theory: '#3B82F6',
        practice: '#22C55E',
        project: '#F59E0B'
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        full: '9999px'
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px'
      }
    }
  },
  plugins: []
}
