import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/polizas',
  withCredentials: true
})

export const obtenerPolizas = () => api.get('/')
export const crearPoliza = (data) => api.post('/', data)
export const eliminarPoliza = (id) => api.delete(`/${id}`)
