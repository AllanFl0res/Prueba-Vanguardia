import mongoose from 'mongoose'

const polizasSchema = mongoose.Schema({
  numeroPoliza: {
    type: String,
    required: true,
    unique: true
  },
  tipoSeguro: {
    type: String,
    enum: ['Auto', 'Vida', 'Hogar', 'Salud'],
    required: true
  },
  titular: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: true
  }
});

const Polizas = mongoose.model('Polizas', polizasSchema)
export default Polizas
