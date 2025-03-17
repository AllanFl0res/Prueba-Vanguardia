import express from 'express'
import { createPoliza, getPolizasById, getPolizas, updatePoliza, deletePoliza } from '../controllers/polizasControllers.js'

const router = express.Router()

router.post('/', createPoliza)
router.get('/', getPolizas)
router.get('/:id', getPolizasById)
router.put('/:id', updatePoliza)
router.delete('/:id', deletePoliza)

export default router