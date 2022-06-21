<template>
  <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
      title="Place Holder"
  ></v-list-item>
  <v-divider></v-divider>
  <v-list color="transparent" density="compact">
    <v-list-item  v-for="(item, i) in items"
                  :key="i"
                  :value="item"
                  :active="item.selected"
                  active-color="secondary"
                  @click="navClick(item, i)">
      <v-list-item-avatar left>
        <v-icon :icon="item.icon"></v-icon>
      </v-list-item-avatar>
      <v-list-item-title v-text="item.text"></v-list-item-title>
    </v-list-item>
  </v-list>

</template>

<script>
export default {
  name: "NavDrawer",
  data() {
    return {
      items: [
        {
          text: 'Launch',
          icon: 'mdi-send',
          selected: true
        },
        {
          text: 'Versions',
          icon: 'mdi-format-list-bulleted',
          selected: false
        },
        {
          text: 'Configuration',
          icon: 'mdi-wrench',
          selected: false
        },
        {
          text: 'Settings',
          icon: 'mdi-cog',
          selected: false
        },
      ]
    }
  },methods: {
    async navClick(item, i){
      let x;
      this.$parent.$parent.$parent.$parent.switchPage(item.text) //hax
      this.$parent.$parent.$parent.$parent.appTitle = item.text;
      for(x in this.$data.items){
        this.$data.items[x].selected =  false; //why it returns an array
      }
      item.selected = true;
    }
  }
}
</script>

<style scoped>

</style>