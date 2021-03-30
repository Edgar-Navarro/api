const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');
const usuariosController = require('../controllers/usuariosController');


const auth = require('../middleware/auth');


module.exports = function(io) {

    io.on('connection', (socket) => {
        console.log('a user connected');
      });
      

    router.post('/productos', function(req, res) {
        req.io= io
        inventarioController.nuevoproducto(req, res)
    });
    router.get('/productos', 
    inventarioController.mostrarProductos
    );
    router.get('/productos/:idProducto', 
    inventarioController.mostrarProducto
    );
    router.post('/productos/busqueda/:query', 
    inventarioController.buscarProducto
    );
    router.put('/productos/:idProducto', 
    inventarioController.actualizarProducto
    );

    router.delete('/productos/:idProducto', function(req, res) {
        req.io= io
        inventarioController.eliminarProducto(req, res)
    });

    router.post('/crear-cuenta', 
    usuariosController.registrarUsuario
    );

    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    );

    router.get('/index',
    usuariosController.index
    );


    
    return router;
}
 