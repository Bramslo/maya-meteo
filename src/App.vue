<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Welcome</RouterLink>
        <RouterLink to="/advanced">Advanced</RouterLink>
        <RouterLink to="/extra">Extra</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
<style scoped>
nav > a{
  padding:1em;
}
</style>
