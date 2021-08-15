import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from 'path'
import Pages from 'vite-plugin-pages'
import ViteComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Layouts from 'vite-plugin-vue-layouts'
import WindiCSS from 'vite-plugin-windicss'
import VueI18n from '@intlify/vite-plugin-vue-i18n'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${join(__dirname, 'src')}/`
    }
  },
  plugins: [
    vue({
      include: [/\.vue$/]
    }),
    Pages({
      extensions: ['vue']
    }),
    ViteComponents({
      extensions: ['vue'],
      dts: true,
      resolvers: [
        IconsResolver({componentPrefix: 'i'}),
        ElementPlusResolver()
      ]
    }),
    Icons({compiler: 'vue3'}),
    Layouts(),
    WindiCSS(),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [join(__dirname, 'locales/**')]
    })
  ],
  server: {
    fs: {
      strict: true
    }
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify'
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core'
    ],
    exclude: [
      'vue-demi'
    ]
  },
  build: {
    minify: 'terser',
    brotliSize: true,
    cssCodeSplit: true,
    terserOptions: {
      sourceMap: false,
      ecma: 5,
      ie8: true,
      safari10: true,
      keep_classnames: false,
      keep_fnames: false,
      compress: true,
      format: {
        preserve_annotations: false,
        comments: false
      }
    },
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      output: {
        preferConst: true,
        freeze: true
      }
    }
  }
})
