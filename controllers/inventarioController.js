const Productos = require('../models/Inventario');

exports.nuevoproducto = async (req, res, next) =>{
    const producto = new Productos(req.body);

    try {
        const product = await producto.save();
        req.io.sockets.emit('notificacion', {
            evento: "nuevo",
            product
          });
        res.json({ mensaje : 'Se agrego un nuevo medicamento' });
    } catch (error) {
        res.send(error);
        next();
    }
}

exports.mostrarProductos = async (req, res, next) =>{
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }

}

exports.mostrarProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.idProducto);
        res.json(producto);
    } catch (error) {
        res.json({mensaje : 'Ese Producto no existe'});
        next();
    }
}

exports.buscarProducto = async (req, res, next) => {
    try {
        const { query } = req.params;
        const producto = await Productos.find({ Nombre: new RegExp(query, 'i') });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.actualizarProducto = async (req, res, next) => {
    try {
        let producto = await Productos.findOneAndUpdate({_id : req.params.idProducto}, req.body, {
            new: true
        } )
        res.json(producto)
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarProducto = async (req, res, next) => {
    try {
        const product = await Productos.findById(req.params.idProducto);
        await Productos.findByIdAndDelete({ _id : req.params.idProducto });
        req.io.sockets.emit('notificacion', {
            evento: "eliminar",
            product
          });
        res.json({mensaje : 'El Producto se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}