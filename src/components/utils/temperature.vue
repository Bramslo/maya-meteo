<template>
    <div class="md:col-span-2 backdrop-blur-sm bg-gradient-to-t from-white/50 to-transparent w-full order-3 object-cover  rounded">
        <p class="font-bold pl-2 border-b border-mayaYellow  rounded text-white text-xs py-2">
            Weekly Temperature 
        </p>
        <!-- IMPORT PARTIALS -->
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