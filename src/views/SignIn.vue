<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthorisationStore } from '../stores/authorisation'
import { useRouter } from "vue-router";

const authorisationStore = useAuthorisationStore();
const router = useRouter();

const email = ref();
const password = ref();
const repeatPassword = ref();
const name = ref();
const showPassword = ref(false);
const tab = ref();

const repeatedPasswordIsTheSame = computed(() => {
  return !!password.value && password.value === repeatPassword.value;
})

async function login() {
  try {
    await authorisationStore.login(email.value, password.value);
    if(authorisationStore.user) router.push("/");
  } catch (error) {
    console.log(error)
  }
}

async function register() {
  try {
    await authorisationStore.register(email.value, password.value, name.value);
    if(authorisationStore.user) router.push("/");
  } catch (error) {
    console.log(error)
  }
}

function clearForm() {
  email.value = null;
  password.value = null;
  repeatPassword.value = null;
  showPassword.value = false;
  authorisationStore.loginMessageError = null;
}

function manipulateShowingPassword() {
  showPassword.value = !showPassword.value;
}

// validation
function validateEmail(value: string): boolean | string {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!!value && emailRegex.test(value)) {
    return true;
  } else {
    return 'This is not valid email'
  }
}
function validatePassword(value: string): boolean | string {
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!!value && passwordRegex.test(value)) {
    return true;
  } else {
    return 'Password must contain at least 8 characters, including one uppercase letter and one number'
  }
}
function validatePasswordConfirmation(): boolean | string {
  if (repeatedPasswordIsTheSame.value) {
    return true
  } else {
    return 'Password is not the same'
  }
}

</script>

<template>
  <v-container fluid>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      class="ma-4"
      @click="clearForm"
    >
      <v-tab value="login">Login</v-tab>
      <v-tab value="register">Register</v-tab>
    </v-tabs>
    <v-window v-model="tab" class="text-center">
      <v-window-item value="login" align="center">
        <v-card class="pa-4 ma-3 sign-in-card" elevation="4">
          <h2 class="my-5">Login</h2>
          <v-text-field v-model="email" placeholder="Email" variant="solo" class="input-area" />
          <v-text-field 
            v-model="password" 
            placeholder="Password"
            :type="showPassword ? '' : 'password'" 
            variant="solo" 
            class="input-area"
            @keyup.enter="login"
          >
            <template v-slot:append-inner> 
              <v-icon 
                size="small" @click="manipulateShowingPassword"
              >
                {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
              </v-icon>
            </template>
          </v-text-field>
          <p v-if="authorisationStore.loginMessageError">{{ authorisationStore.loginMessageError }}</p>
          <v-btn  
            class="input-area" 
            color="primary"
            @click="login"
            :disabled="!password || !email"
          >
            Submit
          </v-btn>
        </v-card>
      </v-window-item>
      <v-window-item value="register" align="center">
        <v-card class="pa-4 ma-3 sign-in-card" elevation="4">
          <h2 class="my-1">Create an Account</h2>
          <v-text-field 
            v-model="name" 
            placeholder="Name" 
            variant="solo" 
            class="input-area" 
          />
          <v-text-field 
            v-model="email" 
            placeholder="Email" 
            variant="solo" 
            class="input-area" 
            :rules="[validateEmail]"
          />
          <v-text-field 
            v-model="password" 
            :type="showPassword ? '' : 'password'" 
            placeholder="Password" 
            variant="solo" 
            class="input-area"
            :rules="[validatePassword]"
          >
            <template v-slot:append-inner> 
              <v-icon 
                size="small" @click="manipulateShowingPassword"
              >
                {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
              </v-icon>
            </template>
          </v-text-field>
          <v-text-field 
            v-model="repeatPassword" 
            :type="showPassword ? '' : 'password'"
            placeholder="Confirm password" 
            variant="solo" 
            class="input-area"
            :rules="[validatePasswordConfirmation]"
            @keyup.enter="register"
          >
            <template v-slot:append-inner> 
              <v-icon
                v-if="repeatPassword"
                :color="repeatedPasswordIsTheSame ? 'green' : 'red'" 
                size="small"
              >
                {{ repeatedPasswordIsTheSame ? 'mdi-check-circle' : 'mdi-alert-circle' }}
              </v-icon>
            </template>
          </v-text-field>
          <p v-if="authorisationStore.loginMessageError">{{ authorisationStore.loginMessageError }}</p>
          <v-btn  
            class="input-area" 
            color="primary"
            @click="register"
          >
            Submit
          </v-btn>
        </v-card>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<style style="scss" scoped>
.input-area {
  width: 30vw;
}
.sign-in-card {
  width: 40vw;
}
@media(max-width: 700px) {
  .input-area {
    width: 60vw;
  }
  .sign-in-card {
    width: 80vw
  }
}
</style>