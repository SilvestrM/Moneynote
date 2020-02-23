'use strict'

import { app, protocol, BrowserWindow, screen, ipcMain } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'

import './dataAccess'

import { brotliDecompress } from 'zlib';
import { CLIEngine } from 'eslint';
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

//database decaration;

//const transactions = new Datastore({ filename: `${__static}/data/transactions.db`, autoload: true })
//const categories = new Datastore({ filename: `${__static}/data/categories.db`, autoload: true })

/*const db = {};

db.transactions = new Datastore({ filename: `src/assets/data/transactions.db`, autoload: true })
db.categories = new Datastore({ filename: `src/assets/data/categories.db`, autoload: true })
db.accounts = new Datastore({ filename: `src/assets/data/accounts.db`, autoload: true })*/

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow() {
  // Create the browser window.
  const primaryScreen = screen.getPrimaryDisplay();
  const width = primaryScreen.size.width - (primaryScreen.size.width * 0.20);
  const height = primaryScreen.size.height - (primaryScreen.size.height * 0.20);

  win = new BrowserWindow({
    width: width, height: height, useContentSize: true, webPreferences: {
      nodeIntegration: true
    }
  })

  //win.removeMenu()
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
    console.log('window error', error);
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
  if (isDevelopment && !process.env.IS_TEST) {

    ipcMain.on("appLoaded", () => {
    })
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

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
