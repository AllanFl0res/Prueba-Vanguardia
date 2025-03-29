<script setup>
import { ref } from 'vue'
import { crearPoliza } from '../services/PolizasServices'

const emit = defineEmits(['nueva-poliza'])

const form = ref({
  numeroPoliza: '',
  tipoSeguro: '',
  titular: '',
  monto: ''
})

const mensaje = ref('')

const enviarPoliza = async () => {
  try {
    await crearPoliza(form.value)
    mensaje.value = '✅ Póliza registrada correctamente'
    emit('nueva-poliza') // ✅ emitir evento al padre
    form.value = { numeroPoliza: '', tipoSeguro: '', titular: '', monto: '' }
  } catch (err) {
    mensaje.value = '❌ Error al registrar póliza'
  }
}
</script>

<template>
  <div class="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
    <h2 class="text-3xl font-bold mb-6 text-blue-700">📝 Registrar Nueva Póliza</h2>

    <form @submit.prevent="enviarPoliza" class="space-y-4">
      <div>
        <label class="block text-gray-700 font-semibold">Número de Póliza</label>
        <input v-model="form.numeroPoliza" class="w-full border rounded px-4 py-2" required />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold">Tipo de Seguro</label>
        <select v-model="form.tipoSeguro" class="w-full border rounded px-4 py-2" required>
          <option disabled value="">Selecciona un tipo</option>
          <option>Auto</option>
          <option>Vida</option>
          <option>Hogar</option>
          <option>Salud</option>
        </select>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold">Titular</label>
        <input v-model="form.titular" class="w-full border rounded px-4 py-2" required />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold">Monto</label>
        <input v-model="form.monto" type="number" class="w-full border rounded px-4 py-2" required />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Guardar
      </button>
    </form>

    <p v-if="mensaje" class="mt-4 text-green-600 font-medium">{{ mensaje }}</p>
  </div>
</template>
