const electron = require("electron")
const path = require("path")
const isDev = require("electron-is-dev")
const { shell, webContents } = require("electron")

let mainWindow
const app = electron.app
const BrowserWindow = electron.BrowserWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: { nodeIntegration: true, nativeWindowOpen: false }
    })
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`)
    mainWindow.setMenuBarVisibility(false)
    mainWindow.on("closed", () => (mainWindow = null))
    mainWindow.webContents.on('new-window', (e, url) => {
        e.preventDefault();
        shell.openExternal(url);
    })
}

app.on("ready", createWindow)
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})
app.on("activate", () => {
    if (mainWindow === null) createWindow()
})