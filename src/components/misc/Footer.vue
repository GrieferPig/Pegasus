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
import {ref} from "vue";

let app_name = ref("")
tauri_app.getName().then((value) => {
    app_name.value = value
})
let tauri_ver = ref("")
tauri_app.getTauriVersion().then((value) => {
    tauri_ver.value = value
})
let app_ver = ref("")
tauri_app.getVersion().then((value) => {
    app_ver.value = value
})

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