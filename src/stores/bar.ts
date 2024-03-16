import { defineStore } from "pinia";
import { BarState, Cocktail } from "../types";
import firestoreDB from "../main.ts";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

export const useBarStore = defineStore("barStore", {
  state: (): BarState => ({
    favourites: [],
    alcoholes: [],
    unsubscribeMethod: null,
  }),
  actions: {
    getUserCollection(userId: string) {
      this.unsubscribeMethod = onSnapshot(
        doc(firestoreDB, `users/${userId}`),
        (doc) => {
          this.favourites = [...(doc.data() as any).favourites];
          this.alcoholes = [...(doc.data() as any).alcoholes];
        }
      );
    },
    async addCoktailToFavourites(cocktail: Cocktail, userId: string) {
      this.favourites.push(cocktail);
      await updateDoc(doc(firestoreDB, `users/${userId}/`), {
        favourites: this.favourites,
        alcoholes: this.alcoholes,
      });
    },
    async removeCocktailFromFavourites(cocktail: Cocktail, userId: string) {
      const indexOfObjectToRemove = this.favourites.findIndex((c: Cocktail) => {
        return c.idDrink === cocktail.idDrink;
      });
      this.favourites.splice(indexOfObjectToRemove, 1);
      await updateDoc(doc(firestoreDB, `users/${userId}/`), {
        favourites: this.favourites,
        alcoholes: this.alcoholes,
      });
    },
    async editAlcoholsList(userId: string) {
      await updateDoc(doc(firestoreDB, `users/${userId}/`), {
        favourites: this.favourites,
        alcoholes: this.alcoholes,
      });
    },
  },
});
