const cp = require("child_process");
const os = require("os")

export async function getJreInfo(): Promise<Array<any>> {
    return new Promise<Array<any>>(function (resolve) {
        var _return: any[] = []
        cp.exec("java -version", function (err, stdout, stderr) {
            if (err) {
                _return.push("")
            } else {
                let _version: string = stderr.split("\"", 2)[1] // wait what
                _return.push(_version)
                let _decodedArray = _version.split(".")
                _return.push(parseInt(_decodedArray[0]))
                _return.push(parseInt(_decodedArray[1]))
                _return.push(parseInt(_decodedArray[2]))
            }
            resolve(_return)
        });
    })
}

export async function isJrePresent() {
    return new Promise<boolean>(function (resolve) {
        cp.exec("java", function (err, stdout, stderr) {
            resolve(stderr.includes("-help"));
        })
    });
}

export interface OsInfo {
    platform: string,
    arch: string,
    totalMem: number,
    release: string,
    userHomeDir: string,
    cpu_count: number
}

export async function getOsInfo(): Promise<OsInfo> {
    const _OsInfo = {
        platform: os.platform(),
        arch: os.arch(),
        totalMem: Math.floor(os.totalmem() / 1024 / 1024), // some part of ram are hardware preserved
        release: os.release(),
        userHomeDir: os.userInfo().homedir,
        cpu_count: os.cpus().length
    }
    return (_OsInfo)
}
