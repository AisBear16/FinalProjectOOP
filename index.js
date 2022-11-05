//import app, BroswerWindow, Menu, ipcMain and other modules into the application 
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const { contextIsolated } = require('process');

var mainWindow;

//handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit();
}

//create the main browser window
const createWindow = () => {
    mainWindow = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences:{
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  //load the main.html of the app
  mainWindow.loadFile(path.join(__dirname, 'main.html'));

  var mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu);
};

//this method will be called when Electron has finished initialization and is ready to create browser windows
app.on('ready', createWindow);

//quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//create the CRUD browser window
ipcMain.on("newWindow", function(e,addWindow){
  addWindow = new BrowserWindow({
    width: 1600,
    height: 800,
    title:"Groceries list",

    webPreferences:{
      nodeIntegration: true,
      contextIsolation: false
    } 
  });

  //load the CRUD.html of the app
  addWindow.loadFile(path.join(__dirname, 'CRUD.html'));
})

var mainMenuTemplate = [
];