const { app, BrowserWindow } = require('electron')
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 350,
        height: 600,
        frame: false,
        transparent: true,
        resizable: true,
        webPreferences: {
            experimentalFeatures: true,
            nodeIntegration: true,
            preload: path.join(__dirname, './preload.js'),
            enableRemoteModule: true,
        }
    })

    win.loadFile('./dist/index.html')
    win.webContents.openDevTools({mode: "detach"});

}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', () =>{
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})

const {ipcMain} = require('electron')
ipcMain.on('close-app', (evt, arg) => {
    //app.quit();
    app.exit();//wtf why I cant use .quit()
})

try {
    require('electron-reloader')(module)
} catch (_) {}//hot reload