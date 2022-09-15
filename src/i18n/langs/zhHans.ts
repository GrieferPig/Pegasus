export default {
    lang: {
        id: "zhHans",
        dispName: "简体中文 (Chinese Simplified)",
        icon: "",
        available: true,
    },
    pages: {
        Launch: {
            title: "启动"
        },
        Servers: {
            title: "服务器",
            errors: {
                error: "无法读取服务器列表：",
                reasons: {
                    cannot_open_server_dat: "无法打开服务器列表文件",
                    cannot_read_server_dat: "无法读取务器列表文件",
                    cannot_decode_server_dat: "无法解析务器列表文件",
                }
            },
            empty_server_list_1: "没有已添加的服务器。",
            empty_server_list_2: "点击下方加号添加。",
            dialog: {
                edit_server: "编辑服务器",
                add_new_server: "添加服务器",
                action_add: "添加",
                action_done: "完成",
                action_close: "关闭",
                name: "名称",
                server_ip: "服务器IP",
                port: "端口号",
                errors: {
                    required: "必填",
                    name: {
                        format_error: "名称必须为数字，字母，和指定的符号的组合",
                        too_long: "名称过长"
                    },
                    ip: {
                        wrong_port_field: "端口号应填入下方”端口“一栏",
                        invalid_ip: "无效的域名/IP地址",
                        remove_http: "请删除“http(s)://”"
                    },
                    port: {
                        must_be_numbers: "必须为数字",
                        out_of_range: "端口号超出范围(0-65535)"
                    }
                }
            },
            sb_server_added: "已添加服务器",
            sb_cannot_add_server: "由于一个错误，无法添加服务器",
            sb_server_deleted: "已删除服务器",
            sb_cannot_delete_server: "由于一个错误，无法删除服务器",
            sb_server_edited: "已编辑服务器",
            sb_cannot_edit_server: "由于一个错误，无法编辑服务器",
        },
        Versions: {
            title: "游戏版本"
        },
        Configuration: {
            title: "游戏配置"
        },
        Settings: {
            title: "设置"
        },
    },
    snackbar: {
        dismiss: "关闭"
    },
    theme: {
        default: "经典灰",
        fluffyYellow: "毛绒黄",
        lightningWhite: "闪电白",
        muffinheadGray: "小灰灰",
        popPurple: "流行紫",
        rockinRainbow: "彩虹摇滚"
    }
};