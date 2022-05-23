const cp = require("child_process");
const os = require("os")

export function getJreVer(): Array<any> {
    let _return: any[] = [];
    let _returnStr;
    try{
        _returnStr = cp.spawnSync("java", ["-version"]).stderr.toString();
    }catch(RUSH_E){
        _return.push("");
        return _return;
    }
    let _version: string = _returnStr.split("\"", 2)[1];
    _return.push(_version);
    let _decodedArray = _version.split(".");
    _return.push(parseInt(_decodedArray[0]));
    _return.push(parseInt(_decodedArray[1]));
    _return.push(parseInt(_decodedArray[2]));
    return _return;
}

export function isJrePresent(): boolean{
    try{
        return cp.execSync("java --version", {encoding: "utf8"}).includes("untime");
    }catch(oops){
        return false;
    }
}

export interface OsInfo {
    platform: string,
    arch: string,
    totalMem: number,
    release: string,
    userHomeDir: string,
    cpu_count: number
}

export function getOsInfo(): OsInfo {
    const _OsInfo = {
        platform: os.platform(),
        arch: os.arch(),
        totalMem: Math.floor(os.totalmem() / 1024 / 1024), // some part of ram are hardware preserved
        release: os.release(),
        userHomeDir: os.userInfo().homedir,
        cpu_count: os.cpus().length
    }
    return (_OsInfo);
}