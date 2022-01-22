const bcrypt = require('bcryptjs');
const error = require('../../../utils/error');
const chalk = require('chalk');
const { generarJWT } = require('./validator');

// const auth = require('../../../auth');


module.exports = function (injectedStore) {

    // comprobar el stor que tiene que ser en caso que no usamos el store que queramos - ventajas de trabajar archivo db como injeccion del controller
    let store = injectedStore;

   
    if (!store) {
        store = require('../../../store/mongo-db/mongodb');
    }

    // Desestructuracion de Objetos Models de Mongoose de diferentes Tablas 
    const { User } = store;

    const CrearUsuario = async (req) => {  

           const { email, password } = req.body;

            // Rmail es unico -  buenref para verificar si existe en db 
            const existeEmail = await User.findOne({ email })
            if( existeEmail ) {
             
               throw error('Este correo ya Existe en la base de datos',400)
            }

            // Instancia modelos Mongoose - campos del body exta seran ignorados por model de mongoose
            const user = new User(req.body)

            // Encriptar contraseña
            const salt = bcrypt.genSaltSync()
            user.password = bcrypt.hashSync( password, salt )

            // TODO: pass2 : PARA MAS Seguridad - genear numero aletorio - psarlo por bycrypt - almacenarlo en el modelo de mongoose en pass2 
                            // mutarlo en payload de JWT (no encryptado) -  despues al loguer extarelo de JWT y verificarlo tal cual com hacemos con el pass 

            // save Instance Created 
            await user.save()

            // Generar mi JWT
            const token = await generarJWT( user.id );

            return {
                user,
                token
            }

       

     
    }

    // para hacer cualquier insertacion  o actualizacion de ususario 
    const logear = async (req) =>  {
        
          const { email, password } = req.body;

            const usuarioDB = await User.findOne({ email });
            if ( !usuarioDB ) {
                throw error('Email no encontrado',404)
            }
    
            // Validar el password
            const validPassword = bcrypt.compareSync( password, usuarioDB.password );
            if ( !validPassword ) { 
                throw error('La contraseña no es valida',400) 
            }
    
            // Generar el JWT
            const token = await generarJWT( usuarioDB.id );
            
            return {
                usuario: usuarioDB,
                token
            }      
       
    }

    const renewToken = async (req) => {
        
        const uid = req.uid;
        // generar un nuevo JWT, generarJWT... uid...
        const token = await generarJWT( uid );
        // Obtener el usuario por el UID, Usuario.findById... 
        const usuario = await User.findById( uid );
  
        return {
          usuario,
          token
        }

    }


    return {
        CrearUsuario,
        logear,
        renewToken
    };
 
};


// dentro del controller del compoenete donde tomamos la decicion que tabla usamos , puesto que store nos exporta funciones genericas abiertas  a tablas segun le injectamos  