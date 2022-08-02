#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![feature(fs_try_exists)]

mod grabber;
mod server_dat_reader;
mod setting_mgr;

fn main() {
    setting_mgr::create_def_conf();

    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            server_dat_reader::read_server_list,
            setting_mgr::write_conf,
            setting_mgr::read_conf
        ])
        .run(context)
        .expect("error while running tauri application");
}
