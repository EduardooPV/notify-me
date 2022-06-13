import { app, BrowserWindow, ipcMain } from 'electron'
const AutoLaunch = require('auto-launch')
const path = require('path')

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 650,
    height: 500,
    backgroundColor: '#191622',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners() {
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

const autoLaunch = new AutoLaunch({
  name: 'Notify me',
  path: app.getPath('exe'),
})
autoLaunch.isEnabled().then((isEnabled: any) => {
  if (!isEnabled) autoLaunch.enable()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
