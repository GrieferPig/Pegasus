<template>
    <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
            title="Place Holder"
    ></v-list-item>
    <v-divider></v-divider>
    <v-list color="transparent" density="compact">
        <v-list-item v-for="(item, i) in items"
                     :key="i"
                     :active="item.selected"
                     :value="item"
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
    emits: ['onNavClick'],
    methods: {
        navClick(pageName, i) {
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].selected = false
            }
            this.items[i].selected = true
            this.$emit('onNavClick', pageName.text)
        }
    },
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
    },
}
</script>

<style scoped>

</style>