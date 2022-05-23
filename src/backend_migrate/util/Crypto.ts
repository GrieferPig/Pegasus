import {readFileSync} from "fs";

const {createHash} = require("crypto");

export function genSha1(filePath: string): string{
    let hash = createHash('sha1')
    hash.update(readFileSync(filePath))
    return hash.digest('hex')
}

export function verifySha1(filePath: string, sha1: string){
    return genSha1(filePath) == sha1;
}