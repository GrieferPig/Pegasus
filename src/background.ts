'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import path from "path";
const { Tray, Menu, nativeImage } = require('electron')
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
var win;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 350,
    height: 600,
    frame: false,
    transparent: true,
    resizable: true,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, './preload.js'),
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools({mode: "detach"})
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')

  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:')
    }
  }
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

const {ipcMain} = require('electron')
ipcMain.on('close-app', (evt, arg) => {
  //app.quit();
  app.exit();//wtf why I can't use .quit()
})

app.setUserTasks([
  {
    program: 'cmd',
    arguments: '',
    iconPath: '',
    iconIndex: 0,
    title: 'Test',
    description: 'Give me ponies!'
  },
  {
    program: 'notepad',
    arguments: '',
    iconPath: '',
    iconIndex: 0,
    title: 'not really useful actually',
    description: 'Give me ponies!'
  }
])

let tray

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('./assets/icon.ico')
  tray = new Tray(icon)
  // note: your contextMenu, Tooltip and Title code will go here!
  tray.setContextMenu(contextMenu)
})

const contextMenu = Menu.buildFromTemplate([
  {label: "rickrolling"},
  { label: 'never', type: 'radio' },
  { label: 'gonna', type: 'normal' },
  { label: 'give', type: 'radio', checked: true },
  { label: 'you', type: 'normal' },
  { type: 'separator' },
  { label: 'UP', type: 'checkbox' },
  { label: 'damedane', type: 'submenu', submenu:[
      {label: 'never gonna let you'},
      {label: 'down', sublabel: 'oooh what\'s this?'}
    ]}
])

