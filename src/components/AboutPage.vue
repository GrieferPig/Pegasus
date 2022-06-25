<template>
    {{ app_name }}, version {{ app_ver }},<br/> using Tauri {{ tauri_ver }}
</template>

<script>
import * as tauri_app from '@tauri-apps/api/app';

const app_name = await tauri_app.getName()
const tauri_ver = await tauri_app.getTauriVersion()
const app_ver = await tauri_app.getVersion()

export default {
    name: "AboutPage",
    setup() {
        return {
            app_name,
            tauri_ver,
            app_ver,
        }
    }
}
</script>

<style scoped>

</style>