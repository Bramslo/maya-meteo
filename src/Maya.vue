<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useStore } from '@/store'
import { RouterLink, RouterView } from 'vue-router'
import { ActionTypes } from './store/maya/actions'
import Loading from '@/components/utils/loading.vue'
import Search from '@/components/utils/partials/maya-search.vue'
import ClientPosition from '@/components/loadClientPosition.vue'

export default defineComponent({
  name:'Maya',
  components:{
    ClientPosition,
    RouterLink: RouterLink,
    RouterView: RouterView,
    Loading,
    Search
  },
  setup(){

    const store = useStore()
    const isLoading = computed(() => store.state.loading)

    // DISPATCH ACTIONS TO LOCATE USER
    onMounted(() => store.dispatch(ActionTypes.GetClientPosition))

    return {isLoading}

  }
})
</script>

<template>
  <main id="app" class="antialiased container-fluid flex md:flex-col flex-row h-screen mx-auto">
    <Loading v-if="isLoading" />
    <div class="md:flex h-full w-full max-w-7xl rounded 2xl:my-8 my-0 mx-auto">

        <div class="md:w-3/4  bg-gradient-to-b from-mayaBlue-50 rounded ">
          <!-- ROUTING RENDERING -->
          <RouterView />
        </div>

        <!-- MENU - SEARCH - ADSBLOCK adapted on mobile view -->
        <div class="py-5 px-2 bg-gradient-to-b from-mayaBlue-50 md:w-1/4">
          <Search/>
          <div class="w-full h-auto p-12 rounded shadow-md my-2 font-bold items-center justify-center text-mayaBlue  bg-mayaYellow-50">
            PUB AND NEWS
          </div>
          <!-- Maya Application Menu -->
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