// use serde::Deserialize;
// use serde_json::Map;
// use std::any::Any;

pub struct GameClient {
    pub name: String,
    pub version: String,
    pub is_mod: bool,
    pub mod_type: ModType,
    pub mod_list: Vec<Mods>,
}

// TODO: Add Mods Impl
pub struct Mods {}

pub enum ModType {
    Vanilla,
    Forge,
    Fabric,
    Liteloader,
}

impl GameClient {
    fn launch(&self) {
        // TODO: Impl
    }

    fn is_valid(&self) -> bool {
        // TODO: Impl
        true
    }
}

const VERSION_DIR: &str = "versions";

impl GameClient {
    fn scan_game_root(game_root: String) -> Vec<GameClient> {
        // TODO: Impl
        vec![GameClient {
            name: String::from("114514"),
            version: String::from("1919810"),
            is_mod: false,
            mod_type: ModType::Vanilla,
            mod_list: vec![Mods {}],
        }]
    }
}

// It is dead thanks to any[]

// #[derive(Deserialize, Debug)]
// pub struct ClientJson {
//     arguments: Arguments,
// }

// #[derive(Deserialize, Debug)]
// pub struct Arguments {
//     game: Vec<dyn Any>,
//     jvm: Vec<PossibleJvmArgumentTypes>,
// }

// #[derive(Deserialize, Debug)]
// pub struct PossibleGameArgumentTypes(Vec<String>, Map<String, serde_json::Value>);

// #[derive(Deserialize, Debug)]
// pub struct GameConditionalArguments {
//     rules: Vec<GameConditionalArgumentsRules>,
//     value: Vec<String>,
// }

// #[derive(Deserialize, Debug)]
// pub struct GameConditionalArgumentsRules {
//     action: String,
//     features: GameConditionalArguments,
// }

// #[derive(Deserialize, Debug)]
// pub struct GameConditionalArgumentsFeatures {
//     is_demo_user: Option<bool>,
//     has_custom_resolution: Option<bool>,
// }

// #[derive(Deserialize, Debug)]
// pub enum PossibleJvmArgumentTypes {
//     JvmConditionalArguments,
//     String,
// }

// #[derive(Deserialize, Debug)]
// pub struct JvmConditionalArguments {
//     rules: Vec<JvmConditionalArgumentsRules>,
//     value: Vec<String>,
// }

// #[derive(Deserialize, Debug)]
// pub struct JvmConditionalArgumentsRules {
//     action: String,
//     os: JvmConditionalArgumentsOs,
// }

// #[derive(Deserialize, Debug)]
// pub struct JvmConditionalArgumentsOs {
//     // oh these strings are regex nvm
//     name: Option<String>,    // "osx", "windows"
//     version: Option<String>, // "^10\\."
//     arch: Option<String>,    // "x86"
// }

/**
 * Windows 	%APPDATA%\.minecraft
 * macOS 	~/Library/Application Support/minecraft
 * Linux 	~/.minecraft
 **/

fn todo() {
    // gj rustc this todo doesn't do anything
    // try remove this function and compile
}
