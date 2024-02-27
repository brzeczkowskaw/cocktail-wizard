import { defineStore } from "pinia";
import { BarState, Cocktail } from "../types";
import firestoreDB from "../main.ts";
import {
  doc,
  onSnapshot,
} from "firebase/firestore";
// import firebase from "firebase/compat/app";
// import { updateProfile } from "firebase/auth";
// import "firebase/compat/firestore";

export const useBarStore = defineStore("barStore", {
  state: (): BarState => ({
    favourites: null,
    alcoholes: null,
    unsubscribeMethod: null,
  }),
  actions: {
    async getUserCollection(userId: string) {
      const unsubscribe = onSnapshot(doc(firestoreDB, `users/${userId}`), (doc) => {
          this.favourites = (doc.data() as any).favourites;
          this.alcoholes = (doc.data() as any).alcoholes;
      }); 
      this.unsubscribeMethod = unsubscribe;
    },
    // async addCoktailToFavourites(cocktail: Cocktail) {

    // }
  },
});
