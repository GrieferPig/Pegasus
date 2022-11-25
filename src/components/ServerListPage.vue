<template>
    <v-btn-group id="op-btn-group">
        <v-btn :disabled="error" class="op-btns" icon="mdi-plus" size="large" @click="openAddServerDialog"/>
        <v-btn class="op-btns" icon="mdi-refresh" size="large" @click="getServerList"/>
    </v-btn-group>
    <v-list subheader two-line>
        <v-list-subheader inset="">{{ $t('pages.Servers.title') }}</v-list-subheader>
        <div :v-if="!isServerListEmpty">
            <v-list-item v-for="(server, index) in server_list" v-if="!error" :key="server.name" :subtitle="server.ip"
                         :title="server.name">
                <template v-slot=append>
                    <v-btn-group>
                        <v-btn icon="mdi-delete" @click="deleteServer(index)"></v-btn>
                        <v-btn icon="mdi-pencil" @click="openEditServerDialog(index)"></v-btn>
                    </v-btn-group>
                </template>
            </v-list-item>
        </div>
        <v-label v-if="error">{{ $t("pages.Servers.errors.error") }} <br/>{{
                $t("pages.Servers.errors.reasons." + error_reason)
            }}
        </v-label>
        <v-label v-if="server_dat_not_found">{{ $t("pages.Servers.errors.server_dat_not_found") }}
        </v-label>
        <v-label v-if="isServerListEmpty">{{ $t("pages.Servers.empty_server_list_1") }}<br/>{{
                $t("pages.Servers.empty_server_list_2")
            }}
        </v-label>
    </v-list>

    <v-dialog v-model="dialog" persistent>
        <v-card>
            <v-card-title v-if="dialog_edit">{{ $t("pages.Servers.dialog.edit_server") }}</v-card-title>
            <v-card-title v-else>{{ $t("pages.Servers.dialog.add_new_server") }}</v-card-title>
            <v-card-item style="padding-top: 0;">
                <VSpacer style="height: 20px"/>
                <v-form ref="form" v-model="valid" lazy-validation style="width: 250px;margin-top: 10px">
                    <v-text-field v-model="name" :label="$t('pages.Servers.dialog.name')" :rules="nameRules" required
                                  variant="underlined">
                    </v-text-field>
                    <v-text-field v-model="server_ip" :label="$t('pages.Servers.dialog.server_ip')" :rules="serverIpRules"
                                  required variant="underlined"></v-text-field>
                    <v-text-field v-model="server_port" :label="$t('pages.Servers.dialog.port')" :rules="serverPortRules"
                                  required variant="underlined">
                    </v-text-field>
                </v-form>
            </v-card-item>
            <v-card-actions>
                <v-btn color="primary" @click="dialog = false">{{ $t("pages.Servers.dialog.action_close") }}</v-btn>
                <v-btn color="primary" v-if="!dialog_edit" @click="addServer">{{ $t(form_action) }}</v-btn>
                <v-btn color="primary" v-else @click="editServer">{{ $t(form_action) }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
<!--    <v-btn @click="dbg">is empty</v-btn>-->
</template>

<script>
import {invoke} from "@tauri-apps/api/tauri";

export default {
    name: "ServerListPage",
    data() {
        return {
            error: false,
            error_reason: "",
            server_list: [],

            server_dat_not_found: false,

            dialog: false,
            dialog_edit: false,

            name: "",
            server_ip: "",
            server_port: 25565,

            edit_index: 0,

            valid: false,
            nameRules: [
                v => !!v || this.d('required'),
                v => /^[\da-zA-Z\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\"\<\>\?\`\-\=\[\]\\\;\'\,\.\/]+$/.test(v) || this.d('name.format_error'),
                v => /^.{0,32}$/.test(v) || this.d('name.too_long')
            ],
            serverIpRules: [
                v => !!v || this.d('required'),
                v => v.split(":").length - 1 !== 1 || this.d('ip.wrong_port_field'),
                v => /^[\da-zA-Z:\-_.]+$/.test(v) || this.d('ip.invalid_ip'),
                v => v.split('http').length - 1 !== 1 || this.d('ip.remove_http')
            ],
            serverPortRules: [
                v => !!v || this.d('required'),
                v => /\d/.test(v) || this.d('port.must_be_numbers'),
                v => /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/.test(v) || this.d('port.out_of_range')
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
            if (list.length === 0) {
                // uh what should i do here
            } else if (list[0].ip === "error") {
                this.error = true;
                this.error_reason = list[0].name;
                this.server_list = list
                if (this.error_reason === "cannot_open_server_dat"){
                    this.error = false;
                    this.server_dat_not_found = true;
                    this.server_list = []
                }
                return null;
            }
            this.error = false;
            this.server_list = list
        },
        openAddServerDialog() {
            this.name = "";
            this.server_ip = "";
            this.dialog = true;
            this.dialog_edit = false;
            this.server_port = 25565
            this.form_action = "pages.Servers.dialog.action_add"
        },
        openEditServerDialog(index) {
            let _server = this.server_list[index].ip.split(":")
            console.log(_server)
            this.name = this.server_list[index].name;
            this.server_ip = _server[0];
            this.dialog = true;
            this.dialog_edit = true;
            this.server_port = _server[1]
            this.form_action = "pages.Servers.dialog.action_done"
            this.edit_index = index;
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
                this.showSnackBar(4000, this.$t("pages.Servers.sb_cannot_add_server"), this.$t("snackbar.dismiss"))
                return;
            }
            this.showSnackBar(4000, this.$t("pages.Servers.sb_server_added"), this.$t("snackbar.dismiss"))
            await this.getServerList()
            this.dialog = false
        },
        async editServer() {
            if (!(await this.$refs.form.validate()).valid) {
                return;
            }
            let error = await invoke('del_server', {
                path: this.conf.globalGameSettings.selectedGameDir + "/servers.dat",
                index: this.edit_index
            })
            console.log(error)
            if (error !== "ok") {
                this.showSnackBar(4000, this.$t("pages.Servers.sb_cannot_edit_server"), this.$t("snackbar.dismiss"))
                return;
            }
            await this.getServerList()
            let error1 = await invoke('add_server', {
                path: this.conf.globalGameSettings.selectedGameDir + "/servers.dat",
                data: {
                    icon: null,
                    ip: this.server_ip + ":" + this.server_port,
                    name: this.name
                }
            })
            console.log(error1)
            if (error1 !== "ok") {
                this.showSnackBar(4000, this.$t("pages.Servers.sb_cannot_edit_server"), this.$t("snackbar.dismiss"))
                return;
            }
            this.showSnackBar(4000, this.$t("pages.Servers.sb_server_edited"), this.$t("snackbar.dismiss"))
            await this.getServerList()
            this.dialog = false
        },
        async deleteServer(index) {
            let error = await invoke('del_server', {
                path: this.conf.globalGameSettings.selectedGameDir + "/servers.dat",
                index: index
            })
            console.log(error)
            if (error !== "ok") {
                this.showSnackBar(4000, this.$t("pages.Servers.sb_cannot_delete_server"), this.$t("snackbar.dismiss"))
                return;
            }
            this.showSnackBar(4000, this.$t("pages.Servers.sb_server_deleted"), this.$t("snackbar.dismiss"))
            await this.getServerList()
        },
        d(waibibabu) { // short for dialogGetTranslation
            return this.$t("pages.Servers.dialog.errors." + waibibabu)
        },
        dbg() {
            console.log(this.isServerListEmpty, this.server_list)
        }
    },
    async mounted() {
        await this.getServerList()
    },
    computed: {
        isServerListEmpty() {

            return (!this.server_dat_not_found) && (this.server_list.length === 0)
        }
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