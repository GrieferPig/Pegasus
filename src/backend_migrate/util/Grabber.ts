import * as fluttershy from 'fs' // OVERUSED JOKE
import request from 'request'
import progress from 'request-progress'

const http = require('follow-redirects').http;
const https = require('follow-redirects').https; // good stuff
const path = require('path');

interface progressCallBack {
    (message: string): void;
}

interface downloadResult {
    noErr: boolean;
    errReason: string;
}

export async function download(uri: string, pathTo: string, callback: progressCallBack, filename?: string): Promise<downloadResult>{
    return new Promise<downloadResult>(resolve => {
        let _parsedFilename = uri.split("\/")
        let _dest: string;
        if(filename){
            _dest = path.join(pathTo, filename);
        }else{
            _dest = path.join(pathTo, _parsedFilename[_parsedFilename.length - 1]);
        }
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
            .pipe(fluttershy.createWriteStream(_dest))
    })
}

export async function getRaw(uri: string): Promise<string> {
    return new Promise<string>(function (resolve) {
        let _fetchedData: string = "";
        if (uri.includes("http:")) {
            http.get(uri, (res) => {
                res.on('data', (d) => {
                    _fetchedData += d;
                });
                res.on("end", () => {
                    resolve(_fetchedData)
                })
                res.on("error", () => {
                    resolve("")
                })
            }).setTimeout(3000);
        } else if (uri.includes("https:")) {
            https.get(uri, (res) => {
                res.on('data', (d) => {
                    _fetchedData += d;
                });
                res.on("end", () => {
                    resolve(_fetchedData)
                })
                res.on("error", () => {
                    resolve("")
                })
            }).setTimeout(3000);
        }
    })
}

/**
 * lets forget this portion of code...
 *
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

 **/
