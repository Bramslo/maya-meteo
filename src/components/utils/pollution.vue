<template>
    <div class="backdrop-blur-sm bg-gradient-to-t from-white/50 to-transparent md:col-span-1  p-1  w-full order-2  rounded">
        <p class="font-bold pl-2 border-b border-mayaYellow  rounded text-white text-xs py-1">
            Air Pollution 
        </p>
        <p class="text-white flex items-center justify-center font-light text-xs my-2">
            <svg v-if="ClientPollution.aqi > 3" xmlns="http://www.w3.org/2000/svg" class="h-12 text-red-600 w-12 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-12 text-green-600 w-12 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </p>
        <div class="grid gap-1 grid-cols-2">
            <span class="text-mayaBlue mix-blend-luminosity py-1 font-medium text-xs rounded px-1 bg-mayaYellow-50">{{'P1: '+ClientPollution.pm10}}</span>
            <span class="text-mayaBlue mix-blend-luminosity py-1  font-medium text-xs rounded px-1 bg-mayaYellow-50">{{'P2: '+ClientPollution.pm2_5}}</span>
            <span class="text-mayaBlue mix-blend-luminosity py-1  font-medium text-xs rounded px-1 bg-mayaYellow-50">{{'O3: '+ClientPollution.o3}}</span>
            <span class="text-mayaBlue mix-blend-luminosity py-1  font-medium text-xs rounded px-1 bg-mayaYellow-50">{{'NO2: '+ClientPollution.no2}}</span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { ClientPollution } from '@/store/maya/state'
export default defineComponent({
  props: {
    ClientPollution:{
        type: Object as PropType<ClientPollution>,
        required: true
    }
  },
  mounted() {
    this.ClientPollution
  }
})
</script>