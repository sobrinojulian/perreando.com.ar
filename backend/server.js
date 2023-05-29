// ---------------------------------------
// Imports y seteo de variables
// ---------------------------------------
import express from 'express'
import config from './config.js'
import UserRouter from './router/usersRouter.js'
import PaseadorRouter from './router/paseadoresRouter.js'
import cors from 'cors'
const app = express()
// ---------------------------------------

app.use(cors());
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/users', new UserRouter().start())
app.use('/api/paseador', new PaseadorRouter().start())

// ---------------------------------------
// Inicializacion del servidor
// ---------------------------------------
const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))
server.on('Error', error => console.log(`Error en servidor: ${error.message}`))
// ---------------------------------------