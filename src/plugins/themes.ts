import {ThemeDefinition} from 'vuetify'
// @ts-ignore
export const lightTheme: ThemeDefinition = {
    dark: false,
    colors:{
        primary: '#0097A7',
        secondary: '#009688',
        accent: '#FFFFFF',
        error: '#e91e63',
        warning: '#ff9800',
        info: '#607d8b',
        success: '#8bc34a',
        background: '#ffffff',
        surface: '#ffffff',
        navdrawer: '#673AB7',
        itembg: '#f6f6f6'
},
    variables:{}
}

// @ts-ignore
export const darkTheme: ThemeDefinition = {
    dark: true,
    colors:{
        primary: '#303F9F',
        secondary: '#00796B',
        accent: '#512DA8',
        error: '#e91e63',
        warning: '#ff9800',
        info: '#607d8b',
        success: '#8bc34a',
        background: '#000000',
        surface: '#000000',
        navdrawer: '#512DA8',
        item_bg: '#2a2b2c'
    },
    variables:{}
}