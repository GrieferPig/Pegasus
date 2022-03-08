/** for test purpose **/

const { contextBridge } = require('electron');
const {ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electron', {
    close(){
        console.log("preload")
        ipcRenderer.send('exit-app')
    }
});
