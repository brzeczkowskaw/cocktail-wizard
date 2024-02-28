<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCocktailsStore } from '../stores/cocktails'
import { useAuthorisationStore } from '../stores/authorisation'
import { Cocktail } from '../types'
import { useRouter } from "vue-router"
import FavouritesHeart from './FavouritesHeart.vue'
import firebase from "firebase/compat/app"

const router = useRouter();
const cocktailsStore = useCocktailsStore();
const authorisationStore = useAuthorisationStore();

const user = computed(() => {
  return firebase.auth().currentUser;
})
const isUserLoggedIn = computed(() => {
  return !!authorisationStore.user?.uid;
})

const props = defineProps({
  cocktail: {
    type: Object as () => Cocktail,
    required: true,
  }
})

function goToRecipe() {
  router.push(`/cocktail/${props.cocktail.idDrink}`)
}
</script>

<template>
  <v-card 
    class="cocktail-card ma-3 rounded-xl text-white" 
    max-width="300" 
    max-height="400"
    elevation="12"
    align="center"
  >
    <v-img 
      :src="props.cocktail.strDrinkThumb"
      :alt="props.cocktail.strImageAttribution" 
      width="280"
      height="280"
      cover
      class="my-2 rounded-xl"
    />
    <v-card-title>
      <h5>
        {{ props.cocktail.strDrink }}
      </h5>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col :cols="isUserLoggedIn ? '9' : '12'">
          <v-btn
            class="rounded-xl"
            width="280"
            color="secondary"
            elevation="6"
            @click="goToRecipe"
          >
            recipe
          </v-btn>
        </v-col>
        <v-col align="center">
          <FavouritesHeart :cocktail="cocktail" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style style="scss" scoped>
.cocktail-card {
  background: linear-gradient(-100deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-tertiary)));
}
</style>