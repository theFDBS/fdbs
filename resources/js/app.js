require('./bootstrap')

import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'

// Import Marketier UI
import MarketierUI from 'marketier-ui'
import 'marketier-ui/dist/style.css'

// Import Iodine UI
import IodineUI from '@freuwort/iodine-ui'

// Import i18n for Vue
import { createI18n } from 'vue-i18n/index'
import translations from '@/Lang/translations'

// Import Floating Vue
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

// Import dayjs
import dayjs from 'dayjs'
import 'dayjs/locale/de'

// Import permissions helper
import { can } from '@/Utils/Permissions'



/////////////////////////
// Prepare Vue         //
/////////////////////////
const i18n = createI18n({
    locale: 'de',
    fallbackLocale: 'en',
    messages: translations,
})

dayjs.locale('de')



/////////////////////////
// Initialize App      //
/////////////////////////
createInertiaApp({
    resolve(name)
    {
        return require(`./Pages/${name}.vue`)
    },

    setup({ el, app, props, plugin })
    {
        const application = createApp({ render: () => h(app, props) })
        const pinia = createPinia()

        application.use(plugin)
        application.use(MarketierUI)
        application.use(IodineUI)
        application.use(FloatingVue)
        application.use(i18n)
        application.use(pinia)
        application.mixin({ methods: { route, can } })
        application.config.globalProperties.$dayjs = dayjs

        application.mount(el)
    },
})

InertiaProgress.init({ color: 'var(--color-primary)' })
