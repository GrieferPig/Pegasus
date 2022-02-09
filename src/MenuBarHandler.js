title.onclick = function () {
    var ipcRender = require('electron').ipcRenderer
    ipcRender.send('handelClose', "执行关闭")
    console.log("yes")
}