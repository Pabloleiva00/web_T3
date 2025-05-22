<template>
  <v-container fluid class="profile-page pa-0">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <div class="pt-16"></div>
        <v-card class="pa-6" elevation="2" shaped>
          <!-- Avatar + Icon -->
          <div class="text-center mb-4">
            <v-avatar size="80" class="rounded avatar-square">
              <v-img
                src="/pato.png"
                alt="Duck logo"
                aspect-ratio="1"
                class="w-100 h-100"
              />
            </v-avatar>
          </div>

          <!-- Título -->
          <h2 class="text-h5 font-weight-bold text-center mb-6">
            My Profile
          </h2>

          <!-- Detalles -->
          <v-list dense>
            <v-list-item>
              <v-list-item-title class="subtitle-2">Name</v-list-item-title>
              <v-list-item-subtitle>{{ fullName }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title class="subtitle-2">Email</v-list-item-title>
              <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title class="subtitle-2">Member Since</v-list-item-title>
              <v-list-item-subtitle>{{ memberSince }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <!-- Botones de acción -->
          <v-card-actions class="flex-column">
            <v-btn
              block
              large
              color="yellow lighten-5"
              class="mb-4"
              @click="dialog = true"
            >
              <v-avatar size="20" class="rounded avatar-square">
                <v-img src="/editar-texto.png" aspect-ratio="1" class="w-100 h-100"  alt="QuackApp Logo" />
              </v-avatar>
              Edit Profile
            </v-btn>

            <v-btn
              block
              large
              color="red lighten-5"
              class="mb-4"
              @click="onSignOut"
            >
              <v-avatar size="20" class="rounded avatar-square" >
                <v-img src="/cerrar-sesion-alt.png" aspect-ratio="1" class="w-100 h-100" alt="QuackApp Logo" />
              </v-avatar>
              Sign Out
            </v-btn>

            <router-link to="/feed" class="mt-2 text-decoration-none">
              Return to Home
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Profile Dialog -->
    <v-dialog v-model="dialog" max-width="800" persistent>
      <v-card class="pa-6" style="width: 100%;">
        <v-card-title class="text-h5 mb-4 text-center justify-center">Edit Profile</v-card-title>
        <v-card-text class="pa-4">
          <v-form ref="editForm">
            <v-text-field class="mb-4 text-base"
              v-model="editFirstName"
              label="First Name"
              outlined
              dense
              required
              :rules="[v => !!v || 'First name is required']"
            />
            <v-text-field class="mb-4 text-base "
              v-model="editLastName"
              label="Last Name"
              outlined
              dense
              required
              :rules="[v => !!v || 'Last name is required']"
            />
            <v-text-field class="mb-4 text-base "
              v-model="editEmail"
              label="Email"
              type="email"
              outlined
              dense
              required
              :rules="emailRules"
            />
            <v-text-field class="mb-4 text-base"
              v-model="editPassword"
              label="New Password"
              type="password"
              outlined
              dense
              :rules="passwordRules"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            class="custom-btn me-2 px-6 py-3"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            class="custom-btn px-6 py-3"
            @click="onSave"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000" top>
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

// Computeds
const fullName    = computed(() => userStore.fullName)
const userEmail   = computed(() => userStore.user.email)
const memberSince = computed(() => userStore.memberSince)

// Dialog & form refs
const dialog        = ref(false)
const editForm      = ref(null)
const editFirstName = ref('')
const editLastName  = ref('')
const editEmail     = ref('')
const editPassword  = ref('')

// Snackbar
const snackbar      = ref(false)
const snackbarText  = ref('')
const snackbarColor = ref('success')

// Validation rules
const emailRules = [
  v => !!v || 'Email is required',
  v => /^\S+@\S+\.\S+$/.test(v) || 'Must be a valid email'
]
const passwordRules = [
  v => !v || v.length >= 6 || 'Password must be at least 6 characters'
]

// When dialog opens, populate fields
watch(dialog, open => {
  if (open) {
    editFirstName.value = userStore.user.firstName
    editLastName.value  = userStore.user.lastName
    editEmail.value     = userStore.user.email
    editPassword.value  = ''
  }
})

// Actions
function onSignOut() {
  router.push('/login')
}

function onSave() {
  if (!editForm.value.validate()) return
  userStore.updateUser({
    firstName: editFirstName.value,
    lastName:  editLastName.value,
    email:     editEmail.value,
    // only update password if non-empty
    ...(editPassword.value ? { password: editPassword.value } : {})
  })
  snackbarText.value  = 'Profile updated'
  snackbarColor.value = 'success'
  snackbar.value      = true
  dialog.value        = false
}
</script>

