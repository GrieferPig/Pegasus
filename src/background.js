'use strict'
//require('@electron/remote/main').initialize()
import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
import path from 'path'
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
const win = null
async function createWindow() {
  const win = new BrowserWindow({
    width: 350,
    height: 600,
    frame: false,
    transparent: true,
    resizable: true,
    webPreferences: {
      experimentalFeatures: true,
      //@ts-ignore
      nodeIntegration: true,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, '/../preload.js'),
      enableRemoteModule: true,
    }
  })
  //require("@electron/remote/main").enable(win.webContents)
  win.webContents.openDevTools({mode: "detach"});
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
app.on('window-all-closed', app.quit);

const {ipcMain} = require('electron')
ipcMain.on('close-app', (evt, arg) => {
  //app.quit();
  app.exit();//wtf why I cant use .quit()
})
