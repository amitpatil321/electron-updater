const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path    = require('path')
const url     = require('url')
const ipcMain = require('electron').ipcMain
const helper  = require('./helper')


let mainWindow, childWindow1, childWindow2, main, mini

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    show: false
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.once('ready-to-show', function(){
    c("ready")
    mainWindow.show()
    helper.open_mini(function(response){
      if(response){
        mini = response
      }
    })
    helper.open_main(function(response){
      if(response){
        main = response
      }    
    })   
  })

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.on('close', function(){
    helper.force_close()
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  // if (process.platform !== 'darwin') {
    app.quit()
  // }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});

ipcMain.on('open_window', function(){
 mini.show()
});

ipcMain.on('open_main', function(){
  main.show()
  mini.hide()
});

ipcMain.on('open_mini', function(){
  mini.show()
  main.hide()
});

function c(str){
  console.log(str);
}