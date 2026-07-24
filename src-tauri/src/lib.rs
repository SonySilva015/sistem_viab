use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct DashboardData {
    pub message: String,
    pub status: String,
    pub timestamp: String,
}

#[tauri::command]
fn get_hello_message() -> DashboardData {
    DashboardData {
        message: "Olá Mundo vindo direto do Rust!".to_string(),
        status: "Online (Rust Native)".to_string(),
        timestamp: "2026-07-25".to_string(),
    }
}

#[tauri::command]
fn somar_valores(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_hello_message,
            somar_valores
        ])
        .run(tauri::generate_context!())
        .expect("erro ao executar a aplicação tauri");
}