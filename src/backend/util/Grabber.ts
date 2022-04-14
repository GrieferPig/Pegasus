const http = require('follow-redirects').http;
const https = require('follow-redirects').https; // pretty good! thx
const fs = require('fs');
const path = require('path');
import { createWriteStream } from 'fs'
import request from 'request'
import progress from 'request-progress'

// return values
const SUCCESS: number = 0

interface progressCallBack{
    (message:string):void;
}


export class Grabber {
    constructor() {}

    /**
     *    public async download(uri: string, pathTo: string):Promise<number>{
     *         return new Promise<number>(function(resolve){
     *             let _parse = uri.split("\/")
     *             const dest = path.join(pathTo, _parse[_parse.length-1]);
     *             const file = fs.createWriteStream(dest);
     *             if(uri.includes("http:")){
     *                 http.get(uri, (res)=>{
     *                     if(res.statusCode !== 200){
     *                         resolve(FAILED)
     *                     }
     *                     res.on('end', ()=>{
     *                         resolve(SUCCESS)
     *                     });
     *                     file.on('finish', ()=>{
     *                         file.close();
     *                     }).on('error', (err)=>{
     *                         fs.unlink(dest);
     *                         resolve(BROKEN_PIPE)
     *                     });
     *                     res.pipe(file);
     *                 });
     *             }else if(uri.includes("https:")){
     *                 https.get(uri, (res)=>{
     *                     if(res.statusCode !== 200){
     *                         resolve(FAILED)
     *                     }
     *                     res.on('end', ()=>{
     *                         resolve(SUCCESS)
     *                     });
     *                     file.on('finish', ()=>{
     *                         file.close();
     *                     }).on('error', (err)=>{
     *                         fs.unlink(dest);
     *                         resolve(BROKEN_PIPE)
     *                     });
     *                     res.pipe(file);
     *                 });
     *             }
     *         })
     *     }
     */

    public async download(uri: string, pathTo:string, callback: progressCallBack): Promise<any> {
        return new Promise<any>(function (resolve) {
                let _parse = uri.split("\/")
                var dest = path.join(pathTo, _parse[_parse.length-1]);
                progress(request(uri))
                    .on('progress', state => {callback(state)})
                    .on('error', err => {resolve(err)})
                    .on('end', () => {resolve(SUCCESS)})
                    .pipe(createWriteStream(dest))
            })
    }

    public async getRaw(uri: string): Promise<string>{
        return new Promise<string>(function(resolve){
            var _tmpstr:string = "";
            if(uri.includes("http:")){
                http.get(uri, (res)=>{
                    res.on('data', (d)=>{
                        _tmpstr += d
                    });
                    res.on("end", ()=>{
                        resolve(_tmpstr)
                    })
                });
            }else if(uri.includes("https:")){
                https.get(uri, (res)=>{
                    res.on('data', (d)=>{
                        _tmpstr += d
                    });
                    res.on("end", ()=>{
                        resolve(_tmpstr)
                    })
                });
            }
        })
    }
}