const { contextBridge } = require('electron');
const {ipcRenderer} = require('electron');

console.log('preload loaded')
import {testVersionMgr} from './backend/test.ts'
let gameList;
testVersionMgr().then(value => {
    gameList = value
})

contextBridge.exposeInMainWorld('electron', {
    close(){
        ipcRenderer.send('close-app')
    },
    sendNotification(){
        new Notification('this is a notificatoin', { body: 'tHiS iS tHe NoTiFiCaTiOn BoDy' })
    },
    getGameList(){
        return gameList
    }
});