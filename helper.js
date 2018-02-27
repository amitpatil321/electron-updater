const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const path    = require('path')
const url     = require('url')
const ipcMain = require('electron').ipcMain
const helper  = require('./helper')

let main, mini, can_close = 0;

module.exports = {
    open_mini : function(callback){
	  mini = new BrowserWindow({width: 400, height: 300, show: false })
	  mini.loadURL(url.format({
	    pathname: path.join(__dirname, 'mini.html'),
	    protocol: 'file:',
	    slashes: true
	  }))

	  mini.once('ready-to-show', function(){
	  	callback(mini)
	  })

	  mini.on('close', function(event){
	  	if(!can_close){
		  	event.preventDefault()
		  	mini.hide()
		}
	  }) 	  
    },
    open_main : function(callback){
	  main = new BrowserWindow({width: 400, height: 300, show: false })
	  main.loadURL(url.format({
	    pathname: path.join(__dirname, 'main.html'),
	    protocol: 'file:',
	    slashes: true
	  }))

	  main.once('ready-to-show', function(){
	  	callback(main)
	  })

	  main.on('close', function(event){
	  	if(!can_close){
		  	event.preventDefault()
		  	main.hide()
		}
	  })
	 
    },
    force_close : function(){
    	can_close = 1
    	main.close()
    	mini.close()
    }
}