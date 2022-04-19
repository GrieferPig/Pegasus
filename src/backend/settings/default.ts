import {SORT_BYNAME} from "./LauncherProfiles";

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