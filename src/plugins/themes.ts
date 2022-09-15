import * as d from "./themes/default";
import * as fy from "./themes/fluffy_yellow";
import * as lw from "./themes/lightning_white";
import * as mg from "./themes/muffinhead_gray";
import * as pp from "./themes/pop_purple";
import * as rr from "./themes/rockin_rainbow";

const defaultLightTheme = d.defaultLightTheme
const defaultDarkTheme = d.defaultDarkTheme

const fluffyYellowLightTheme = fy.fluffyYellowLightTheme
const fluffyYellowDarkTheme = fy.fluffyYellowDarkTheme

const lightningWhiteLightTheme = lw.lightningWhiteLightTheme
const lightningWhiteDarkTheme = lw.lightningWhiteDarkTheme

const muffinheadGrayLightTheme = mg.muffinheadGrayLightTheme
const muffinheadGrayDarkTheme = mg.muffinheadGrayDarkTheme

const popPurpleLightTheme = pp.popPurpleLightTheme
const popPurpleDarkTheme = pp.popPurpleDarkTheme

const rockinRainbowLightTheme = rr.rockinRainbowLightTheme
const rockinRainbowDarkTheme = rr.rockinRainbowDarkTheme


// TODO: Finish theme design
export {
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
    rockinRainbowDarkTheme,
}

export const themeList = [
    {
        id: d.THEME_ID,
        name: "theme."+d.THEME_ID,
        pri: d.THEME_PRI_COLOR
    },
    {
        id: fy.THEME_ID,
        name: "theme."+fy.THEME_ID,
        pri: fy.THEME_PRI_COLOR
    },
    {
        id: lw.THEME_ID,
        name: "theme."+lw.THEME_ID,
        pri: lw.THEME_PRI_COLOR
    },
    {
        id: mg.THEME_ID,
        name: "theme."+mg.THEME_ID,
        pri: mg.THEME_PRI_COLOR
    },
    {
        id: pp.THEME_ID,
        name: "theme."+pp.THEME_ID,
        pri: pp.THEME_PRI_COLOR
    },
    {
        id: rr.THEME_ID,
        name: "theme."+rr.THEME_ID,
        pri: rr.THEME_PRI_COLOR
    },
]