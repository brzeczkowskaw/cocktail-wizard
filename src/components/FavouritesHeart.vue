<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCocktailsStore } from '../stores/cocktails'
import { useBarStore } from '../stores/bar'
import { Cocktail } from '../types'
import firebase from "firebase/compat/app"

const cocktailsStore = useCocktailsStore();
const barStore = useBarStore();

const user = computed(() => {
  return firebase.auth().currentUser;
})

const props = defineProps({
  cocktail: {
    type: Object as () => Cocktail,
    required: true,
  },
})

const isCocktailFavourite = computed(() => {
  return barStore.favourites.some(cocktail => {
    return cocktail.idDrink === props.cocktail.idDrink;
  });
})

async function addToFavourites() {
  if (!isCocktailFavourite.value) {
    await barStore.addCoktailToFavourites(props.cocktail, user.value.uid);
  } else {
    barStore.removeCocktailFromFavourites(props.cocktail, user.value.uid);
  }
}

</script>

<template>
  <div>
    <v-icon 
      size="x-large" 
      :color="isCocktailFavourite ? 'red' : 'white'" 
      @click="addToFavourites"
    >
      {{ isCocktailFavourite ? 'mdi-cards-heart' : 'mdi-cards-heart-outline' }}
    </v-icon>
  </div>
</template>

<style lang="scss" scoped>
</style>