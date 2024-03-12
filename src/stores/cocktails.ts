import { defineStore } from "pinia";
import { CocktailsState, Cocktail } from "../types";
import axios from "axios";

export const useCocktailsStore = defineStore("cocktailsStore", {
  state: (): CocktailsState => ({
    cocktails: [] as Cocktail[],
    isLoadingCocktails: false,
    cocktail: null,
    tagsInfo: {
      categories: [],
      glasses: [],
      ingredients: [],
      alcoholicFilters: [],
    },
  }),
  actions: {
    async getRandomCocktails() {
      if (this.cocktails.length > 0) return;
      this.isLoadingCocktails = true;
      try {
        for (let number = 0; number < 12; number++) {
          const { data } = await axios.get(
            "https://thecocktaildb.com/api/json/v1/1/random.php"
          );
          const cocktail = Object.fromEntries(
            Object.entries(data.drinks[0]).filter(([_, v]) => v != null)
          );
          this.cocktails.push(cocktail);
          this.isLoadingCocktails = false;
        }
      } catch (error: any) {
        alert(error.message);
        this.isLoadingCocktails = false;
      }
    },
    async filterForCocktails(filterLine: string) {
      this.isLoadingCocktails = true;
      try {
        const { data } = await axios.get(
          `https://thecocktaildb.com/api/json/v1/1/${filterLine}`
        );
        console.log(typeof data.drinks);
        this.cocktails = data.drinks === null ? [] : data.drinks.map(
          (drink: Record<string, any>) => {
            return drink;
          }
        )
        this.isLoadingCocktails = false;
      } catch (error: any) {
        alert(error.message);
        this.isLoadingCocktails = false;
      }
    },
    async filterFromMyIngredients() {
      
    },
    async getCocktailById(id: string) {
      this.isLoadingCocktails = true;
      try {
        const { data } = await axios.get(
          `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const cocktail = Object.fromEntries(
          Object.entries(data.drinks[0]).filter(([_, v]) => v != null)
        );
        this.cocktail = cocktail;
        this.isLoadingCocktails = false;
      } catch (error: any) {
        alert(error.message);
        this.isLoadingCocktails = false;
      }
    },
    async getTagsInfo() {
      this.isLoadingCocktails = true;
      try {
        const categories = await axios.get(
          "https://thecocktaildb.com/api/json/v1/1/list.php?c=list"
        );
        this.tagsInfo.categories = categories.data.drinks.map(
          (item: Record<string, string>) => item.strCategory
        );
        const glasses = await axios.get(
          "https://thecocktaildb.com/api/json/v1/1/list.php?g=list"
        );
        this.tagsInfo.glasses = glasses.data.drinks.map(
          (item: Record<string, string>) => item.strGlass
        );
        const ingredients = await axios.get(
          "https://thecocktaildb.com/api/json/v1/1/list.php?i=list"
        );
        this.tagsInfo.ingredients = ingredients.data.drinks.map(
          (item: Record<string, string>) => item.strIngredient1
        );
        const alcoholicFilters = await axios.get(
          "https://thecocktaildb.com/api/json/v1/1/list.php?a=list"
        );
        this.tagsInfo.alcoholicFilters = alcoholicFilters.data.drinks.map(
          (item: Record<string, string>) => item.strAlcoholic
        );
        this.isLoadingCocktails = false;
      } catch (error: any) {
        alert(error.message);
      }
    },
  },
});
