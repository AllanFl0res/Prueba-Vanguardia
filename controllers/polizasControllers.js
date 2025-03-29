import { polizas } from '../data/beautyPolizas.js'
import Polizas from '../models/Polizas.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

// Crear Póliza
const createPoliza = async (req, res) => {
  if (Object.values(req.body).includes('')) {
    const error = new Error('Todos los campos son obligatorios')
    return res.status(400).json({ msg: error.message })
  }
  try {
    const poliza = new Polizas(req.body)
    await poliza.save()
    res.json({ msg: 'Póliza almacenada correctamente ✅' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error al guardar la póliza' })
  }
}

// Obtener todas las pólizas (desde beautyPolizas.js)
const getPolizas = (req, res) => {
  res.json(polizas[0]) // ✅ Devuelve solo el array interior
}

// Obtener póliza por ID
const getPolizasById = async (req, res) => {
  const { id } = req.params

  if (validateObjectId(id, res)) return

  const poliza = await Polizas.findById(id)
  if (!poliza) {
    return handleNotFoundError('La póliza no existe ❌', res)
  }

  res.json(poliza)
}

// Actualizar póliza
const updatePoliza = async (req, res) => {
  const { id } = req.params

  if (validateObjectId(id, res)) return

  const poliza = await Polizas.findById(id)
  if (!poliza) {
    return handleNotFoundError('La póliza no existe ❌', res)
  }

  poliza.numeroPoliza = req.body.numeroPoliza || poliza.numeroPoliza
  poliza.tipoSeguro = req.body.tipoSeguro || poliza.tipoSeguro
  poliza.titular = req.body.titular || poliza.titular
  poliza.monto = req.body.monto || poliza.monto

  try {
    await poliza.save()
    res.json({ msg: 'Póliza actualizada correctamente ✅' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error al actualizar la póliza' })
  }
}

// Eliminar póliza
const deletePoliza = async (req, res) => {
  const { id } = req.params

  if (validateObjectId(id, res)) return

  const poliza = await Polizas.findById(id)
  if (!poliza) {
    return handleNotFoundError('La póliza no existe ❌', res)
  }

  try {
    await poliza.deleteOne()
    res.json({ msg: 'Póliza eliminada correctamente ✅' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error al eliminar la póliza' })
  }
}

export {
  createPoliza,
  getPolizas,
  getPolizasById,
  updatePoliza,
  deletePoliza
}
