import { defineStore } from "pinia";
import { AuthorisationState } from "../types";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firestoreDB from "../main.ts";
import { collection, setDoc, doc } from "firebase/firestore";
import { useBarStore } from "./bar.ts";

export const useAuthorisationStore = defineStore("authorisationStore", {
  state: (): AuthorisationState => ({
    user: null,
    loginMessageError: null,
  }),
  actions: {
    async register(email: string, password: string, name: string) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            const user = firebase.auth().currentUser;
            user?.updateProfile({
              displayName: name,
            });
            this.user = user;
          });
        const collectionRef = collection(firestoreDB, "users");
        await setDoc(doc(collectionRef, this.user.uid), {
          favourites: null,
          alcoholes: null,
        });
        await useBarStore().getUserCollection(this.user.uid);
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
        await useBarStore().getUserCollection(this.user.uid);
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
        useBarStore().unsubscribeMethod();
        firebase.auth().signOut();
        this.user = null;
        this.loginMessageError = null;
      } catch (error: any) {
        alert(error.message);
      }
    },
    async onStatusChange(): Promise<boolean | void> {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          await this.checkAndRefreshToken(user);
          this.user = user;
          return true;
        } else {
          this.user = null;
          return false;
        }
      });
    },
    async checkAndRefreshToken(user: firebase.User) {
      try {
        const idTokenResult = await user.getIdTokenResult();

        const tokenExpirationTime = parseInt(idTokenResult.expirationTime);
        const currentTime = Math.floor(Date.now() / 1000);

        if (tokenExpirationTime - currentTime < 300) {
          await user.getIdToken(true);
        }
      } catch (error) {
        console.error("Error checking or refreshing token:", error);
      }
    },
  },
});
