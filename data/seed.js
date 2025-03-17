import dotenv from 'dotenv'
import { db } from '../config/db.js'
import Polizas from '../models/Polizas.js'
import { polizas, services } from './beautyPolizas.js'

dotenv.config()
await db()

async function seedDB(){
    try {
        await Polizas.insertMany(polizas)
        console.log('!!!! Se Agregaron Los Datos Correctamente !!!')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

function clearDB(){

}

if(process.argv[2] === '--import'){
    seedDB()
}else{
    clearDB
}