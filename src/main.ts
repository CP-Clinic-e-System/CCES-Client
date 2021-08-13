import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useRootStore } from './store/root'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
    App,
    { routes },
    ({ app, router, routes, isClient, initialState, head, routePath }) => {
        const pinia = createPinia()
        app.use(pinia)

        if (import.meta.env.SSR) {
            initialState.pinia = pinia.state.value
        }
        else {
            pinia.state.value = initialState?.pinia || {}
        }

        router.beforeEach((to, from, next) => {
            const store = useRootStore(pinia)
            store.initialize()
            next()
        })

        Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.({ app, router, routes, isClient, initialState, head, routePath }))
    }
)
