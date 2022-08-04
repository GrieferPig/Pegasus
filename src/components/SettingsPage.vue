<template>
    <v-btn @click="setGameFolderWithDialog">Set Game Folder</v-btn>
    Current Game Folder is {{ currentGameFolder }}
</template>

<script>
import { message, open } from '@tauri-apps/api/dialog';
import { appDir } from '@tauri-apps/api/path';

import { readConf, writeConf } from "../utils/SettingMgr";

export default {
    name: "SettingsPage",
    data() {
        return {
        }
    },
    computed: {
        currentGameFolder() {
            return this.conf.globalGameSettings.selectedGameDir
        }
    },
    methods: {
        async setGameFolderWithDialog() {
            const selected = await open({
                directory: true,
                multiple: false,
                defaultPath: await appDir(),
            });
            if (selected === null) {
                await message('Game Folder Not Selected', { title: 'Pegasus', type: 'error' });
            } else {
                this.conf.globalGameSettings.selectedGameDir = selected
            }
            console.log(this.conf.globalGameSettings.selectedGameDir)
        }
    }
}

async function oops() {
    console.log(await readConf())
}
oops()
</script>

<style scoped>
.item-subline {
    width: 90%;
    margin-top: -8px;
    margin-left: 15px;
}
</style>