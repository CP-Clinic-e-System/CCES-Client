import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-md'
import WindiCSS from 'vite-plugin-windicss'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'

const markdownWrapperClasses = 'prose prose-sm m-auto text-left'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Pages({
      extensions: ['vue', 'md'],
    }),

    Layouts(),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: true,
    }),

    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      dts: true,

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

      // custom resolvers
      resolvers: [
        // auto import icons
        IconsResolver({
          componentPrefix: '',
          // enabledCollections: ['carbon']
        }),
      ],
    }),

    Icons(),

    WindiCSS({
      safelist: markdownWrapperClasses,
    }),

    Markdown({
      wrapperClasses: markdownWrapperClasses,
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)
        md.use(LinkAttributes, {
          pattern: /^https?:\/\//,
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),

    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),

    Inspect({
      // change this to enable inspect for debugging
      enabled: false,
    }),
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
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
        comments: false,
      },
    },
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      output: {
        preferConst: true,
        freeze: true,
      },
    },
  },
})
