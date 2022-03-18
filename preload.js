const { contextBridge } = require('electron');
const {ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electron', {
    close(){
        ipcRenderer.send('close-app')
    }
});