<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import ClientPosition from '@/components/loadClientPosition.vue';
import { useStore } from '@/store'
import { ActionTypes } from './store/maya/actions';
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
  <main id="app" class="antialiased  container flex md:flex-col flex-row h-screen mx-auto">
    <Loading v-if="isLoading" />
    <div class="md:flex h-full">
        <div class="md:w-3/4">
          <ClientPosition />
          <RouterView />
        </div>
        <div class="py-5 px-2 bg-mayaBlue md:w-1/4">
         <div class="backdrop-blur-sm bg-gradient-to-t from-white/50 to-transparent w-full rounded">
          <form class="relative mx-auto">
            <input class="border-b border-mayaYellow h-12 px-5 bg-transparent pr-16 rounded text-sm font-medium text-mayaYellow uppercase focus:outline-none"
            type="search" name="search" placeholder="Type a city name">
            <button type="submit" class=" absolute  right-0 top-0 mt-4 mr-4">
            <svg class="text-mayaYellow font-bold h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                width="512px" height="512px">
                <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
            </button>
          </form>
          <div class="py-8"></div>
         </div>
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