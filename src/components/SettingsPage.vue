<template>
  <v-btn @click="setGameFolderWithDialog">Set Game Folder</v-btn>
  Current Game Folder is {{ currentGameFolder }}

  <v-select
  v-model="selectLocale"
  :items="allLocales"
  item-title="dispName"
  item-disabled="available"
  item-value="id"
  return-object
  single-line
  ></v-select>
</template>

<script>
import {message, open} from '@tauri-apps/api/dialog';
import {appDir} from '@tauri-apps/api/path';

import {findLangById, getAllLocales} from "../i18n/lang";

export default {
  name: "SettingsPage",
  data() {
    let currentLang = findLangById(this.conf.launcherSettings.lang)
    const allLocales = getAllLocales()
    console.log(currentLang, allLocales)
    return {
      allLocales: allLocales,
      selectLocale: {id: currentLang.lang.id, dispName: currentLang.lang.dispName, available: currentLang.lang.available}
    }
  },
  computed: {
    currentGameFolder() {
      return this.conf.globalGameSettings.selectedGameDir
    },
  },
  watch: {
    selectLocale(n, o) {
      console.log(n)
      this.$store.commit("changeLang", [n.id, this])
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
        await message('Game Folder Not Selected', {title: 'Pegasus', type: 'error'});
      } else {
        this.conf.globalGameSettings.selectedGameDir = selected
      }
      console.log(this.conf.globalGameSettings.selectedGameDir)
    }
  }
}
</script>

<style scoped>
.item-subline {
  width: 90%;
  margin-top: -8px;
  margin-left: 15px;
}
</style>