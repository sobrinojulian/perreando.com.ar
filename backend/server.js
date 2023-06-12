// ---------------------------------------
// Imports y seteo de variables
// ---------------------------------------
import express from 'express'
import config from './config.js'
import UserRouter from './router/usersRouter.js'
import DisponibilidadesRouter from './router/disponibilidadesRouter.js'
import PaseoRouter from './router/paseoRouter.js'
import MascotaRouter from './router/mascotaRouter.js'
import cors from 'cors'
import ConnectionMongoDB from './model/ConnectionMongoDB.js'

const app = express()
// ---------------------------------------

app.use(cors());
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/users', new UserRouter().start())
app.use('/api/mascotas', new MascotaRouter().start())
app.use('/api/disponibilidades', new DisponibilidadesRouter().start())
app.use('/api/paseos', new PaseoRouter().start())
await ConnectionMongoDB.conectar()

// ---------------------------------------
// Inicializacion del servidor
// ---------------------------------------
const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))
server.on('Error', error => console.log(`Error en servidor: ${error.message}`))
// ---------------------------------------