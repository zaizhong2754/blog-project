import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'bullhorn-shake': {
          '0%': {
            transform: 'rotate(-15deg)'
          },
          '4%': {
            transform: 'rotate(15deg)'
          },
          '8%': {
            transform: 'rotate(-18deg)'
          },
          '12%': {
            transform: 'rotate(18deg)'
          },
          '16%': {
            transform: 'rotate(-22deg)'
          },
          '20%': {
            transform: 'rotate(22deg)'
          },
          '24%': {
            transform: 'rotate(-18deg)'
          },
          '28%': {
            transform: 'rotate(18deg)'
          },
          '32%': {
            transform: 'rotate(-12deg)'
          },
          '36%': {
            transform: 'rotate(12deg)'
          },
          '40%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(0deg)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'bullhorn-shake': 'bullhorn-shake 1s linear infinite'
      },
      backgroundImage: {
        'default-bg': "url('/default_bg.webp')",
        'dark-bg': "url('/dark_bg.webp')",
        'reward-bg': "url('/reward_bg.jpg')",
        'friend-bg': "url('/friend_bg.jpg')"
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
