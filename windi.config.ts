import { defineConfig } from 'windicss/helpers'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'media',
  attributify: true,

  plugins: [
    typography(),
  ],
})