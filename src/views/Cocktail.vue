<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCocktailsStore } from '../stores/cocktails'
import { useBarStore } from '../stores/bar'
import { useRouter, useRoute } from 'vue-router'
import { Cocktail } from '../types'
import TagsInfoDialog from '../components/TagsInfoDialog.vue'
import FavouritesHeart from '../components/FavouritesHeart.vue'
import firebase from "firebase/compat/app"

const user = computed(() => {
  return firebase.auth().currentUser;
})

const cocktailsStore = useCocktailsStore();
const barStore = useBarStore();
const router = useRouter(); 
const route = useRoute(); 

const cocktailId = route.params.id as string;
const cocktail = ref<Cocktail | null>();
const isInfoDialogOpen = ref(false);

getCockail(cocktailId);

async function getCockail(id: string) {
  try {
    await cocktailsStore.getCocktailById(cocktailId);
    cocktail.value = cocktailsStore.cocktail;
  } catch(error) {
    alert(error.message);
  }
}

const ingredients = computed(() => {
  let ingredientList = [];
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    if (cocktail.value[ingredientKey] && cocktail.value[measureKey]) {
      const ingredientObject = {
        ingredient: cocktail.value[ingredientKey],
        measure: cocktail.value[measureKey],
      }
      ingredientList.push(ingredientObject);
    }
  }
  return ingredientList;
})

function isIngredientInMyBar(ingredient): boolean {
  return barStore.alcoholes.includes(ingredient.ingredient);
}
</script>

<template>
  <v-container class="cocktail-container">
    <v-row v-if="cocktail">
      <v-col cols="12" sm="6">
        <v-img 
          :src="cocktail.strDrinkThumb"
          :alt="cocktail.strImageAttribution" 
          width="300"
          height="300"
          cover
          class="my-2 rounded-xl"
        />
      </v-col>
      <v-col>
        <v-row class="mt-1">
          <h2>{{ cocktail.strDrink }}</h2>
          <FavouritesHeart v-if="user" :cocktail="cocktail" class="ml-3" />
        </v-row>
        <v-row class="mt-4">
          Ingredients
        </v-row>
        <v-row v-for="ingredient in ingredients" :key="ingredient.ingredient">
          <v-col cols="2" class="my-0 py-0">
            <v-checkbox :model-value="isIngredientInMyBar(ingredient)" />
          </v-col>
          <v-col cols="6">
            {{ ingredient.ingredient }}
          </v-col>
          <v-col>
            {{ ingredient.measure }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="cocktail">
      <v-col cols="12" sm="6">
        <v-row class="mt-4">
          Tags 
          <v-icon 
            class="mx-2" 
            size="x-small" 
            color="grey"
            @click="isInfoDialogOpen = true"
          >
            mdi-information-slab-circle
          </v-icon>
        </v-row>
        <v-row class="mt-4">
          <v-col cols="12" v-if="cocktail.strGlass">
            <v-icon class="mr-3">mdi-glass-cocktail</v-icon>
            {{ cocktail.strGlass }}
          </v-col>
          <v-col cols="12" v-if="cocktail.strTags">
            <v-icon class="mr-3">mdi-tag</v-icon>
            {{ cocktail.strTags }}
          </v-col>
          <v-col cols="12" v-if="cocktail.strCategory">
            <v-icon class="mr-3">mdi-folder</v-icon>
            {{ cocktail.strCategory }}
          </v-col>
          <v-col cols="12" class="d-flex" v-if="cocktail.strIBA">
            <h5 class="mr-4">IBA</h5>
            {{ cocktail.strIBA }}
          </v-col>
          <v-col cols="12" v-if="cocktail.strAlcoholic">
            <v-icon class="mr-3">mdi-percent-outline</v-icon>
            {{ cocktail.strAlcoholic }}
          </v-col>
        </v-row>
      </v-col>
      <v-col>
         <v-row class="mt-4">
          Preparation
        </v-row>
        <v-row class="mt-4">
          <v-col>
            {{ cocktail.strInstructions }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="isInfoDialogOpen" fullscreen>
      <TagsInfoDialog @closeDialog="isInfoDialogOpen = false" />
    </v-dialog>
  </v-container>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
:deep(.v-input__details) {
  display: none;
}
.cocktail-container {
  width: 60vw;
}
@media(max-width: 1000px) {
  .cocktail-container {
    width: 95%;
  }
}
</style>