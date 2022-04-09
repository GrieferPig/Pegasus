const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// return values
const FAILED: number = -1
const SUCCESS: number = 0
const BROKEN_PIPE: number = -2

export class grabber {
    constructor() {}
    public async download(uri: string, pathTo: string):Promise<number>{
        return new Promise<number>(function(resolve){
            let _parse = uri.split("\/")
            const dest = path.join(pathTo, _parse[_parse.length-1]);
            const file = fs.createWriteStream(dest);
            if(uri.includes("http:")){
                http.get(uri, (res)=>{
                    if(res.statusCode !== 200){
                        resolve(FAILED)
                    }
                    res.on('end', ()=>{
                        resolve(SUCCESS)
                    });
                    file.on('finish', ()=>{
                        file.close();
                    }).on('error', (err)=>{
                        fs.unlink(dest);
                        resolve(BROKEN_PIPE)
                    });
                    res.pipe(file);
                });
            }else if(uri.includes("https:")){
                https.get(uri, (res)=>{
                    if(res.statusCode !== 200){
                        resolve(FAILED)
                    }
                    res.on('end', ()=>{
                        resolve(SUCCESS)
                    });
                    file.on('finish', ()=>{
                        file.close();
                    }).on('error', (err)=>{
                        fs.unlink(dest);
                        resolve(BROKEN_PIPE)
                    });
                    res.pipe(file);
                });
            }
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