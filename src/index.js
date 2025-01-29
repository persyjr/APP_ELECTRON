const { app, BrowserWindow, Menu } = require('electron')
const url = require('url')
const path = require('path')

let win
let newProductWindow;

// Reload in Development for Browser Windows
if(process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')

  });
}

app.on('ready', () => {
    win = new BrowserWindow({})
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file:',
        slashes: true
    //win.loadFile('index.html')
}))
    //cargamos el menu personalizado mainMenu
   const mainMenu = Menu.buildFromTemplate(templateMenu)//aqui asocio el template a renderizar el menu
   Menu.setApplicationMenu(mainMenu)
});

//esta funcion me va permitir cargar la nueva ventana con mi templates
function createNewProductWindow() {
    newProductWindow = new BrowserWindow({
      width: 400,
      height: 330,
      title: 'Add A New Product'
    });

    newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new_product.html'), //aqui es donde estoy renderizando el new product.html
        protocol: 'file:',
        slashes: true}))
}

const templateMenu =[
    {
        label: 'File',
        submenu: [
            {
                label: 'New Product',
                accelerator: 'Ctrl+N',
                click(){
                    createNewProductWindow()// Aqui estoy ejecutando la creacion de mi ventana
                }
            }
        ]
    }
]