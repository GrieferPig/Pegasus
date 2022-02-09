// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 600,
    frame: false,
    transparent: false
  })
  mainWindow.loadFile('src/index.html')
  ipcMain.on('handleClose', function(){
    mainWindow.close()
  });
}

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

