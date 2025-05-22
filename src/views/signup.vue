<template>
  <v-container fluid class="signup-page pa-0" color="background">
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
                Join the Flock!
              </h2>
              <v-form
                ref="formRef"
                class="custom-form"
                @submit.prevent="onSubmit"
              >
                <!-- Full Name -->
                <div class="input-group mb-4">
                  <label class="input-label">Full Name</label>
                  <v-text-field
                    v-model="fullName"
                    outlined
                    dense
                    required
                    :rules="nameRules"
                    class="custom-input"
                    color="primary"
                    hide-details="auto"
                  />
                </div>

                <!-- Email -->
                <div class="input-group mb-4">
                  <label class="input-label">Email</label>
                  <v-text-field
                    v-model="email"
                    type="email"
                    outlined
                    density="comfortable"
                    :rules="emailRules"
                    class="custom-input"
                    color="primary"
                    hide-details="auto"
                  />
                </div>

                <!-- Password -->
                <div class="input-group mb-4">
                  <label class="input-label">Password</label>
                  <v-text-field
                    v-model="password"
                    type="password"
                    outlined
                    dense
                    required
                    :rules="passwordRules"
                    class="custom-input"
                    color="primary"
                    hide-details="auto"
                  />
                </div>

                <!-- Confirm Password -->
                <div class="input-group mb-6">
                  <label class="input-label">Confirm Password</label>
                  <v-text-field
                    v-model="confirmPassword"
                    type="password"
                    outlined
                    dense
                    required
                    :rules="confirmRules"
                    class="custom-input"
                    color="primary"
                    hide-details="auto"
                  />
                </div>

                <!-- Botón Create Account -->
                <v-btn
                  type="submit"
                  block
                  large
                  class="custom-btn"
                >
                  Create Account
                </v-btn>

                <!-- Link a login -->
                <div class="text-center mt-4">
                  Already have an account?
                  <router-link to="/login">Log in</router-link>
                </div>
              </v-form>
            </v-card-text>
        </v-card>
      

        <!-- Snackbar de Toast -->
        <v-snackbar
          v-model="snackbar"
          :color="snackbarColor"
          timeout="3000"
          top
        >
          {{ snackbarText }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter }  from 'vue-router'
import { useUserStore } from '@/stores/user'

const fullName        = ref('')
const email           = ref('')
const password        = ref('')
const confirmPassword = ref('')
const formRef         = ref(null)

const snackbar       = ref(false)
const snackbarText   = ref('')
const snackbarColor  = ref('success')

const userStore = useUserStore()
const router    = useRouter()

// reglas de validación
const nameRules     = [v => !!v.trim() || 'Full name is required']
const emailRules    = [
  v => !!v || 'Email is required',
  v => /^\S+@\S+\.\S+$/.test(v) || 'E-mail must be valid'
]
const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 6   || 'Password must be at least 6 characters'
]
const confirmRules  = [
  v => !!v || 'Please confirm password',
  v => v === password.value || 'Passwords do not match'
]

watch(password, () => { confirmPassword.value = '' })

async function onSubmit() {
  const isValid = await formRef.value.validate()

  if (!isValid.valid) {
    snackbarText.value = 'Please correct the errors before continuing.'
    snackbarColor.value = 'error'
    snackbar.value = true
    return
  }

  const parts     = fullName.value.trim().split(/\s+/)
  const firstName = parts.shift() || ''
  const lastName  = parts.join(' ') || ''

  try {
    userStore.signup({ firstName, lastName, email: email.value, password: password.value })
    snackbarText.value  = 'Account created successfully!'
    snackbarColor.value = 'success'
    snackbar.value      = true
    setTimeout(() => router.push('/feed'), 1000)
  } catch (err) {
    snackbarText.value  = err.message || 'Signup failed'
    snackbarColor.value = 'error'
    snackbar.value      = true
  }
}
</script>

