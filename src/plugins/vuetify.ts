// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import {lightTheme, darkTheme} from '@/plugins/themes'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// @ts-ignore
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi.mjs'
// @ts-ignore
import { fa } from 'vuetify/lib/iconsets/fa.mjs'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
    {
        components,
        directives,
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
                fa,
            }
        },
        theme: {
            defaultTheme: 'lightTheme',
            themes: {
                lightTheme,
                darkTheme,
            },
            options:{
                customProperties: true,
            }
        }
    }
)
