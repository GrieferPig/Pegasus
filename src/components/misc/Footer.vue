<template>
    <v-footer>
        <div>
            <v-divider/>
            <v-card-text>
                <strong>{{ app_name }}</strong>, version {{ app_ver }}, running Tauri {{ tauri_ver }}
                <br/>Made by <a href="https://github.com/GrieferPig">GrieferPig</a> with ❤
            </v-card-text>
        </div>
    </v-footer>
</template>

<script>
import * as tauri_app from '@tauri-apps/api/app';

const app_name = await tauri_app.getName()
const tauri_ver = await tauri_app.getTauriVersion()
const app_ver = await tauri_app.getVersion()

export default {
    name: "Footer",
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