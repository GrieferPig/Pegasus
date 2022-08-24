import { tauri } from "@tauri-apps/api"

const CLIENT_ID = "5b3fb57a-6470-4cc6-95c0-63b365a6792c"
const CLIENT_SECRET = "2ih8Q~ZQrCDyiG_Npl2uV63tAdHI51LKA1OLRbnr"

export async function verify() {
    return await tauri.invoke("verify", { clientId: CLIENT_ID, clientSecret: CLIENT_SECRET, redirectUri: "http://localhost", port: 80 })
}

export default {
    CLIENT_ID,
    CLIENT_SECRET
}