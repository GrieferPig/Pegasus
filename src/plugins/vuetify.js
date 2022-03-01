// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import {lightTheme, darkTheme} from './themes.ts'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify(
    {
        components,
        directives,
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
