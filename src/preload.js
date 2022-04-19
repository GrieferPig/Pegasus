const { contextBridge } = require('electron');
const {ipcRenderer} = require('electron');

console.log('preload loaded')

contextBridge.exposeInMainWorld('electron', {
    close(){
        ipcRenderer.send('close-app')
    },
    sendNotification(){
        new Notification('this is a notificatoin', { body: 'tHiS iS tHe NoTiFiCaTiOn BoDy' })
    }
});