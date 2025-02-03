<script setup>
import { ref, computed } from 'vue'
import Button from 'primevue/button'

const colors = Array.from({ length: 37 }, (_, i) => i === 0 ? 'green' : i % 2 === 0 ? 'red' : 'black')
const isSpinning = ref(false)
const result = ref(null)
const rotation = ref(0)

const spin = () => {
  if (isSpinning.value) return
  isSpinning.value = true
  result.value = null
  
  const randomRotations = 5 + Math.random() * 5
  const targetRotation = rotation.value + (360 * randomRotations)
  const finalNumber = Math.floor(Math.random() * 37)
  
  rotation.value = targetRotation + (finalNumber * (360 / 37))
  
  setTimeout(() => {
    isSpinning.value = false
    result.value = finalNumber
  }, 5000)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    <div class="relative w-96 h-96 mb-8">
      <!-- Roulette Wheel -->
      <div
        class="roulette-wheel absolute w-full h-full rounded-full border-4 border-gray-800 overflow-hidden shadow-xl transition-transform duration-5000 ease-out"
        :style="{ transform: `rotate(${rotation}deg)` }"
      >
        <div
          v-for="(color, index) in colors"
          :key="index"
          class="number absolute w-1/2 h-1/2 left-1/2 top-0 origin-left-bottom"
          :class="{
            'bg-green-500': color === 'green',
            'bg-red-500': color === 'red',
            'bg-gray-800': color === 'black'
          }"
          :style="{ transform: `rotate(${index * (360 / 37)}deg)` }"
        ></div>
        <div class="absolute inset-4 bg-white rounded-full shadow-inner"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gold-500 rounded-full border-4 border-white shadow-lg"></div>
      </div>

      <!-- Pointer -->
      <div class="pointer absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-6 bg-gold-500 clip-triangle shadow-lg z-10"></div>
    </div>

    <Button
      label="SPIN"
      icon="pi pi-play"
      :disabled="isSpinning"
      @click="spin"
      class="w-48 h-12 text-lg font-bold"
      :class="{ 'opacity-50 cursor-not-allowed': isSpinning }"
    />

    <div v-if="result !== null" class="mt-8 p-4 bg-white rounded-lg shadow-md text-xl font-bold">
      Result: 
      <span :class="{
        'text-red-500': colors[result] === 'red',
        'text-gray-800': colors[result] === 'black',
        'text-green-500': colors[result] === 'green'
      }">
        {{ colors[result] }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.clip-triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.roulette-wheel {
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
}

.number {
  transform-origin: left bottom;
  border-right: 2px solid rgba(255, 255, 255, 0.3);
}
</style>