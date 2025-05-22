<template>
  <v-container fluid class="landing-container pa-0">
    <v-sheet
      height="100vh"
      color="background"
      class="d-flex flex-column align-center justify-center"
      elevation="0"
    >
      <!-- Título -->
      <div class="text-center mb-8">
        <h1 class="title">Quack<span>App</span></h1>
        <p class="subtitle-1">
          Join our friendly flock! The perfect place for duck enthusiasts to connect and share.
        </p>
      </div>

      <!-- Card central -->
      <v-card>
        <v-card-text class="text-center">
          <h2 class="text-h5 font-weight-bold mb-6">Ready to Dive In?</h2>
          <v-btn
            block
            large
            color="yellow lighten-5"
            class="mb-4"
            to="/login"
          >
            Log In
          </v-btn>

          <div class="divider-text">OR</div>

          <v-btn
            block
            large
            color="yellow lighten-5"
            class="mt-4"
            to="/signup"
          >
            Sign Up
          </v-btn>
        </v-card-text>
      </v-card>

      <!-- Footer -->
      <p class="footer-text">
        By joining, you agree to our Duck Friendly Terms and Privacy Policy
      </p>
    </v-sheet>
  </v-container>
</template>

<script setup>
</script>

