import fs from "fs";
import path from "path";

// file util wrapper for convenience

export function exist(filename: string): boolean{
    try{
        fs.accessSync(filename)
    }catch(sayonara){
        return false;
    }
    return true;
}

export function rename(filePath: string, fileName: string, newName: string){
    fs.renameSync(
        path.join(filePath,fileName),
        path.join(filePath,newName));
    return exist(path.join(filePath, newName))
}

export function createFolder(path: string): boolean{
    fs.mkdirSync(path);
    return exist(path);
}

export function createFile(filePath: string): boolean{
    if(exist(filePath)){
        return true; // file already there, ignored
    }else{
        fs.writeFileSync(filePath, "");
        return exist(filePath); // check if file created
    }
}

function _read(filePath: string): string{
    return fs.readFileSync(
        filePath, {encoding: "utf8"});
}

export function readFile(filePath: string): string{
    if(exist(filePath)){
        // if encoding not set it will return random buffer stuff
        return _read(filePath)
    }else{
        return "";
    }
}

export function readFileAsJson(filePath: string): JSON{
    let _result;
    if(exist(filePath)){
        try{
            _result = JSON.parse(_read(filePath));
        }catch (e){
            _result = JSON.parse("{}")
        }
    }else{
        _result = JSON.parse("{}");
    }
    return _result
}

export function writeFile(filePath: string, content: string): boolean{
    fs.writeFileSync(filePath, content);
    return exist(filePath);
}

export function removeFile(path: string): boolean{
    fs.unlinkSync(path);
    return !exist(path);
}

export function removeDir(path: string): boolean{
    fs.rmdirSync(path);
    return !exist(path);
}