import { defineConfig } from 'vite-plugin-windicss'
// @ts-ignore
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  attributify: true,

  plugins: [
    typography(),
  ],
})
