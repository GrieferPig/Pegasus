// she's so kind

import { ThemeDefinition } from 'vuetify'
import {rockinRainbowLightTheme} from "./rockin_rainbow";
export const fluffyYellowLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        primary: '#FFEB3B',
        secondary: '#009688',
        accent: '#FFFFFF',
        error: '#e91e63',
        warning: '#ff9800',
        info: '#607d8b',
        success: '#8bc34a',
        background: '#ffffff',
        surface: '#ffffff',
    },
    variables: {}
}

export const fluffyYellowDarkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        primary: '#FFEB3B',
        secondary: '#00796B',
        accent: '#512DA8',
        error: '#e91e63',
        warning: '#ff9800',
        info: '#607d8b',
        success: '#8bc34a',
        background: '#000000',
        surface: '#000000',
    },
    variables: {}
}

export const THEME_ID = "fluffyYellow"
export const THEME_PRI_COLOR = fluffyYellowLightTheme.colors.primary
