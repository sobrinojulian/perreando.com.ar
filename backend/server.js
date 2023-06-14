// ---------------------------------------
// Imports y seteo de variables
// ---------------------------------------
import express from 'express'
import UserRouter from './router/usersRouter.js'
import DisponibilidadesRouter from './router/disponibilidadesRouter.js'
import PaseoRouter from './router/paseoRouter.js'
import MascotaRouter from './router/mascotaRouter.js'
import cors from 'cors'
import ConnectionMongoDB from './model/ConnectionMongoDB.js'


class Server {

    constructor(port){
        this.app = express()
        this.port = port
    }

    async start(){
        this.app.use(cors());
        this.app.use(express.static('public'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use('/api/users', new UserRouter().start())
        this.app.use('/api/mascotas', new MascotaRouter().start())
        this.app.use('/api/disponibilidades', new DisponibilidadesRouter().start())
        this.app.use('/api/paseos', new PaseoRouter().start())
        await ConnectionMongoDB.conectar()
        
        // ---------------------------------------
        // Inicializacion del servidor
        // ---------------------------------------
        const PORT = this.port
        this.server = this.app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))
        this.server.on('Error', error => console.log(`Error en servidor: ${error.message}`))
        // ---------------------------------------
        
        return this.app
    }

    async stop(){
        this.server.close()
        await ConnectionMongoDB.desconectar()
    }

}

export default Server