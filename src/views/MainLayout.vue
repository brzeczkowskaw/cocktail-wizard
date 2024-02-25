<script setup lang="ts">
import NavigationBar from "../components/NavigationBar.vue"
</script>

<template>
  <v-container>
    <v-main>
      <NavigationBar />
      <slot />
    </v-main>
  </v-container>
</template>

<style lang="scss" scoped>
</style>