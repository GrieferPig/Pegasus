// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 600,
    frame: false,
    transparent: true,
    resizable: false,
    webPreferences: {experimentalFeatures: true}
  })
  mainWindow.loadFile('src/index.html')
  mainWindow.webContents.openDevTools({mode:'detach'})
}

ipcMain.on('handleClose', function(){
  app.close()
});

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('closed', function(){
  mainWindow=null
})

