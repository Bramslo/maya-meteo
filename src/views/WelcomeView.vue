<script lang="ts">
export default defineComponent({
  name:'WelcomeView',
  components:{
    ClientPosition,
  },
})
import { defineComponent } from 'vue';
import ClientPosition from '@/components/loadClientPosition.vue';
</script>
<template>
    <!-- DEFAULT VIEW ON TOP OF ROUTING -->
    <ClientPosition />

    <div class="w-full h-auto p-12 rounded shadow-md my-2 font-bold items-center justify-center text-mayaBlue  bg-mayaYellow-50">
      BIG ANALYTICS
    </div>
</template>