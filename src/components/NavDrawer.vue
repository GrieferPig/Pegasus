<template>
  <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
      title="Place Holder"
  ></v-list-item>
  <v-divider></v-divider>
  <v-list color="transparent" density="compact">
    <v-list-item  v-for="(item, i) in items"
                  :key="i"
                  :value="item">
      <v-list-item-avatar left>
        <v-icon :icon="item.icon"></v-icon>
      </v-list-item-avatar>
      <v-list-item-title v-text="item.text"></v-list-item-title>
    </v-list-item>
  </v-list>

</template>

<script>
import {ref} from "vue";

export default {
  name: "NavDrawer",
  data() {
    return {
      items: [
        {
          text: 'Test',
          icon: 'mdi-clock',
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>