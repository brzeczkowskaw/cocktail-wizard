<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCocktailsStore } from '../stores/cocktails'

const cocktailsStore = useCocktailsStore();

const emit = defineEmits(["closeDialog"])

const IBACategories = [
  "Before dinner cocktails", 
  "After dinner cocktails", 
  "Long drinks", 
  "Sparkling cocktails", 
  "Contemporary classics", 
  "New Era drinks"
];

const areTagsInfoEmpty = computed(() => {
  return !cocktailsStore.tagsInfo.categories || !cocktailsStore.tagsInfo.glasses || !cocktailsStore.tagsInfo.ingredients;
})

onMounted(async () => {
  if (areTagsInfoEmpty) await cocktailsStore.getTagsInfo();
})

</script>

<template>
  <v-card>
    <v-card-title class="title-class d-flex justify-space-between">
      <div>Tags Info</div>
      <div>
        <v-btn variant="text" class="pa-0 ma-0" @click="emit('closeDialog')">
          <v-icon size="small">
            mdi-close
          </v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-card-text class="pa-7 ma-2">
      <v-row>
        <h4 align="center">
          <v-icon class="mr-3">mdi-glass-cocktail</v-icon> 
          Types of glasses 
        </h4>
      </v-row>
      <v-row class="my-1 ml-4 py-3">
        <v-chip 
          v-for="glass in cocktailsStore.tagsInfo.glasses" 
          :key="glass"
          label
          class="ma-1"
          density="auto"
          color="secondary"
        >
          {{ glass }}
        </v-chip>
      </v-row>
      <v-row>
        <h4 align="center">
          <v-icon class="mr-3">mdi-folder</v-icon> 
          Categories 
        </h4>
      </v-row>
      <v-row class="my-1 ml-4 py-3">
        <v-chip 
          v-for="category in cocktailsStore.tagsInfo.categories" 
          :key="category"
          label
          class="ma-1"
          density="auto"
          color="secondary"
        >
          {{ category }}
        </v-chip>
      </v-row>
      <v-row>
        <h4 align="center">
          <v-icon class="mr-3">mdi-percent-outline</v-icon> 
          Alcoholic filter 
        </h4>
      </v-row>
      <v-row class="my-1 ml-4 py-3">
        <v-chip 
          v-for="filter in cocktailsStore.tagsInfo.alcoholicFilters" 
          :key="filter"
          label
          class="ma-1"
          density="auto"
          color="secondary"
        >
          {{ filter }}
        </v-chip>
      </v-row>
      <v-row>
        <h4 class="d-flex">
          <h5 class="mr-4 mt-1">IBA</h5> 
          IBA categories 
        </h4>
      </v-row>
      <v-row class="my-1 ml-4 py-3">
        <small class="ma-1">The International Bartenders Association (IBA) recognizes several categories of cocktails. As of my last knowledge update in January 2022, the IBA official cocktails are divided into the following categories:</small>
        <v-chip 
          v-for="category in IBACategories" 
          :key="category"
          label
          class="ma-1"
          density="auto"
          color="secondary"
        >
          {{ category }}
        </v-chip>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.title-class {
  background: rgb(var(--v-theme-primary));
  color: white;
  padding: 1rem;
}
</style>
