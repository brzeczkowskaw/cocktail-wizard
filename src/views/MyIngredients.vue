<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBarStore } from '../stores/bar'
import { useCocktailsStore } from '../stores/cocktails'
import firebase from "firebase/compat/app"
import CocktailSmallCard from '../components/CocktailSmallCard.vue'
import "@lottiefiles/lottie-player"
import cocktailAnimation from "../assets/cocktail-animation.json"

const barStore = useBarStore();
const cocktailsStore = useCocktailsStore();

const user = computed(() => {
  return firebase.auth().currentUser;
})

const showCocktails = ref(false);
const chosenAlcohol = ref();

if (cocktailsStore.tagsInfo.ingredients.length === 0) {
  cocktailsStore.getTagsInfo();
}

async function addAlcoholToList() {
  try {
    await barStore.editAlcoholsList(user.value.uid)
  } catch(error) {
    alert(error.message);
  }
}

async function removeAlcoholFromList(item: string) {
  const indexToRemove = barStore.alcoholes.indexOf(item);
  barStore.alcoholes.splice(indexToRemove, 1);
  try {
    await barStore.editAlcoholsList(user.value.uid)
  } catch(error) {
    alert(error.message);
  }
}

async function findCocktails(item: string) {
  try {
    const filterLine = `filter.php?i=${item.replaceAll(' ', '_')}`;
    await cocktailsStore.filterForCocktails(filterLine);
    chosenAlcohol.value = item;
    showCocktails.value = true;
  } catch(error) {
    alert(error.message);
  }
}

</script>

<template>
  <v-container class="text-center">
    <h2>My bar stock</h2>
    <v-row class="my-3 px-3">
      <v-autocomplete
          label="Choose your alcohol"
          v-if="!cocktailsStore.isLoadingCocktails"
          v-model="barStore.alcoholes"
          :items="cocktailsStore.tagsInfo.ingredients"
          multiple
          class="mt-4"
          @update:modelValue="addAlcoholToList"
        />
    </v-row>
    <v-row>
      <v-card width="100%" class="list-card mb-5">
        <div v-for="item in barStore.alcoholes" :key="item">
          <v-card width="100%" class="alcohol-card">
            <v-row class="ma-0">
              <v-col class="find-cocktails" @click="findCocktails(item)">
                <v-icon size="x-small">mdi-glass-cocktail</v-icon>
                <h5>Cocktails</h5>
              </v-col>
              <v-col cols="4" md="6" class="alcohol-name">
                <v-icon size="x-small">mdi-star</v-icon>
                <h4>{{ item }}</h4>
              </v-col>
              <v-col class="delete-alcohol" @click="removeAlcoholFromList(item)">
                <v-icon size="x-small">mdi-bottle-wine-outline</v-icon>
                <h5>Empty bottle :( </h5>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-card>
    </v-row>
    <div v-if="showCocktails" class="mt-4">
      <h3 class="mt-4">Cocktails with {{ chosenAlcohol }}</h3>
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

<style lang="scss" scoped>
:deep(.v-autocomplete__selection-text) {
  display: none;
}
.list-card {
  max-height: 20rem; 
  overflow-y: auto;
  border-radius: 20px;
  background-color: transparent;
  padding: 2rem;
}
:deep(.list-card::-webkit-scrollbar) {
  background-color: rgba(248, 178, 178, 0.484);
  border-radius: 10px;
  width: 4px;
}
.alcohol-card {
  margin: 10px;
  border-radius: 8px;
  height: 4rem;
  margin-right: 10px;
}
@media(max-width: 700px) {
  .alcohol-card {
    max-height: 6rem;
  }
  .find-cocktails {
    border-radius: 0% 0% 50% 0%;
    cursor: pointer;
  }
  .delete-alcohol {
    border-radius: 50% 0% 0% 0%;
    cursor: pointer;
  }
}
:deep(.v-data-table) {
  background-color: rgba(248, 178, 178, 0.484);
  border-radius: 20px;
}
:deep(.v-data-table-footer) {
  display: none;
}
.find-cocktails {
  background: rgb(217, 134, 199);
  border-radius: 0% 0% 70% 0%;
  cursor: pointer;
}
.delete-alcohol {
  background: rgb(224, 134, 134);
  border-radius: 70% 0% 0% 0%;
  cursor: pointer;
}
.alcohol-name {
  padding-top: 0.2rem;
}
.cocktail-list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  flex-flow: wrap;
}
</style>