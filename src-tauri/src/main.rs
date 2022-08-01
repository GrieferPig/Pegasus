#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod server_dat_reader;
mod grabber;
mod setting_mgr;

fn main() {
    setting_mgr::create_def_conf().expect("oops");
    //let context = tauri::generate_context!();
    //tauri::Builder::default()
    //    .invoke_handler(tauri::generate_handler![server_dat_reader::read_server_list])
    //    .run(context)
    //    .expect("error while running tauri application");
}
