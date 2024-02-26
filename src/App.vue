<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthorisationStore } from './stores/authorisation'

const authorisationStore = useAuthorisationStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  const isUserLoggedIn = authorisationStore.onStatusChange();
  if (!isUserLoggedIn) router.push('/');
})

const layoutComponent = computed(() => {
  return route.meta.layout;
});
</script>

<template>
  <v-app class="app">
    <component :is="layoutComponent || 'div'">
      <router-view />
    </component>
  </v-app>
</template>

<style scoped>
.v-application {
  background-repeat: no-repeat;
  height: 100%;
  background-position: center;
  background-size: cover;
  background: linear-gradient(rgba(215, 67, 67, 0.288), rgba(73, 26, 26, 0.5)), url('./assets/background-cocktail.jpg');
}
#app {
  width: 100vw;
  margin: 0 auto;
  padding: 0;
  text-align: center;
}
</style>
