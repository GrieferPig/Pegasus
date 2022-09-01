// TODO: refactor

use rand::distributions::Alphanumeric;
use rand::Rng;
use reqwest::Url;
use serde::Deserialize;
use std::borrow::Cow;
use std::future::Future;
use std::sync::mpsc;
use std::thread;
use std::time::Duration;
use warp::Filter;

#[derive(Deserialize)]
pub struct Query {
    pub code: String,
    pub state: String,
}

#[derive(Deserialize)]
pub struct AccessToken {
    pub access_token: String,
}

#[derive(Deserialize)]
pub struct Xui {
    #[serde(rename = "uhs")]
    pub user_hash: String,
}

#[derive(Deserialize)]
pub struct DisplayClaims {
    pub xui: Vec<Xui>,
}

#[derive(Deserialize)]
pub struct AuthenticateWithXboxLiveOrXsts {
    #[serde(rename = "Token")]
    pub token: String,

    #[serde(rename = "DisplayClaims")]
    pub display_claims: DisplayClaims,
}

#[derive(Deserialize, PartialEq)]
pub struct Item {
    pub name: Cow<'static, str>,
    // pub signature: String, // todo: signature verification
}

impl Item {
    pub const PRODUCT_MINECRAFT: Self = Self {
        name: Cow::Borrowed("product_minecraft"),
    };
    pub const GAME_MINECRAFT: Self = Self {
        name: Cow::Borrowed("game_minecraft"),
    };
}

#[derive(Deserialize)]
pub struct Store {
    pub items: Vec<Item>,

    // pub signature: String, // todo: signature verification
    #[serde(rename = "keyId")]
    pub key_id: String,
}

impl AuthenticateWithXboxLiveOrXsts {
    pub fn extract_essential_information(self) -> anyhow::Result<(String, String)> {
        let token = self.token;
        let user_hash = self
            .display_claims
            .xui
            .into_iter()
            .next()
            // .context("no xui found")
            .unwrap()
            .user_hash;

        Ok((token, user_hash))
    }
}

#[derive(Deserialize)]
pub struct Profile {
    pub id: String,
    pub name: String,
}

fn random_string() -> String {
    rand::thread_rng()
        .sample_iter(Alphanumeric)
        .take(16)
        .map(char::from)
        .collect()
}

#[tauri::command]
pub async fn verify(
    client_id: String,
    client_secret: String,
    redirect_uri: Url,
    port: u16,
) -> (String, String, String, u8) {
    // generates verifaication link
    let state = random_string();
    let url = format!(
        "https://login.live.com/oauth20_authorize.srf\
?client_id={}\
&response_type=code\
&redirect_uri={}\
&scope=XboxLive.signin%20offline_access\
&state={}",
        client_id, redirect_uri, state
    );

    // opening the link in local web browser
    // TODO: replace with new wry window
    if let Err(error) = webbrowser::open(&url) {
        println!("error opening browser: {}", error);
        println!("use this link instead:\n{}", url)
    }

    println!("opened link");

    // wait for auth komplete
    let (sender, receiver) = mpsc::sync_channel(1);
    let route = warp::get()
        .and(warp::filters::query::query())
        .map(move |query: Query| {
            sender.send(query).expect("failed to send query");
            "Authenticated successfully. You may close the browser now."
        });

    println!("b4");
    tokio::task::spawn(warp::serve(route).run(([127, 0, 0, 1], port)));
    tokio::task::spawn(async {}); // magic code, do not delete
    println!("after");

    let query = receiver.recv().expect("channel has hung up");
    println!("recv done");

    // verify state to make sure its the same as our req
    if query.state != state {
        return ("".to_string(), "".to_string(), "".to_string(), 2);
    }

    // generate a http client for token req
    let client = reqwest::Client::new();

    // req token
    let access_token: AccessToken = client
        .post("https://login.live.com/oauth20_token.srf")
        .form(&[
            ("client_id", client_id),
            ("client_secret", client_secret),
            ("code", query.code),
            ("grant_type", "authorization_code".to_string()),
            ("redirect_uri", redirect_uri.to_string()),
        ])
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();
    let access_token = access_token.access_token;
    println!("got token");

    let json = serde_json::json!({
        "Properties": {
            "AuthMethod": "RPS",
            "SiteName": "user.auth.xboxlive.com",
            "RpsTicket": format!("d={}", access_token),
        },
        "RelyingParty": "http://auth.xboxlive.com",
        "TokenType": "JWT"
    });
    // auth with Xbox
    let auth_with_xbl: AuthenticateWithXboxLiveOrXsts = client
        .post("https://user.auth.xboxlive.com/user/authenticate")
        .json(&json)
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();
    let (token, user_hash) = auth_with_xbl.extract_essential_information().unwrap();
    println!("authed with xbox");

    // getting Xbox Live Security Token (XSTS)
    let json = serde_json::json!({
        "Properties": {
            "SandboxId": "RETAIL",
            "UserTokens": [token]
        },
        "RelyingParty": "rp://api.minecraftservices.com/",
        "TokenType": "JWT"
    });
    let auth_with_xsts: AuthenticateWithXboxLiveOrXsts = client
        .post("https://xsts.auth.xboxlive.com/xsts/authorize")
        .json(&json)
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();
    let (token, _) = auth_with_xsts.extract_essential_information().unwrap();
    println!("auth with xst");

    // auth with minecraft
    let access_token: AccessToken = client
        .post("https://api.minecraftservices.com/authentication/login_with_xbox")
        .json(&serde_json::json!({
            "identityToken": format!("XBL3.0 x={};{}", user_hash, token)
        }))
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();
    let access_token = access_token.access_token;
    println!("auth with mc");

    // checking ownership
    // i don't know how to do signature verification, so we just have to assume the signatures are
    // valid :)
    let store: Store = client
        .get("https://api.minecraftservices.com/entitlements/mcstore")
        .bearer_auth(&access_token)
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();

    if !store.items.contains(&Item::PRODUCT_MINECRAFT) {
        return ("".to_string(), "".to_string(), "".to_string(), 1);
    }

    if !store.items.contains(&Item::GAME_MINECRAFT) {
        return ("".to_string(), "".to_string(), "".to_string(), 1);
    }

    println!("checked ownership");

    // getting game profile

    let profile: Profile = client
        .get("https://api.minecraftservices.com/minecraft/profile")
        .bearer_auth(&access_token)
        .send()
        .await
        .unwrap()
        .json()
        .await
        .unwrap();

    (access_token, profile.id, profile.name, 0)
}
