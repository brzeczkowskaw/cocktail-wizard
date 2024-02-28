<script setup lang="ts">
import { useCocktailsStore } from '../stores/cocktails'
import { useBarStore } from '../stores/bar'
import CocktailSmallCard from '../components/CocktailSmallCard.vue'

const barStore = useBarStore();
const cocktailsStore = useCocktailsStore()

cocktailsStore.getTagsInfo();

</script>

<template>
  <v-container class="text-center">
    <h2>Your favourites</h2>
    <div v-if="!barStore.favourites" class="cocktail-list">
      <div v-for="indexR in 3" :key="indexR">
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
      <div v-for="(cocktail, index) in barStore.favourites" :key="index">
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