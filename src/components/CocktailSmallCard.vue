<script setup lang="ts">
import { computed } from 'vue'
import { Cocktail } from '../types'
import { useRouter } from "vue-router";
import FavouritesHeart from './FavouritesHeart.vue'
import firebase from "firebase/compat/app"

const router = useRouter();
const user = computed(() => {
  return firebase.auth().currentUser;
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

const imageSrc = computed((): string => {
  return props.cocktail?.strDrinkThumb || '';
})

const imageAlt = computed((): string => {
  return props.cocktail?.strImageAttribution || '';
})
</script>

<template>
  <v-card 
    class="cocktail-card ma-3 rounded-xl text-white" 
    max-width="260" 
    max-height="400"
    elevation="12"
    align="center"
  >
    <v-img 
      :src="imageSrc"
      :alt="imageAlt" 
      width="240"
      height="240"
      cover
      class="my-2 rounded-xl"
    />
    <v-card-title max-width="240">
      <h5 class="text-wrap">
        {{ props.cocktail.strDrink }}
      </h5>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col :cols="user ? '9' : '12'">
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
          <FavouritesHeart v-if="user" :cocktail="cocktail" />
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