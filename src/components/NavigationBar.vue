<script setup lang="ts">
import { ref } from 'vue'
import { useAuthorisationStore } from '../stores/authorisation'
import { useRouter } from "vue-router";

const authorisationStore = useAuthorisationStore();
const router = useRouter();

const isSidebarOpen = ref(false);

const menuItems = [
  {
    title: 'Home',
    props: {
      to: '/',
      prependIcon: 'mdi-home'
    }
  },
  {
    title: 'Log in',
    props: {
      to: '/sign-in',
      prependIcon: 'mdi-login'
    }
  },
]

async function logout() {
  try {
    await authorisationStore.logout();
    router.push("/sign-in");
  } catch(error) {
    alert(error.message)
  }
}
</script>

<template>
  <span>
    <div>
      <v-app-bar prominent elevation="6" density="compact" color="primary">
        <v-app-bar-nav-icon @click="isSidebarOpen = !isSidebarOpen"/>
        <h3>Custom cocktail wizard</h3>
        <spacer />
      </v-app-bar>
    </div>
    <v-navigation-drawer 
      v-model="isSidebarOpen" 
      :permanent="isSidebarOpen" 
      floating
      color="secondary"
      class="nav-bar"
    >
      <v-list 
        :items="menuItems"
        color="primary"
        class="drawer-items px-0"
        nav
        density="compact"
      />
      <div>
        <v-btn
          variant="plain"
          @click="logout"
        >
          <v-icon class="mr-3">mdi-logout</v-icon>
          logout
        </v-btn>
      </div>
    </v-navigation-drawer>
  </span>
</template>

<style style="scss" scoped>
:deep(.drawer-items .v-list-item-title) {
  font-size: 0.9rem;
  font-weight: bold;
}
.nav-bar {
  width: 15vw;
}
@media(max-width: 400px) {
  .nav-bar {
    width: 120vw;
  }
}
</style>