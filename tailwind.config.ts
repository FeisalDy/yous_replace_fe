import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
import { p } from 'framer-motion/client'

const round = (value: number): number => Math.round(value * 100) / 100
const em = (px: number, base: number): string => `${round(px / base)}em`

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: { card: '#2E2E2E' },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch',
            p: { marginTop: em(5, 20), marginBottom: em(5, 20) },
            h2: {
              fontSize: em(20, 14),
              marginTop: em(5, 20),
              marginBottom: em(5, 20),
              lineHeight: round(28 / 20)
            }
          }
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: { colors: { background: '#181818', foreground: '#fff' } }
      }
    }),
    require('@tailwindcss/typography')
  ]
}
