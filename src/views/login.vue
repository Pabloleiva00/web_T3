<template>
  <v-container fluid class="login-page pa-0" color="background">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <div class="pt-16"></div>
          <v-card class="auth-card-border pa-6">
            <v-card-title class="d-flex justify-center">
            <v-avatar size="80" class="rounded avatar-square">
              <v-img
                src="/pato-de-goma.png"
                alt="Duck logo"
                aspect-ratio="1"
                class="w-100 h-100"
              />
            </v-avatar>
          </v-card-title>

            <v-card-text>
              <h2 class="text-h5 font-weight-bold text-center mb-6">
                Welcome Back!
              </h2>

              <v-form @submit.prevent="onSubmit">
                <div class="input-group mb-6">
                  <label class="input-label">Email</label>
                  <v-text-field
                    v-model="email"
                    type="email"
                    class="mb-4"
                  />
                </div>

                <div class="input-group mb-6">
                  <label class="input-label">Password</label>
                  <v-text-field
                    v-model="password"
                    type="password"
                    class="mb-4"
                  />
                </div>
                <div class="text-right mb-4">
                  <router-link to="/forgot-password">Forgot password?</router-link>
                </div>

                <v-btn type="submit" block large color="yellow lighten-5" class="mb-4">
                  Log in
                </v-btn>
              </v-form>

              <div class="footer-text">
                Don’t have an account?
                <router-link to="/signup">Sign up</router-link>
              </div>
            </v-card-text>
          </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar de Toast -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      timeout="3000"
      top
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const email    = ref('')
const password = ref('')
const snackbar     = ref(false)
const snackbarText = ref('')
const snackbarColor= ref('success')

const userStore = useUserStore()
const router    = useRouter()

async function onSubmit() {
  try {
    await userStore.login({ email: email.value, password: password.value })
    snackbarText.value  = 'Logged in successfully!'
    snackbarColor.value = 'success'
    snackbar.value      = true
    // Después de mostrar el toast, navega
    setTimeout(() => router.push('/feed'), 1000)
  } catch (err) {
    snackbarText.value  = err.message || 'Login failed'
    snackbarColor.value = 'error'
    snackbar.value      = true
  }
}
</script>

