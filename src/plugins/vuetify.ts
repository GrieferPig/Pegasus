// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import {createVuetify} from 'vuetify'
import {aliases, mdi} from 'vuetify/iconsets/mdi'
import {fa} from 'vuetify/lib/iconsets/fa'
import {
    defaultDarkTheme,
    defaultLightTheme,
    fluffyYellowDarkTheme,
    fluffyYellowLightTheme,
    lightningWhiteDarkTheme,
    lightningWhiteLightTheme,
    muffinheadGrayDarkTheme,
    muffinheadGrayLightTheme,
    popPurpleDarkTheme,
    popPurpleLightTheme,
    rockinRainbowDarkTheme,
    rockinRainbowLightTheme
} from "./themes";

export default createVuetify(
    // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
    {
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
                fa
            }
        },
        theme: {
            defaultTheme: 'defaultLightTheme',
            themes: {
                defaultLightTheme,
                defaultDarkTheme,

                fluffyYellowLightTheme,
                fluffyYellowDarkTheme,

                lightningWhiteLightTheme,
                lightningWhiteDarkTheme,

                muffinheadGrayLightTheme,
                muffinheadGrayDarkTheme,

                popPurpleLightTheme,
                popPurpleDarkTheme,

                rockinRainbowLightTheme,
                rockinRainbowDarkTheme

            },
            options: {
                customProperties: true,
            }
        }
    }
)
