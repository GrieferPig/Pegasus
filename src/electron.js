const { app, BrowserWindow } = require('electron')
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, './preload.js'),
        }
    })

    win.loadFile('./dist/index.html')
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
ipcMain.on('exit-app', (evt, arg) => {
    //app.quit();
    app.exit();//wtf why I cant use .quit()
})

try {
    require('electron-reloader')(module)
} catch (_) {}//hot reload