const cp = require("child_process");

export const detectJre = function(){
    return new Promise(function(resolve,reject){
        var _return : any[] = []
        cp.exec("java -version",function(err,stdout,stderr){
            if(err){
                _return.push("")
            }else{
                let _version : string = stderr.split("\"",2)[1] // wait what
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


export const isJrePresent = function(){
    return new Promise(function(resolve,reject){
        cp.exec("jav a",function(err,stdout,stderr){
            if(stderr.includes("-help")){ // maybe -help is universal among every jre distro
                resolve(true)
            }else{
                resolve(false)
            }
        });
    })
}