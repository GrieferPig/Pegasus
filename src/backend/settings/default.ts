import {SORT_BYNAME} from "./LauncherProfiles";

export const guisettings: settingInterface.RootObject = {
    category: [
        {
            section: "General",
            items: [
                {
                    title: 'Test1 title.',
                    subtitle: 'switch',
                    type: 'switch',
                    data: 'false',
                    disabled: false
                },
                {
                    title: 'Test2 title.',
                    subtitle: 'button test',
                    type: 'button',
                    data: 'wait what',
                    disabled: false,
                },
                {
                    title: 'Test3 title.',
                    subtitle: 'slider test',
                    type: 'slider',
                    data: '0.7',
                    disabled: false
                },
                {
                    title: 'Test4 title.',
                    subtitle: 'dropdown test',
                    type: 'dropdown',
                    data: '',
                    disabled: false
                },
                {
                    title: 'Test5 title.',
                    subtitle: 'dropdown test',
                    type: 'dropdown',
                    data: '',
                    disabled: false
                },
                {
                    title: 'Test6 title.',
                    subtitle: 'textarea test',
                    type: 'textarea',
                    data: 'HINT TEST',
                    disabled: false
                },
            ]
        },
        {
            section: "Language",
            items: [
                {
                    title: 'Language',
                    subtitle: 'Choose the language that will be used by this launcher.',
                    type: 'dropdown',
                    data: '',
                    disabled: false
                },
                {
                    title: 'Ponify',
                    subtitle: 'Language options for bronies.',
                    type: 'switch',
                    data: 'false',
                    disabled: false,
                },
                {
                    title: 'Memify',
                    subtitle: 'Pour memes into this.',
                    type: 'switch',
                    data: 'false',
                    disabled: true
                },
            ]
        }
    ],
}

export const defaultProfile: LauncherProfiles.RootObject = {
    selectedProfile: '',
    profiles: [],
    clientToken: '',
    launcherVersion: {
        name: '',
        format: 0,
        profilesFormat: 0
    },
    settings: {
        enableSnapshots: false,
        enableAdvanced: false,
        keepLauncherOpen: false,
        showGameLog: false,
        locale: 'en-US',
        enableHistorical: false,
        profileSorting: SORT_BYNAME,
        showMenu: true,
        crashAssistance: false, // we don't offer assist on crash sry
        enableAnalytics: false // not interested of reading these
    }
}

declare module settingInterface {
    export interface RootObject {
        category: Category[]
    }

    export interface Category {
        section: string,
        items: subItem[]
    }

    export interface subItem {
        title: string,
        subtitle: string,
        type: string,
        data: any,
        disabled: boolean
    }
}