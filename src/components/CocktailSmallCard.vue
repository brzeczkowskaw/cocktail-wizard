<script setup lang="ts">
import { useCocktailsStore } from '../stores/cocktails'
import { Cocktail } from '../types'
import { useRouter } from "vue-router";
const router = useRouter();
const cocktailsStore = useCocktailsStore();

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
      <h4>
        {{ props.cocktail.strDrink }}
      </h4>
    </v-card-title>
    <v-card-text>
      <v-btn
        class="rounded-xl"
        width="280"
        color="secondary"
        elevation="6"
        @click="goToRecipe"
      >
        recipe
      </v-btn>
    </v-card-text>
    {{ props.cocktail }}
  </v-card>
</template>

<style style="scss" scoped>
.cocktail-card {
  background: linear-gradient(-100deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-tertiary)));
}
</style>