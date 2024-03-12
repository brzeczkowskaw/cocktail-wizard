<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthorisationStore } from '../stores/authorisation'
import { useRouter } from "vue-router";

const authorisationStore = useAuthorisationStore();
const router = useRouter();

const isSidebarOpen = ref(false);
const isUserLoggedIn = computed(() => {
  return !!authorisationStore.user?.uid;
})

const menuItems = [
  {
    title: 'Home',
    props: {
      to: '/',
      prependIcon: 'mdi-home'
    }
  },
]

const topMenuItems = computed(() => {
  if (isUserLoggedIn.value) {
    return [
      {
        icon: 'mdi-logout',
        title: 'Log out',
        action: 'logout'
      }
    ]
  } else {
    return [
      {
        icon: 'mdi-login',
        title: 'Log in',
        action: 'login'
      }
    ]
  }
})

function menuActionClick(action: string) {
  if (action === 'logout') {
    logout();
  }
  if (action === 'login') {
    router.push("/sign-in");
  }
}

async function logout() {
  try {
    await authorisationStore.logout();
    router.push("/");
  } catch(error) {
    alert(error.message)
  }
}
</script>

<template>
  <span>
    <div>
      <v-app-bar 
        prominent 
        elevation="6" 
        density="compact" 
        color="primary"
      >
        <v-app-bar-nav-icon v-if="isUserLoggedIn" @click="isSidebarOpen = !isSidebarOpen"/>
        <h3 :class="isUserLoggedIn ? '' : 'ml-6'">Cocktail wizard</h3>
        <v-spacer />
        <div v-if="isUserLoggedIn">
          Hello <b>{{ authorisationStore.user.displayName || authorisationStore.user.email }}</b>!
        </div>
        <div v-else>
          <v-icon>mdi-account-circle</v-icon>
        </div>
        <v-menu>
          <template #activator="{ props }">
            <v-btn text v-bind="props">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in topMenuItems"
              :key="item.action"
              :test-id="item.action"
              @click="menuActionClick(item.action)"
            >
              <template #prepend>
                <v-icon left class="mr-4">{{ item.icon }}</v-icon>
              </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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