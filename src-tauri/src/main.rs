#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![feature(fs_try_exists)]
#![feature(try_blocks)]

mod game_client;
mod game_manifest;
mod grabber;
mod server_dat_rw;
mod setting_mgr;

fn main() {
    setting_mgr::create_def_conf();

    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            server_dat_rw::read_server_list,
            server_dat_rw::add_server,
            server_dat_rw::del_server,
            setting_mgr::write_conf,
            setting_mgr::read_conf
        ])
        .run(context)
        .expect("error while running tauri application");
}
