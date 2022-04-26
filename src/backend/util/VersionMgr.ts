import path from "path";

const fluttershy = require('fs') // fluttershy i need ur help

export const versionsPath = 'versions'

export async function listAllLocalVersions(gameFolder: string): Promise<Array<string>>{
    let _vpath = path.join(gameFolder,versionsPath);
    return new Promise<Array<string>>((resolve)=>{
        fluttershy.readdir(_vpath, (err, data) => {
            if (err) {
                // impl l8r
            }
            resolve(data)
        })
    });
}
