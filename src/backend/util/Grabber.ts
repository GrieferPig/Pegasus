import {createWriteStream, readFileSync} from 'fs'
import request from 'request'
import progress from 'request-progress'
import * as Bmclapi from "../mirror/Bmclapi";
import * as Mojang from "../mirror/Mojang";
import {toJson} from "../util/JsonUtil";

const http = require('follow-redirects').http;
const http_orig = require('http')
const https = require('follow-redirects').https; // pretty good! thx
const path = require('path');

import Vm = VersionManifest.RootObject;
import Gm = GameManifest.RootObject;
import {fsReadFile} from "ts-loader/dist/utils"; // aka G minor

// return values
const SUCCESS: number = 0
const ERROR: number = -1

interface progressCallBack {
    (message: string): void;
}

interface downloadResult {
    noErr: boolean;
    errReason: string;
}

export async function download(uri: string, pathTo: string, callback: progressCallBack): Promise<downloadResult>{
    return new Promise<downloadResult>(resolve => {
        let _parse = uri.split("\/")
        let dest = path.join(pathTo, _parse[_parse.length - 1]);
        progress(request(uri),{delay: 500})
            .on('progress', state => {
                callback(state)
            })
            .on('error', err => {
                resolve({noErr: false, errReason: err} as downloadResult)
            })
            .on('end', () => {
                resolve({noErr: true, errReason: ""} as downloadResult)
            })
            .pipe(createWriteStream(dest))
    })
}

export async function getRaw(uri: string): Promise<string> {
    return new Promise<string>(function (resolve) {
        let _tmpstr: string = "";
        if (uri.includes("http:")) {
            http.get(uri, (res) => {
                res.on('data', (d) => {
                    _tmpstr += d
                });
                res.on("end", () => {
                    resolve(_tmpstr)
                })
                res.on("error", () => {
                    resolve(ERROR.toString())
                })
            }).setTimeout(3000);
        } else if (uri.includes("https:")) {
            https.get(uri, (res) => {
                res.on('data', (d) => {
                    _tmpstr += d
                });
                res.on("end", () => {
                    resolve(_tmpstr)
                })
                res.on("error", () => {
                    resolve(ERROR.toString())
                })
            }).setTimeout(3000);
        }
    })
}

export async function isInChinaMainland() {
    return await testNetwork('google.com') // 咕噜咕噜
}

export async function isConnectedToNetwork() {
    return await testNetwork('1.1.1.1') // cloudsdale's dns webpage
}

export async function testNetwork(uri: string){
    let options = {
        host: uri, // you cannot include protocol in uri
        port: 80,
        path: '/'
    };
    return new Promise<boolean>((resolve, reject)=>{
        let req = http_orig.get(options, function (res) {
            setTimeout(function () {
                reject(false)
                res.destroy();
            }, 2000);

            res.on('data', function () {
                resolve(true)
                res.destroy()
            });
        });
        req.on('error', function () {
            resolve(false)
        });
    });
}

// game res related

export const BMCLAPI: string = 'bmclapi';
export const MOJANG: string = 'mojang';

export async function fetchVersions(mirror: string){
    switch (mirror){
        case BMCLAPI:
            return await toJson(await getRaw(Bmclapi.VersionManifestPath)) as unknown as Vm
        default:
            return await toJson(await getRaw(Mojang.VersionManifestPath)) as unknown as Vm
    }
}

export async function getLatestVersionManifest(manifest: Vm){
    return await toJson(await getRaw(Bmclapi.getGameManifestPath(manifest.latest.release, Bmclapi.JSON))) as unknown as Gm
}

const {createHash} = require("crypto");
export async function verifySHA1(filePath: string): Promise<string>{
    let hash = createHash('sha1')
    hash.update(readFileSync(filePath))
    return hash.digest('hex')
}
