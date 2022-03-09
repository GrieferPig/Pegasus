// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import {lightTheme, darkTheme} from './themes.ts'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, mdi } from 'vuetify/lib/iconsets/mdi.mjs'
import { fa } from 'vuetify/lib/iconsets/fa.mjs'


export default createVuetify(
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
