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
