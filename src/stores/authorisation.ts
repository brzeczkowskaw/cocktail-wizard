import { defineStore } from "pinia";
import { AuthorisationState } from "../types";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const useAuthorisationStore = defineStore("authorisationStore", {
  state: (): AuthorisationState => ({
    user: null,
    loginMessageError: null,
  }),
  actions: {
    async register(email: string, password: string) {
      try {
        const data = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        this.user = data.user;
        console.log(data.user);
        this.loginMessageError = null;
      } catch (error: any) {
        switch (error.code) {
          case "auth/email-already-in-use":
            this.loginMessageError =
              "The email address is already in use by another account";
            break;
          case "auth/invalid-email":
            this.loginMessageError = "Invalid email";
            break;
          case "auth/operation-not-allowed":
            this.loginMessageError = "Email/password accounts are not enabled";
            break;
          case "auth/weak-password":
            this.loginMessageError = "Password too weak";
            break;
          default:
            this.loginMessageError = "Error occured, please try again";
            break;
        }
      }
    },
    async login(email: string, password: string) {
      try {
        const data = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        this.user = data.user;
        this.loginMessageError = null;
        console.log(data.user);
      } catch (error: any) {
        switch (error.code) {
          case "auth/invalid-email":
            this.loginMessageError = "Invalid email";
            break;
          case "auth/user-not-found":
            this.loginMessageError = "No account with that email was found";
            break;
          case "auth/wrong-password":
            this.loginMessageError = "Incorrect password";
            break;
          default:
            this.loginMessageError = "Email or password was incorrect";
            break;
        }
      }
    },
    async logout() {
      try {
        firebase.auth().signOut();
        this.user = null;
        this.loginMessageError = null;
      } catch (error: any) {
        alert(error.message);
      }
    },
  },
});
