<script setup lang="ts">
import { computed } from 'vue'
import { useBarStore } from '../stores/bar'
import { Cocktail } from '../types'
import firebase from "firebase/compat/app"

const barStore = useBarStore();

const userUid = computed((): string => {
  return firebase.auth().currentUser?.uid || '';
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
    await barStore.addCoktailToFavourites(props.cocktail, userUid.value);
  } else {
    barStore.removeCocktailFromFavourites(props.cocktail, userUid.value);
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