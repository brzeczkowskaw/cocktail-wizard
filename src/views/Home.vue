<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCocktailsStore } from '../stores/cocktails'
import { useBarStore } from '../stores/bar'
import CocktailSmallCard from '../components/CocktailSmallCard.vue'
import "@lottiefiles/lottie-player"
import cocktailAnimation from "../assets/cocktail-animation.json"

const filterCategory = ref('cocktail name');
const name = ref();
const ingredient = ref();
const alcoholic = ref();
const category = ref();
const glass = ref();

const filterItems = [
  'cocktail name',
  'ingredient',
  'alcohol content',
  'category',
  'glass'
]

const cocktailsStore = useCocktailsStore();
const barStore = useBarStore();

cocktailsStore.getRandomCocktails();
cocktailsStore.getTagsInfo();

async function search() {
  let filterLine = '';
  if (filterCategory.value === 'cocktail name') 
    filterLine = `search.php?s=${name.value.replaceAll(' ', '_')}`;
  if (filterCategory.value === "ingredient") 
    filterLine = `filter.php?i=${ingredient.value.replaceAll(' ', '_')}`;
  if (filterCategory.value === "alcohol content")
    filterLine = `filter.php?a=${alcoholic.value.replaceAll(' ', '_')}`;
  if (filterCategory.value === "category")
    filterLine = `filter.php?c=${category.value.replaceAll(' ', '_')}`;
  if (filterCategory.value === "glass")
    filterLine = `filter.php?g=${glass.value.replaceAll(' ', '_')}`;
  try {
    await cocktailsStore.filterForCocktails(filterLine);
  } catch(error) {
    alert(error.message);
  }
}

async function getLuckyShot() {
  cocktailsStore.cocktails = [];
  try {
    await cocktailsStore.getRandomCocktails();
  } catch(error) {
    alert(error.message);
  }
}

function clearCategories() {
  name.value = null;
  ingredient.value = null;
  alcoholic.value = null;
  category.value = null;
  glass.value = null;
}
</script>

<template>
  <v-container class="text-center">
    <h2>What's your taste today?</h2>
    <div>
      <v-row class="my-4" justify="center">
        <v-btn 
          color="primary" 
          width="200"
          class="mx-2"
          @click="getLuckyShot"
        >
          Your lucky shot
        </v-btn>
      </v-row>
    </div>
    <div v-if="!cocktailsStore.isLoadingCocktails">
      <v-row class="ma-4">
          <v-select
            v-model="filterCategory"
            :items="filterItems"
            class="mr-0 select-row filter-items"
            density="compact"
            @change="clearCategories"
          />
          <v-text-field 
            v-if="filterCategory==='cocktail name'"
            v-model="name"
            class="mx-0"
            density="compact"
          />
          <v-autocomplete 
            v-else-if="filterCategory==='ingredient'"
            v-model="ingredient"
            :items="cocktailsStore.tagsInfo.ingredients"
            density="compact"
            class="mx-0"
          />
          <v-select 
            v-else-if="filterCategory==='alcohol content'"
            v-model="alcoholic"
            :items="cocktailsStore.tagsInfo.alcoholicFilters"
            density="compact"
            class="mx-0"
          />
          <v-select 
            v-else-if="filterCategory==='category'"
            v-model="category"
            :items="cocktailsStore.tagsInfo.categories"
            density="compact"
            class="mx-0"
          />
          <v-select 
            v-else-if="filterCategory==='glass'"
            v-model="glass"
            :items="cocktailsStore.tagsInfo.glasses"
            density="compact"
            class="mx-0"
          />
          <v-btn
            height="auto"
            variant="plain"
            @click="search"
          >
            search
          </v-btn>
      </v-row>
    </div>
    <div>
      <div v-if="cocktailsStore.isLoadingCocktails" class="cocktail-list">
        <div v-for="indexR in cocktailsStore.isLoadingCocktails.length" :key="indexR">
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
      <div v-else-if="cocktailsStore.cocktails.length" class="cocktail-list">
        <div v-for="(cocktail, index) in cocktailsStore.cocktails" :key="index">
          <CocktailSmallCard :cocktail="cocktail" />
        </div>
      </div>
      <div v-else>
        <h3 class="mt-5">Upss... we couldn't find your cocktail, try again!</h3>
        <v-row justify="center">
          <lottie-player 
            autoplay loop 
            :src="cocktailAnimation" 
            style="width: 300px; height: 300px"
          />
        </v-row>
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
.select-row {
  width: 2em;
}
:deep(.v-input__details) {
  display: none;
}
</style>