<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import ClientPosition from '@/components/loadClientPosition.vue';
import { useStore } from '@/store'
import { ActionTypes } from './store/maya/actions';

export default defineComponent({
  name:'Maya',
  components:{
    ClientPosition,RouterLink,RouterView
  },
  setup(){
    const store = useStore()
    onMounted(() => store.dispatch(ActionTypes.GetClientPosition))
  }
})
</script>

<template>
  <main id="app" class="bg-mayaYellow-50">
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Welcome</RouterLink>
        <RouterLink to="/advanced">Advanced</RouterLink>
        <RouterLink to="/extra">Extra</RouterLink>
      </nav>
    </div>
  </header>
  <ClientPosition/>
  <RouterView />
  </main>
</template>
<style scoped>
nav > a{
  padding:1em;
}
</style>
