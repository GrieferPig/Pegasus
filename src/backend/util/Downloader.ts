const http = require('http');
const fs = require('fs');
const path = require('path');

// return values
const FAILED: number = -1
const SUCCESS: number = 0
const BROKEN_PIPE: number = -2

export const download = function (uri: string, pathTo: string) {
    return new Promise(function(resolve){
        let _parse = uri.split("\/")
        console.log(_parse[_parse.length-1])
        const dest = path.join(pathTo, _parse[_parse.length-1]);
        const file = fs.createWriteStream(dest);
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
    })
}

