import {createWriteStream} from 'fs'
import request from 'request'
import progress from 'request-progress'

const http = require('follow-redirects').http;
const http2 = require('http2')
const https = require('follow-redirects').https; // pretty good! thx
const path = require('path');

// return values
const SUCCESS: number = 0

const _test_uri = "http://google.com"
const ERROR: number = -1

interface progressCallBack {
    (message: string): void;
}

export async function download(uri: string, pathTo: string, callback: progressCallBack): Promise<any> {
    return new Promise<any>(function (resolve) {
        let _parse = uri.split("\/")
        let dest = path.join(pathTo, _parse[_parse.length - 1]);
        progress(request(uri))
            .on('progress', state => {
                callback(state)
            })
            .on('error', err => {
                resolve(err)
            })
            .on('end', () => {
                resolve(SUCCESS)
            })
            .pipe(createWriteStream(dest))
    })
}

export async function getRaw(uri: string): Promise<string> {
    return new Promise<string>(function (resolve, reject) {
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
            }).setTimeout(3000);;
        }
    })
}

export async function isInChinaMainland() {
    return new Promise<boolean>((resolve)=>{
        // hack found on stackexchange
        const client = http2.connect('https://www.google.com');
        client.setTimeout(3000)
        client.on('connect', () => {
            client.destroy();
            resolve(true);
            console.log(client.destroyed)
        });
        client.on('timeout', () => {
            client.close();
            resolve(false);
            console.log(client.closed)
        });
    })
}
