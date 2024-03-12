<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBarStore } from '../stores/bar'
import { useCocktailsStore } from '../stores/cocktails'
import firebase from "firebase/compat/app"

const barStore = useBarStore();
const cocktailsStore = useCocktailsStore();

const user = computed(() => {
  return firebase.auth().currentUser;
})

const chosenAlcohols = ref([])

if (cocktailsStore.tagsInfo.ingredients.length === 0) {
  cocktailsStore.getTagsInfo();
}

async function changeAlcohols() {
  try {
    await barStore.editAlcoholsList(user.value.uid)
  } catch(error) {
    alert(error.message);
  }
}

async function removeFromList(item: string) {
  const indexToRemove = barStore.alcoholes.indexOf(item);
  barStore.alcoholes.splice(indexToRemove, 1);
  chooseForDrinks(item);
  try {
    await barStore.editAlcoholsList(user.value.uid)
  } catch(error) {
    alert(error.message);
  }
}

function chooseForDrinks(item: string) {
  alcoholIsChosen(item) 
    ? chosenAlcohols.value.splice(chosenAlcohols.value.indexOf(item), 1) 
    : chosenAlcohols.value.push(item);
}

function alcoholIsChosen(item: string): boolean {
  return chosenAlcohols.value.includes(item);
}

async function findCocktails() {
  console.log(chosenAlcohols.value);
  try {
    chosenAlcohols.value.forEach(async (item: string) => {
      const filterLine = `filter.php?i=${item.replaceAll(' ', '_')}`;
      await cocktailsStore.filterForCocktails(filterLine);
    })
  } catch(error) {
    alert(error.message);
  }
}

</script>

<template>
  <v-container class="text-center">
    <h2>My ingredients</h2>
    <v-row class="my-3">
      <v-col>
        Add alcohols
        <v-autocomplete
            label="Choose your alcohols"
            v-if="!cocktailsStore.isLoadingCocktails"
            v-model="barStore.alcoholes"
            :items="cocktailsStore.tagsInfo.ingredients"
            multiple
            class="mt-4"
            @update:modelValue="changeAlcohols"
          />
      </v-col>
      <v-col cols="7">
        Your alcohols
        <v-row class="ma-3 chips-list">
          <v-chip 
            v-for="(alcohol, index) in barStore.alcoholes" 
            :key="index"
            :color="alcoholIsChosen(alcohol) ? 'blue' : 'white'"
            class="ma-1"
            label
            density="comfort"
            @click.prevent="chooseForDrinks(alcohol)"
          >
            {{ alcohol }}
            <v-icon
              icon="mdi-close" 
              size="x-small"
              class="ml-2"
              @click.prevent="removeFromList(alcohol)"
            />
          </v-chip>
        </v-row>
        <v-row justify="center" class="ma-3">
          <v-btn
            color="secondary"
            elevation="12"
            :disabled="!chosenAlcohols.length"
            @click="findCocktails"
          >
            Find cocktails!
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
:deep(.v-field__input) {
  display: none;
}
.chips-list {
  max-height: 20rem; 
  overflow-y: auto;
}
:deep(.chips-list::-webkit-scrollbar) {
  background: rgba(234, 86, 86, 0.7);
  width: 10px;
  border-radius: 20px;
}
</style>