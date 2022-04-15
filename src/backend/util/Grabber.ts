const http = require('follow-redirects').http;
const https = require('follow-redirects').https; // pretty good! thx
const path = require('path');
import {createWriteStream} from 'fs'
import request from 'request'
import progress from 'request-progress'

// return values
const SUCCESS: number = 0

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
            });
        } else if (uri.includes("https:")) {
            https.get(uri, (res) => {
                res.on('data', (d) => {
                    _tmpstr += d
                });
                res.on("end", () => {
                    resolve(_tmpstr)
                })
            });
        }
    })
}
