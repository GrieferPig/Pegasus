import * as GetEnv from "./util/GetEnv";

function testGetEnv(){
    console.log(GetEnv.getOsInfo())
    console.log(GetEnv.getJreVer())
    console.log(GetEnv.isJrePresent())
}

testGetEnv()

let _userDir = GetEnv.getOsInfo().userHomeDir

import * as File from "./util/File"
const path = require("path")
let filepath = path.join(_userDir, "test.txt");

function testFile(){
    console.log(File.createFile(filepath));
    console.log(File.writeFile(filepath, "pinkie & izzy my favorite wat"));
    console.log(File.readFile(filepath));
    console.log(File.createFolder(path.join(_userDir, "test")));
    console.log(File.rename(_userDir, "test", "test1"));
    console.log(File.exist(path.join(_userDir, "test1")));
    console.log(File.removeDir(path.join(_userDir, "test1")));
    console.log(File.removeFile(filepath))
}

testFile()

import * as Grabber from "./util/Grabber"

async function testGrabber(){
    console.log(await Grabber.download("https://example.com", _userDir, function (msg) {
        console.log(msg);
    }))
    console.log(await Grabber.download("https://example.com", _userDir, (msg)=>{}, "example.txt"))
    console.log(File.readFile(path.join(_userDir, "example.com")))
    console.log(File.readFile(path.join(_userDir, "example.txt")))
    console.log(await Grabber.getRaw("https://example.com"))
    File.removeFile(path.join(_userDir, "example.com"))
    File.removeFile(path.join(_userDir, "example.txt"))
}

testGrabber()