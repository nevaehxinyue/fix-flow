import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // '#A18072','#DFCDC5', 
        'theme-bronze':'#957468',
        // 'button-color': '#8DA4EF',
        // 'button-hover-color': '#3E63DD'
        'button-color': '#202020',
        'button-hover-color': '#646464'

      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
