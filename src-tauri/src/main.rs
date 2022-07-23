#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .invoke_handler(tauri::generate_handler![my_custom_command])
        .run(context)
        .expect("error while running tauri application");
}

#[tauri::command]
fn my_custom_command() {
    println!("I was invoked from JS!");
}
