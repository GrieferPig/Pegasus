export const VersionManifestPath: string = "https://bmclapi2.bangbang93.com/mc/game/version_manifest.json"

export function convertToBmclapiUri(anyManifest: JSON): JSON {
    // 极限装箱
    return JSON.parse(JSON.stringify(anyManifest)
        .replace(/launchermeta.mojang.com/g, "bmclapi2.bangbang93.com")
        .replace(/launcher.mojang.com/g, "bmclapi2.bangbang93.com")
        .replace(/resources.download.minecraft.net/g, "bmclapi2.bangbang93.com/assets")
        .replace(/libraries.minecraft.net/g, "bmclapi2.bangbang93.com/maven"));
}