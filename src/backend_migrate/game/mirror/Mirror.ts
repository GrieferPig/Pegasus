import * as Bmclapi from "./Bmclapi"
import * as Mojang from "./Mojang"

export const BMCLAPI = "bmclapi"
export const MOJANG = "mojang"

export function getVersionManifest(mirror: string): string{
    switch (mirror) {
        case BMCLAPI:
            return Bmclapi.VersionManifestPath;

        case MOJANG:
            return Mojang.VersionManifestPath;

        default:
            return Mojang.VersionManifestPath;
    }
}