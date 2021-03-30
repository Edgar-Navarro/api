const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventarioSchema = new Schema({
    Nombre: {
        type: String,
    },
    Tipo_Medicamento : {
        type: String,
    },
    Cantidad : {
        type: Number,
    },
    Fecha_Registro : {
        type: Date,
        default: Date.now
    },
    Precio : {
        type: Number, 
    },
    Ubicacion : {
        type: String, 
    }
});

module.exports = mongoose.model('Inventario', InventarioSchema);