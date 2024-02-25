import { defineStore } from "pinia";
import { CocktailsState } from "../types";
import axios from "axios";

export const useCocktailsStore = defineStore("cocktailsStore", {
  state: (): CocktailsState => ({
    randomCocktails: [],
    isLoadingCocktails: false,
    cocktail: null,
  }),
  actions: {
    async getRandomCocktails() {
      if (this.randomCocktails.length > 0) return;
      this.isLoadingCocktails = true;
      try {
        for (let number = 0; number < 12; number++) {
          const { data } = await axios.get(
            "https://thecocktaildb.com/api/json/v1/1/random.php"
          );
          const cocktail = Object.fromEntries(
            Object.entries(data.drinks[0]).filter(([_, v]) => v != null)
          );
          this.randomCocktails.push(cocktail);
          this.isLoadingCocktails = false;
        }
      } catch (error: any) {
        alert(error.message);
        this.isLoadingCocktails = false;
      }
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
    }
  },
});
