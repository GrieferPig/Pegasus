// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi.mjs'

export default createVuetify(
    {
        components,
        directives,
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            }
        },
    }
)
