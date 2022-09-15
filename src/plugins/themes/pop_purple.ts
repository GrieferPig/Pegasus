// pop princess!

import { ThemeDefinition } from 'vuetify'
export const popPurpleLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        primary: '#9C27B0',
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

export const popPurpleDarkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        primary: '#9C27B0',
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

export const THEME_ID = "popPurple"
export const THEME_PRI_COLOR = popPurpleLightTheme.colors.primary