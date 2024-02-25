<script setup lang="ts">
import { useCocktailsStore } from '../stores/cocktails'
import CocktailSmallCard from '../components/CocktailSmallCard.vue'

const cocktailsStore = useCocktailsStore();

cocktailsStore.getRandomCocktails();

</script>

<template>
  <v-container class="text-center">
    <h2>What's your taste today?</h2>
    <div v-if="cocktailsStore.isLoadingCocktails" class="cocktail-list">
      <div v-for="indexR in 12" :key="indexR">
        <v-skeleton-loader
          class="mx-auto border ma-3"
          width="300"
          height="300"
          type="image, list-item-two-line"
          color="background"
          rounded="4"
        />
      </div>
    </div>
    <div v-else class="cocktail-list">
      <div v-for="(cocktail, index) in cocktailsStore.randomCocktails" :key="index">
        <CocktailSmallCard :cocktail="cocktail" />
      </div>
    </div>
  </v-container>
</template>

<style style="scss" scoped>
.cocktail-list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  flex-flow: wrap;
}
</style>