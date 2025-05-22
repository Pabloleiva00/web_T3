<!-- src/components/Navbar.vue -->
<template>
  <v-app-bar
    flat
    color="white"
    class="rounded-t-lg elevation-2"
  >
    <v-container fluid>
      <v-row align="center" justify="space-between">
        <v-btn
          text
          to="/feed"
          class="no-bg-btn d-flex align-center pa-0 ms-6"
        >
          <v-avatar size="36" class="rounded avatar-square">
            <v-img src="/pato-de-goma.png" alt="QuackApp Logo" />
          </v-avatar>
          <h1 class="title">Quack<span>App</span></h1>
        </v-btn>

        <v-btn
            to="/new-quack"
            color="yellow darken-1"
            class="me-4"
            rounded
            elevation="1"
          >
            <v-icon left>mdi-plus</v-icon>
            New Quack
        </v-btn>

        <v-btn
          to="/profile"
          color="yellow lighten-5"
          rounded
          elevation="0"
          class="profile-btn d-flex align-center me-6"
        >
          <v-avatar size="30" >
            <v-img src="/editar.png" alt="QuackApp Logo" />
          </v-avatar>
          My Profile
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
</script>

