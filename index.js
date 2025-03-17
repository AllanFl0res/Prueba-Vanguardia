//Importaciones
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { db } from './config/db.js'
import polizasRoutes from './routes/polizaRoutes.js'

//variables de Entorno
dotenv.config()

//Configuracion de la app
const app = express()

//Leer datos via body
app.use(express.json())

//conectar a la base de datos
db()

//Definicion de la ruta
app.use('/api/polizas', polizasRoutes)

//Definicion del Puerto
const PORT = process.env.PORT || 3000

//Ejecutar del app
app.listen(PORT, () =>{
    console.log(colors.blue('El Servidor se esta ejecutando en el puerto', PORT))
})