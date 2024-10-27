import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './scenes/**/*.{ts,tsx}',
    './hud/**/*.{ts,tsx}',
  ],
  theme: {
    cursor: {
      auto: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogIDxkZWZzLz4KICA8Zz4KICAgIDxwYXRoIHN0cm9rZT0ibm9uZSIgZmlsbD0iIzAwMDAwMCIgZD0iTTE2Ljc1IDIzLjkgTDIwIDIyLjU1IDIwLjUgMjIuMTUgMjAuMzUgMjEuNTUgMTguNCAxNy43NSAyMS4yNSAxNy4yNSAyMS43NSAxNyAyMiAxNi40NSBRMjIgMTYuMSAyMS42IDE1LjkgTDExLjQ1IDguMiAxMS40IDguMiAxMC44NSA4IDEwLjIgOC4yNSAxMCA4LjggMTAgMjAuNzUgUTEwIDIxLjU1IDEwLjg1IDIxLjU1IEwxMS40IDIxLjM1IDEzLjYgMTkuOCAxNS42IDIzLjUgMTYuMDUgMjMuOTUgMTYuNzUgMjMuOSBNOCA4LjggUTcuOTUgOC4wNSA4LjU1IDcuMTUgTDguOTUgNi43NSBROS44IDYgMTAuODUgNiAxMS41NSA2IDEyLjIgNi4zNSBMMTIuNjUgNi42IDIyLjY1IDE0LjE1IFEyNC4xNSAxNSAyNCAxNi40NSAyNC4wNSAxNy41NSAyMy4yIDE4LjQ1IEwyMy4wNSAxOC41NSBRMjIuMSAxOS4zIDIxLjQ1IDE5LjMgTDIyLjEgMjAuNTUgUTIyLjUgMjEuMiAyMi41IDIyLjE1IEwyMi4wNSAyMy40IDIwLjkgMjQuMzUgMjAuOCAyNC40IDE3LjU1IDI1Ljc1IDE1LjI1IDI1LjggUTE0LjE1IDI1LjQgMTMuNzUgMjQuMjUgTDEyLjk1IDIyLjc1IDEyLjY1IDIyLjkgMTIuNTUgMjMgUTExLjc1IDIzLjU1IDEwLjg1IDIzLjU1IDcuOTUgMjMuNTUgOCAyMC43NSBMOCA4LjgiLz4KICAgIDxwYXRoIHN0cm9rZT0ibm9uZSIgZmlsbD0iI0ZGRkZGRiIgZD0iTTE2Ljc1IDIzLjkgTDE2LjA1IDIzLjk1IDE1LjYgMjMuNSAxMy42IDE5LjggMTEuNCAyMS4zNSAxMC44NSAyMS41NSBRMTAgMjEuNTUgMTAgMjAuNzUgTDEwIDguOCAxMC4yIDguMjUgMTAuODUgOCAxMS40IDguMiAxMS40NSA4LjIgMjEuNiAxNS45IFEyMiAxNi4xIDIyIDE2LjQ1IEwyMS43NSAxNyAyMS4yNSAxNy4yNSAxOC40IDE3Ljc1IDIwLjM1IDIxLjU1IDIwLjUgMjIuMTUgMjAgMjIuNTUgMTYuNzUgMjMuOSIvPgogIDwvZz4KPC9zdmc+"), auto',
      pointer:
        'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogIDxkZWZzLz4KICA8Zz4KICAgIDxwYXRoIHN0cm9rZT0ibm9uZSIgZmlsbD0iIzAwMDAwMCIgZD0iTTIxLjE1IDcuOTUgUTIzLjUgNy42NSAyNC45NSA4LjQgTDI1LjEgOC41IFEyNi4yIDkuMSAyNyAxMC4yNSBMMjcuNzUgMTEuOCAyNy44IDExLjg1IDI5LjUgMTYuMzUgMjkuNSAxNi40NSBRMzAuNDUgMTkuMjUgMjkuNyAyMi4xIEwyOS42NSAyMi4xNSAyOSAyMy45NSAyOSAyNC4wNSBRMjcuMTUgMjcuOTUgMjMuMDUgMjkuMzUgTDIzLjEgMjkuMzUgUTIwLjM1IDMwLjMgMTcuNjUgMjkuODUgTDE3LjUgMjkuOCBRMTUuMiAyOS4xNSAxMi45IDI3Ljc1IEwxMi45NSAyNy44IFExMS42NSAyNyAxMC4xIDI2Ljc1IEw4IDI2LjcgOC4xIDI2LjcgUTUuODUgMjcgNC4xIDI1LjU1IDIuMyAyNC4xNSAyLjA1IDIyIEwyIDIxLjkgUTEuOCAxOS42IDMuMiAxNy45IEwzLjE1IDE3Ljk1IFE0LjQ1IDE2LjIgNi42NSAxNiBMNi42NSAxNS45NSA3IDE1Ljk1IDQuNDUgOS4wNSBRMy41NSA2LjY1IDQuNDUgNSA1LjEgMy4zIDcuNSAyLjQ1IEw3LjU1IDIuNCBRMTIuMTUgMC42NSAxNC41IDUuMiBMMTQuNiA1LjQgMTUuOCA4LjYgMjEuMSA3Ljk1IDIxLjE1IDcuOTUgTTE0LjQ1IDEwLjc1IEwxMi43IDYuMSBRMTEuMiAzLjE1IDguMiA0LjMgNS4yIDUuMzUgNi4zIDguMzUgTDkuODUgMTcuOTUgUTguMzUgMTcuOCA2Ljg1IDE3Ljk1IDUuNTUgMTguMSA0Ljc1IDE5LjE1IDMuODUgMjAuMjUgNCAyMS43IDQuMiAyMy4xIDUuNCAyNCA2LjQ1IDI0LjkgNy44IDI0LjcgTDEwLjQ1IDI0Ljc1IFExMi4zNSAyNS4xIDEzLjk1IDI2LjA1IDE2IDI3LjMgMTggMjcuODUgMjAuMiAyOC4yNSAyMi40IDI3LjQ1IDI1LjcgMjYuMzUgMjcuMTUgMjMuMiBMMjcuNzUgMjEuNTUgUTI4LjM1IDE5LjMgMjcuNiAxNy4wNSBMMjUuOSAxMi41NSAyNS4zIDExLjM1IFEyNC44IDEwLjYgMjQuMSAxMC4yIEwyMS4zNSA5LjkgMTQuNDUgMTAuNzUiLz4KICAgIDxwYXRoIHN0cm9rZT0ibm9uZSIgZmlsbD0iI0ZGRkZGRiIgZD0iTTE0LjQ1IDEwLjc1IEwyMS4zNSA5LjkgMjQuMSAxMC4yIFEyNC44IDEwLjYgMjUuMyAxMS4zNSBMMjUuOSAxMi41NSAyNy42IDE3LjA1IFEyOC4zNSAxOS4zIDI3Ljc1IDIxLjU1IEwyNy4xNSAyMy4yIFEyNS43IDI2LjM1IDIyLjQgMjcuNDUgMjAuMiAyOC4yNSAxOCAyNy44NSAxNiAyNy4zIDEzLjk1IDI2LjA1IDEyLjM1IDI1LjEgMTAuNDUgMjQuNzUgTDcuOCAyNC43IFE2LjQ1IDI0LjkgNS40IDI0IDQuMiAyMy4xIDQgMjEuNyAzLjg1IDIwLjI1IDQuNzUgMTkuMTUgNS41NSAxOC4xIDYuODUgMTcuOTUgOC4zNSAxNy44IDkuODUgMTcuOTUgTDYuMyA4LjM1IFE1LjIgNS4zNSA4LjIgNC4zIDExLjIgMy4xNSAxMi43IDYuMSBMMTQuNDUgMTAuNzUiLz4KICA8L2c+Cjwvc3ZnPg=="), pointer',
      hold: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogIDxkZWZzLz4KICA8Zz4KICAgIDxwYXRoIHN0cm9rZT0ibm9uZSIgZmlsbD0iIzAwMDAwMCIgZD0iTTI3LjkgMTkuMyBMMjcuODUgMTkuNCAyNy4yIDIxLjIgMjcuMSAyMS40NSAyNi43IDIyLjIgMjYuNSAyMi41NSBRMjQuNSAyNi4yIDE4LjcgMjcuMSBMMTguNiAyNy4xIFExMC43NSAyOC4zNSA3Ljc1IDIzLjM1IEw2LjUgMjEuNzUgUTIuNSAxOS45NSAzLjMgMTUuNyBMMy4zIDE1LjggUTMuMzUgMTUuMDUgMy42NSAxNC40NSA0LjA1IDEzLjcgNC44NSAxMy40NSBMNS4yIDEzLjEgNS40NSAxMi43IFE0LjQ1IDkuMTUgNi4zNSA3LjggNi44IDcuMyA3LjUgNi45NSBMNy41NSA2LjkgUTkuNjUgNS42NSAxMS40IDYuMTUgMTIuNDUgNC41NSAxNSA0LjM1IDE3LjA1IDQuMiAxOC4zNSA1IDE5LjMgNC41IDIwLjY1IDQuMzUgTDIwLjcgNC4zNSBRMjUuMjUgMy45NSAyNi4yIDguNSBMMjYuMjUgOC43NSBRMjYuNCAxMC43IDI3IDEyLjE1IEwyNy4wNSAxMi4zIFEyOC4zNSAxNS4wNSAyOC4xNSAxOCBMMjcuOSAxOS4zIE0yMC44NSA2LjM1IFExOS4zNSA2LjUgMTguNyA3LjM1IEwxOC40NSA3LjU1IDE4LjE1IDcuNTUgMTcuOSA3LjM1IFExNy4wNSA2LjIgMTUuMTUgNi4zNSAxMyA2LjUgMTIuNyA4LjM1IEwxMi41NSA4LjY1IDEyLjI1IDguNzUgMTEuOSA4LjY1IFExMC40NSA3LjUgOC41IDguNjUgTDcuNzUgOS4yIFE2LjYgMTAuMjUgNy43IDEzLjIgTDcuNyAxMy40NSA3LjU1IDEzLjcgNy4zNSAxMy44NSBRNi4yIDE0LjE1IDUuNSAxNS4yIEw1LjUgMTUuMjUgUTUuMyAxNS42IDUuMjUgMTYuMDUgNC43NSAxOC45IDcuNiAyMCBMNy43IDIwLjA1IDcuOSAyMC4yIFE4LjUgMjEuMjUgOS4yNSAyMiBMOS4zNSAyMi4xIFExMS44IDI2LjIgMTguMzUgMjUuMSBMMTguNCAyNS4xIFEyMy4yIDI0LjM1IDI0Ljg1IDIxLjM1IEwyNC45IDIxLjMgMjUuMzUgMjAuNDUgMjUuOTUgMTguOCBRMjYuNSAxNi42NSAyNS44IDE0LjUgTDI1LjE1IDEyLjkgUTI0LjQ1IDExLjIgMjQuMjUgOC45IDIzLjY1IDYuMSAyMC44NSA2LjM1Ii8+CiAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yMC44NSA2LjM1IFEyMy42NSA2LjEgMjQuMjUgOC45IDI0LjQ1IDExLjIgMjUuMTUgMTIuOSBMMjUuOCAxNC41IFEyNi41IDE2LjY1IDI1Ljk1IDE4LjggTDI1LjM1IDIwLjQ1IDI0LjkgMjEuMyAyNC44NSAyMS4zNSBRMjMuMiAyNC4zNSAxOC40IDI1LjEgTDE4LjM1IDI1LjEgUTExLjggMjYuMiA5LjM1IDIyLjEgTDkuMjUgMjIgUTguNSAyMS4yNSA3LjkgMjAuMiBMNy43IDIwLjA1IDcuNiAyMCBRNC43NSAxOC45IDUuMjUgMTYuMDUgNS4zIDE1LjYgNS41IDE1LjI1IEw1LjUgMTUuMiBRNi4yIDE0LjE1IDcuMzUgMTMuODUgTDcuNTUgMTMuNyA3LjcgMTMuNDUgNy43IDEzLjIgUTYuNiAxMC4yNSA3Ljc1IDkuMiBMOC41IDguNjUgUTEwLjQ1IDcuNSAxMS45IDguNjUgTDEyLjI1IDguNzUgMTIuNTUgOC42NSAxMi43IDguMzUgUTEzIDYuNSAxNS4xNSA2LjM1IDE3LjA1IDYuMiAxNy45IDcuMzUgTDE4LjE1IDcuNTUgMTguNDUgNy41NSAxOC43IDcuMzUgUTE5LjM1IDYuNSAyMC44NSA2LjM1Ii8+CiAgPC9nPgo8L3N2Zz4="), pointer',
    },
    extend: {
      container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        collage: ['var(--font-format-collage)', ...fontFamily.sans],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      keyframes: {
        loop: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
      },

      animation: {
        loop: 'loop 20s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
      },
    },
  },
  plugins: [],
}
export default config
