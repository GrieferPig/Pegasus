// it could be 20% cooler

import { ThemeDefinition } from 'vuetify'
import {popPurpleLightTheme} from "./pop_purple";
export const rockinRainbowLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        primary: '#8BC34A',
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

export const rockinRainbowDarkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        primary: '#8BC34A',
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

export const THEME_ID = "rockinRainbow"
export const THEME_PRI_COLOR = rockinRainbowLightTheme.colors.primary
