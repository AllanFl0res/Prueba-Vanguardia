<script setup>
import { ref } from 'vue'
import PolizaForm from './components/PolizaForm.vue'
import PolizasList from './components/PolizasList.vue'

const polizasActualizadas = ref(0)

const actualizarLista = () => {
  polizasActualizadas.value++
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
    <div class="container mx-auto px-4">
      <div class="bg-white p-8 rounded-xl shadow-lg">
        <h1 class="text-4xl font-bold text-center text-blue-700 mb-10">Sistema de Pólizas</h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <PolizaForm @nueva-poliza="actualizarLista" />
          <PolizasList :recargar="polizasActualizadas" />
        </div>
      </div>
    </div>
  </div>
</template>
