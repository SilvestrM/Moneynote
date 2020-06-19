'use strict'

import { app, protocol, BrowserWindow, screen, ipcMain } from 'electron'
import path from 'path'


import {
  createProtocol,
  // eslint-disable-next-line
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'

import './dataAccess'
import { initData } from './dataAccess'

// eslint-disable-next-line
import { brotliDecompress } from 'zlib';
// eslint-disable-next-line
import { CLIEngine } from 'eslint';
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let splash

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createSplash() {
  splash = new BrowserWindow({
    width: 480,
    height: 320,
    center: true,
    frame: false,
    transparent: true
  });
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    splash.loadFile(path.join(__static, 'loading.html'));
    //if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    splash.loadURL('app://./loading.html')
  }


  splash.on('closed', () => {
    splash = null
  })
}

function createWindow() {
  // Create the browser window.
  const primaryScreen = screen.getPrimaryDisplay();
  let width = primaryScreen.size.width - (primaryScreen.size.width * 0.25);
  let height = primaryScreen.size.height - (primaryScreen.size.height * 0.25);
  let fullscreen = false;

  if (width < 800 || height < 760) {
    fullscreen = true;
  }

  win = new BrowserWindow({
    width: width,
    height: height,
    fullscreen: fullscreen,
    center: true,
    show: false,
    minWidth: 800,
    minHeight: 760,
    useContentSize: true, webPreferences: {
      nodeIntegration: true
    }
  })

  //if (!isDevelopment) win.removeMenu()
  //Menu.setApplicationMenu(null)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    //if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  win.on('renderError', (e, error) => {
    // eslint-disable-next-line
    console.error('window error', error);
  })
  win.webContents.on('did-finish-load', () => {
    win.show();
    if (splash) setTimeout(() => splash.close(), 500)
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {

})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  createSplash()
  initData()
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
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
