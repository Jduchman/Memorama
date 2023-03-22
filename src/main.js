const {app, BrowserWindow, Menu} = require('electron')

let ventana;

let menu = new Menu()

function crearVentana(){
    ventana = new BrowserWindow({
        height: 560,
        width: 950,
        resizable: false,
        icon: "./resources/icono.ico",
        title:"Memorama",
        webPreferences: {
            nodeIntegration: true
        }
    })
    ventana.loadFile('src/pages/home/home.html')
    ventana.setMenu(menu);
}

app.whenReady().then(()=>{

    crearVentana();

    app.on('activate', ()=>{
        if (BrowserWindow.getAllWindows().length === 0) crearVentana();
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});


module.exports = {
    crearVentana
}