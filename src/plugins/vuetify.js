// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import {lightTheme} from './themes.ts'

export default createVuetify(
    {
        theme: {
            defaultTheme: 'lightTheme',
            themes: {
                lightTheme,
            }
        }
    }
)
