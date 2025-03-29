import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import polizasRoutes from './routes/polizaRoutes.js'

dotenv.config()

const app = express()

// Configuración de CORS
const whiteList = [process.env.FRONTEND_URL || 'http://localhost:5173']
app.use(cors({
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('No permitido por CORS'))
    }
  },
  credentials: true
}))

app.use(express.json())
db()

app.use('/api/polizas', polizasRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(colors.blue(`Servidor corriendo en puerto ${PORT}`))
})
