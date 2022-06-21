<template>
  <v-list>
    <v-btn>REFRESH</v-btn>
    <v-list-subheader>Installed Versions</v-list-subheader>
    <v-list-subheader>No valid installed versions detected.</v-list-subheader>
    <v-list-item
        v-for="(games, i) in gameList"
        :key="i"
        :value="games"
        active-color="primary"
        rounded="s"
    >
      <v-list-item-title v-text="games"></v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
let gameList: string[] = []
export default {
  name: "VersionsPage",
  data() {
    return {
      gameList
    }
  }
}
</script>

<style scoped>

</style>