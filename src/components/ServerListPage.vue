<template>
    <v-btn-group id="op-btn-group">
        <v-btn @click="openAddServerDialog" class="op-btns" :disabled="error" icon="mdi-plus" size="large" />
        <v-btn @click="getServerList" class="op-btns" icon="mdi-refresh" size="large" />
    </v-btn-group>
    <v-list subheader two-line>
        <v-list-subheader inset="">Servers</v-list-subheader>
        <v-list-item v-if="!error" v-for="(server, index) in server_list" :key="server.name" :subtitle="server.ip"
            :title="server.name">
            <template v-slot=append>
                <v-btn-group>
                    <v-btn icon="mdi-delete" @click="deleteServer(index)"></v-btn>
                    <v-btn icon="mdi-pencil"></v-btn>
                </v-btn-group>
            </template>
        </v-list-item>
        <v-label v-if="error">Cannot read server list file: <br />{{ error_reason }}</v-label>
    </v-list>

    <v-dialog v-model="dialog" persistent>
        <v-card>
            <v-card-title v-if="dialog_edit">Edit Server</v-card-title>
            <v-card-title v-else>Add New Server</v-card-title>
            <v-card-item>
                <v-form ref="form" v-model="valid" lazy-validation style="width: 250px">
                    <v-text-field v-model="name" label="Name" required variant="underlined" :rules="nameRules">
                    </v-text-field>
                    <v-text-field v-model="server_ip" label="Server IP" required variant="underlined"
                        :rules="serverIpRules"></v-text-field>
                    <v-text-field v-model="server_port" label="Port" required variant="underlined"
                        :rules="serverPortRules">
                    </v-text-field>
                </v-form>
            </v-card-item>
            <v-card-actions>
                <v-btn color="primary" @click="dialog = false">Close</v-btn>
                <v-btn color="primary" @click="addServer">{{ form_action }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { invoke } from "@tauri-apps/api/tauri";

export default {
    name: "ServerListPage",
    data() {
        return {
            error: false,
            error_reason: "",
            server_list: [{ icon: null, ip: "", name: "" }],

            dialog: false,
            dialog_edit: false,

            name: "",
            server_ip: "",
            server_port: 25565,

            valid: false,
            nameRules: [
                v => !!v || 'Required',
                v => /^[\da-zA-Z\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\"\<\>\?\`\-\=\[\]\\\;\'\,\.\/]+$/.test(v) || 'Name can only be digits, letters, and a range of symbols',
                v => /^.{0,32}$/.test(v) || 'Name is too long'
            ],
            serverIpRules: [
                v => !!v || 'Required',
                v => v.split(":").length - 1 !== 1 || 'Port number should be filled in "Port" field',
                v => /^[\da-zA-Z:\-_.]+$/.test(v) || 'Invalid domain/IP address',
                v => v.split('http').length - 1 !== 1 || 'Remove "http(s)://""'
            ],
            serverPortRules: [
                v => !!v || 'Required',
                v => /\d/.test(v) || 'Must be all numbers',
                v => /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/.test(v) || 'Port number out of range (0-65535)'
            ],
            form_action: ""
        }
    },
    methods: {
        async getServerList() {
            let list = await invoke('read_server_list', {
                path: this.conf.globalGameSettings.selectedGameDir + "/servers.dat"
            })
            console.log(list)
            // console.log(list)
            if (list[0].ip === "error") {
                this.error = true;
                this.error_reason = list[0].name;
                return null;
            }
            this.error = false;
            this.server_list = list
        },
        openAddServerDialog() {
            this.name = "",
                this.server_ip = "",
                this.dialog = true;
            this.dialog_edit = false;
            this.server_port = 25565
            this.form_action = "Add"
        },
        async addServer() {
            if (!(await this.$refs.form.validate()).valid) {
                return;
            }
            let error = await invoke('add_server', {
                path: this.conf.globalGameSettings.selectedGameDir + "/servers.dat",
                data: {
                    icon: null,
                    ip: this.server_ip + ":" + this.server_port,
                    name: this.name
                }
            })
            console.log(error)
            if (error !== "ok") {
                this.showSnackBar(4000, "Cannot add server due to an error", "Dismiss")
                return;
            }
            this.showSnackBar(4000, "Server Added", "Dismiss")
            this.getServerList()
            this.dialog = false
        },
        async deleteServer(index) {
            let error = await invoke('del_server', {
                path: this.conf.globalGameSettings.selectedGameDir + "/servers.dat",
                index: index
            })
            console.log(error)
            if (error !== "ok") {
                this.showSnackBar(4000, "Cannot delete server due to an error", "Dismiss")
                return;
            }
            this.showSnackBar(4000, "Server Deleted", "Dismiss")
            this.getServerList()
        }
    },
    mounted() {
        this.getServerList()
    }
}
</script>

<style scoped>
.v-label {
    margin-left: 15px;
}

#op-btn-group {
    position: fixed;
    bottom: 15px;
    right: 15px;

}

.op-btns {
    color: white;
    background-color: rgb(var(--v-theme-secondary));
}
</style>