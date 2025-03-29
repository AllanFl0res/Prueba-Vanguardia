<script setup>
import { ref, watch, onMounted } from 'vue'
import { obtenerPolizas } from '../services/PolizasServices'

const props = defineProps({ recargar: Number })
const polizas = ref([])
const loading = ref(true)

const cargarPolizas = async () => {
  loading.value = true
  try {
    const res = await obtenerPolizas()
    polizas.value = res.data
  } catch (error) {
    console.error('Error al obtener pólizas:', error)
  } finally {
    loading.value = false
  }
}

onMounted(cargarPolizas)

watch(() => props.recargar, () => {
  cargarPolizas()
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-blue-600 mb-4">📋 Lista de Pólizas</h2>
    <div v-if="loading" class="text-gray-500">Cargando pólizas...</div>
    <div v-else class="space-y-4">
      <div
        v-for="poliza in polizas"
        :key="poliza._id"
        class="bg-white border-l-4 border-blue-500 p-4 shadow rounded-md"
      >
        <p><span class="font-semibold text-gray-700">🔢 Número:</span> {{ poliza.numeroPoliza }}</p>
        <p><span class="font-semibold text-gray-700">📄 Tipo:</span> {{ poliza.tipoSeguro }}</p>
        <p><span class="font-semibold text-gray-700">👤 Titular:</span> {{ poliza.titular }}</p>
        <p><span class="font-semibold text-gray-700">💰 Monto:</span> ${{ poliza.monto }}</p>
      </div>
    </div>
  </div>
</template>
