const { contextBridge } = require('electron');
const {ipcRenderer} = require('electron');

console.log('preload loaded')

contextBridge.exposeInMainWorld('electron', {
    close(){
        ipcRenderer.send('close-app')
    }
});