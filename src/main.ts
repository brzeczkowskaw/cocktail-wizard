import { createApp } from "vue"
import { createPinia } from "pinia"
import vuetify from "./plugins/vuetify"
import App from "./App.vue"
import router from "./router"
import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import "@mdi/font/css/materialdesignicons.css"
import "@fortawesome/fontawesome-free/css/all.css"

const pinia = createPinia();

if (import.meta.env.DEV) {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (window as any).__pinia__ = pinia.state.value;
  (window as any).__get__ = (obj: Record<string, unknown>) =>
    JSON.parse(JSON.stringify(obj));
  /* eslint-enable */
}

const firebaseConfig = {
  apiKey: "AIzaSyAvo_ilJaNILFSp9hfXFRsKTsTbFKoiXKY",
  authDomain: "fridge-recepies.firebaseapp.com",
  projectId: "fridge-recepies",
  storageBucket: "fridge-recepies.appspot.com",
  messagingSenderId: "357515664299",
  appId: "1:357515664299:web:5f74876271fabbd3aed0ee",
  measurementId: "G-YKHJD07TYM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestoreDB = firebaseApp.firestore();
export default firestoreDB;

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(vuetify);

app.mount("#app");
