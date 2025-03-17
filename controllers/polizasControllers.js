import { polizas } from '../data/beautyPolizas.js'
import Polizas from '../models/Polizas.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

//Crear Servicio
const createPoliza = async (req, res) =>{
    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg: error.message
        })
    }
    try {
        const poliza = new Polizas(req.body)
        await poliza.save()
        res.json({
            msg:'Servicio almacenado Correctamente!!!'
        })
    } catch (error) {
        console.log(error) 
    }
}

const getPolizas = (req, res) =>{
    res.json(polizas)
}

const getPolizasById = async (req, res) =>{
    const { id } = req.params

    //Validacion del objeto id
    if(validateObjectId(id, res)) return 

    //Validadr que exista desde utils
    const poliza = await Polizas.findById(id)
    if(!poliza){
        return handleNotFoundError('El servicio no existe!!!', res)
    }

    //Mostrar el Servicio
    res.json(poliza)
}

//Actualizar Servicio
const updatePoliza = async(req, res) =>{
    const { id } = req.params

    //Validacion por object ID
    if(validateObjectId(id, res)) return

    //Validacion de que exista
    const poliza = await Polizas.findById(id)
    if(!poliza){
        return handleNotFoundError('El Servicio no existe!!!', res)
    }

    //Nuevos Valores al escribir
    poliza.numeroPoliza = req.body.numeroPoliza || poliza.numeroPoliza
    poliza.tipoSeguro= req.body.tipoSeguro || poliza.tipoSeguro
    poliza.titular= req.body.titular || poliza.titular
    poliza.monto= req.body.monto || poliza.monto

    try {
        await poliza.save()
        res.json({
            msg: 'Datos Almacenados Correctamente !!!'
        })
    } catch (error) {
        console.log(error)
    }
}

//Eliminar Servicio
const deletePoliza = async(req, res) =>{
    const { id } = req.params

    //Validacion por object ID
    if(validateObjectId(id, res)) return

    //Validacion de que exista
    const poliza = await Polizas.findById(id)
    if(!poliza){
        return handleNotFoundError('El Servicio no existe!!!', res)
    }

    try {
        await poliza.deleteOne()
        res.json({
            msg: 'Servicio Elimninado Correctamente!!!!'
        })
    } catch (error) {
        console.log(error)
    }
}

export{
    createPoliza,
    getPolizas,
    getPolizasById,
    updatePoliza,
    deletePoliza
}