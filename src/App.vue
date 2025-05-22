<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Navbar from '@/components/Navbar.vue'

const route = useRoute()
const userStore = useUserStore()

const showNavbar = computed(() => {
  const publicPage = route.meta.hideNavbar === true
  return !publicPage && userStore.isAuthenticated
})
</script>

<template>
  <v-app>
    <Navbar v-if="showNavbar" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
