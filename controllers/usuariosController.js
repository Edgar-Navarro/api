const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res) => {

    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje : 'Usuario Creado Correctamente'});
    } catch (error) {
        console.log(error);
        res.json({mensaje : 'Hubo un error'});
    }
    
}

exports.autenticarUsuario = async (req, res, next) => {
    const {user, password } = req.body;
    const usuario = await Usuarios.findOne({ user });
    console.log(usuario);

    if(!usuario) {
        await res.status(401).json({mensaje : 'Ese usuario no existe'});
        next();
    } else {
        if(!bcrypt.compareSync(password, usuario.password )) {
            await res.status(401).json({ mensaje : 'Password Incorrecto'});
            next();
        } else {
            const token = jwt.sign({
                user : usuario.user, 
                nombre: usuario.nombre, 
                id : usuario._id
            }, 
            'LLAVESECRETA', 
            {
                expiresIn : '1h'
            }); 

            res.json({ token });
        }


    }
}

exports.index = async (req, res, next) =>{

    res.render('index');
}