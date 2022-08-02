<template>
    <v-btn @click="getServerList">Read server list</v-btn>
    <v-list
        subheader
        two-line
    >
        <v-list-subheader inset="">Servers</v-list-subheader>

        <v-list-item
            v-for="server in server_list"
            :key="server.name"
            :subtitle="server.ip"
            :title="server.name">
        </v-list-item>
    </v-list>
</template>

<script>
import {invoke} from "@tauri-apps/api/tauri";
import {ref} from "vue";

let error = ref(false);
let error_reason = ref("");
let server_list = ref([{icon: null, ip: "", name: ""}])

export default {
    name: "ServerListPage",
    setup() {
        return {
            error,
            error_reason,
            server_list,
        }
    },
    methods: {
        getServerList
    },
    mounted() {
        setTimeout(getServerList(), 300)
    }
}

async function getServerList() {
    let list = await invoke('read_server_list', {
        path: this.$store.state.conf.globalGameSettings.selectedGameDir + "/servers.dat"
    })
    if (list[0].ip === "error") {
        error.value = true;
        error_reason.value = list[0].name;
        return null;
    }
    server_list.value = list
}
</script>

<style scoped>

</style>