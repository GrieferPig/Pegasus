export default {
    lang: {
        id: "en",
        dispName: "English (English)",
        icon: "",
        available: true,
    },
    pages: {
        Launch: {
            title: "Launch"
        },
        Servers: {
            title: "Servers",
            errors: {
                error: "Cannot read server list: ",
                reasons: {
                    cannot_open_server_dat: "Cannot open server.dat",
                    cannot_read_server_dat: "Cannot read server.dat",
                    cannot_decode_server_dat: "Cannot decode server.dat",
                },
                server_dat_not_found: "server.dat not found. Do you have a version of Minecraft installed?",
            },
            empty_server_list_1: "No servers added yet.",
            empty_server_list_2: "Click + below to add one.",
            dialog: {
                edit_server: "Edit Server",
                add_new_server: "Add New Server",
                action_add: "Add",
                action_done: "Done",
                action_close: "Close",
                name: "Name",
                server_ip: "Server IP",
                port: "Port",
                errors: {
                    required: "Required",
                    name: {
                        format_error: "Name can only be digits, letters, and a range of symbols",
                        too_long: "Name is too long"
                    },
                    ip: {
                        wrong_port_field: "Port number should be filled in \"Port\" field",
                        invalid_ip: "Invalid domain/IP address",
                        remove_http: "Remove \"http(s)://\""
                    },
                    port: {
                        must_be_numbers: "Must be all numbers",
                        out_of_range: "Port number out of range (0-65535)"
                    }
                }
            },
            sb_server_added: "Server Added",
            sb_cannot_add_server: "Cannot add server due to an error",
            sb_server_deleted: "Server Deleted",
            sb_cannot_delete_server: "Cannot delete server due to an error",
            sb_server_edited: "Server Edited",
            sb_cannot_edit_server: "Cannot edit server due to an error",
        },
        Versions: {
            title: "Versions"
        },
        Configuration: {
            title: "Configuration"
        },
        Settings: {
            title: "Settings"
        },
    },
    snackbar: {
        dismiss: "Dismiss",
        game_folder_not_selected: "Game folder is not selected",
        changed_game_folder: "Changed game folder",
    },
    theme: {
        default: "Default n' Classic",
        fluffyYellow: "Fluffy Yellow",
        lightningWhite: "Lightning White",
        muffinheadGray: "Muffinhead Gray",
        popPurple: "Pop Purple",
        rockinRainbow: "Rockin' Rainbow"
    }
};