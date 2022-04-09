const cp = require("child_process");
const os = require("os")
/**
 *     public async getRaw(uri: string): Promise<number>{
 *         return new Promise<number>(function(resolve){
 *             resolve(0)
 *         })
 *     }
 */

export class DetectEnv {
    constructor() {
    }

    public async getJreInfo(): Promise<Array<any>> {
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

    public async isJrePresent(): Promise<boolean> {
        return new Promise<boolean>(function (resolve) {
            cp.exec("java", function (err, stdout, stderr) {
                if (stderr.includes("-help")) { // maybe -help is universal among every jre distro
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    public async getOsInfo(): Promise<any>{
        return new Promise<any>(function(resolve){
            const _OsInfo = {
                platform: os.platform(),
                arch: os.arch(),
                totalMem: Math.floor(os.totalmem()/1024/1024), // some part of ram are hardware preserved
                release: os.release(),
                userHomeDir: os.userInfo().homedir,
                cpu_count: os.cpus().length
            }
            resolve(_OsInfo)
        })
    }
}

