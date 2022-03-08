<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import ClientPosition from '@/components/loadClientPosition.vue';
import { useStore } from '@/store'
import { ActionTypes } from './store/maya/actions';
import loading from '@/components/utils/loading.vue';
import Loading from '@/components/utils/loading.vue';
export default defineComponent({
  name:'Maya',
  components:{
    ClientPosition,RouterLink,RouterView,
    Loading
  },
  setup(){
    const store = useStore()
    const isLoading = computed(() => store.state.loading)
    onMounted(() => store.dispatch(ActionTypes.GetClientPosition))

    return {isLoading}
  }
})
</script>

<template>
  <main id="app" class="antialiased  container flex flex-col h-screen mx-auto">
      <loading v-show="isLoading" />
      <div class="md:flex h-full">

        <div class="md:w-3/4">
          <ClientPosition />
          <RouterView />
        </div>
        <div class="p-8 bg-mayaBlue-50 md:w-1/4">
          <header>
            <div class="wrapper">
              <nav class="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow border-t-4 border-mayaBlue">
                <div class="flex justify-between">
                  <RouterLink active-class="bg-mayaBlue text-white" class="w-full focus:text-white justify-center inline-block text-center py-3" to="/">Welcome</RouterLink>
                  <RouterLink active-class="bg-mayaBlue text-white" class="w-full focus:text-white justify-center inline-block text-center py-3" to="/advanced">Advanced</RouterLink>
                  <RouterLink active-class="bg-mayaBlue text-white" class="w-full focus:text-white justify-center inline-block text-center py-3" to="/extra">Extra</RouterLink>
                </div>
              </nav>
            </div>
          </header>
        </div>

      </div>
  </main>
</template>