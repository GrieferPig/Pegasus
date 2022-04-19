declare module GameFolderLayout {

    export interface assets { // game asset
        indexes: indexes
        objects: objects
        skins: skins
    }

    export interface indexes {
        path: string
    }

    export interface objects {
        path: string
    }

    export interface skins {
        path: string
    }

    export interface libraries { // lib for game
        path: string
    }

    export interface versions { // lib for game
        path: string
    }

    export interface RootObject {
        assets: assets
        config: config
        versions: versions
    }

}

